// this function runs whenever the profile handlebars file is loaded
(async function ($) {
    let profilePic = $('#profilePic');
    let bio = $('#bio');
    let postsDiv = $('#postsDiv');
    let runsDiv = $('#runsDiv');
    let usernameH1 = $('#usernameH1');
    let runsList = $('#runsList');
    let username = usernameH1.text();

    // load users profile picture
    const link = await $.ajax({
        url: '/profileVisit/profilePic',
        type: 'Post',
        data: {username: username}
    });
    if(link.link){
        profilePic.attr("src", link.link);
    }

    // load users bio
    const userBio = await $.ajax({
        url: '/profileVisit/bio',
        type: 'Post',
        data: {username: username}
    });
    if(userBio.bio){
        bio.text(userBio.bio);
    }

    // load users posts
    const posts = await $.ajax({
        url: '/profileVisit/posts',
        type: 'Post',
        data: {username: username}
    });
    if(posts && posts.length > 0){
        for(id in posts){
            $("#postsDiv").append(`<a href="/forums/posts/${posts[id]._id}"><div><h2>${posts[id].title}</h2><p class="body">${posts[id].body}</p></div></a>`);
        }
    } else {
        postsDiv.text('No posts yet');
    }

    // load users runs
    const runs = await $.ajax({
        url: '/profileVisit/runs',
        type: 'Post',
        data: {username: username}
    });
    if(runs.runs && runs.runs.length > 0){
        for(let num = 0; num < runs.runs.length; num++){
            let holder = 'gameName/';

            let runByGame = await $.ajax ({
                url: holder,
                type: 'Post',
                data: runs.runs[num]._id
        });
        let totalTime = runs.runs[num].time;
        let h = Math.floor(totalTime/3600);
        let m = Math.floor((totalTime%3600)/60);
        let s = totalTime%3600%60;

        if(h<1){
            h=0;
            m = Math.floor(totalTime/60);
            s = totalTime%60;
        } 
        else if(m<1&&h<1){
            h = 0;
            m = 0;
            s = totalTime;
        }
        let t = h+"h "+m+"m "+s+"s";
        //${runs.runs[num].time}${runByGame}${runs.runs[num].date}
            runsList.append(`<li><a href ="/runs/${runs.runs[num]._id}">${t}</a>  <a href="/game/${runByGame}">${runByGame}</a>   ${runs.runs[num].date}  [${runs.runs[num].tags}]</li>`);
        }
    } else {
        runsDiv.text('No runs yet');
    }

})(window.jQuery);