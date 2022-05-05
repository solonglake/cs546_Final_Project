// this function runs whenever the profile handlebars file is loaded
(async function ($) {
    let profilePic = $('#profilePic');
    let bio = $('#bio');
    let postsDiv = $('#postsDiv');
    let runsDiv = $('#runsDiv');
    let usernameH1 = $('#usernameH1');
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
            $("#postsDiv").append(`<div><h2>${posts[id].title}</h2><p>${posts[id].body}</p></div>`);
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
    if(runs.run && runs.runs.length > 0){
        console.log('work in progress');
    } else {
        runsDiv.text('No runs yet');
    }

})(window.jQuery);