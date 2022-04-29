// this function runs whenever the games handlebars file is loaded
(async function ($) {
    // the unordered list of games
    let games = $('#allGames');
    // the add game button
    let adder = $('#gamePic');

    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        adder.show();
    } else {
        adder.hide();
    }

    let all = await $ajax({
        url: '/games/getAll',
        type: 'Get'
    });
    for (let x in all) {
        let temp = '<li>' + x.gameImage + '</li>'
        games.append(temp);
    }

        // load users profile picture
        const link = await $.ajax({
            url: '/profile/profilePic',
            type: 'Get'
        });
        if(link.link){
            profilePic.attr("src", link.link);
        }
    
        // load users bio
        const userBio = await $.ajax({
            url: '/profile/bio',
            type: 'Get'
        });
        if(userBio.bio){
            bio.text(userBio.bio);
        }
    
        // load users posts
        const posts = await $.ajax({
            url: '/profile/posts',
            type: 'Get'
        });
        if(posts.posts){
            console.log('work in progress');
        } else {
            postsDiv.text('No posts yet');
        }
    
        // load users runs
        const runs = await $.ajax({
            url: '/profile/runs',
            type: 'Get'
        });
        if(runs.runs){
            console.log('work in progress');
        } else {
            runsDiv.text('No runs yet');
        }
    
        // profile pic click function
        profilePic.click(function() {
            profilePicForm.show();
        });
    
        // bio click function
        bio.click(function() {
            bioForm.show();
        });
    
        // help button submit form action
        helpForm.submit(async function (event) {
            event.preventDefault();
            if(help.is(":visible")) {
                help.hide();
            } else {
                help.show();
            }
        });
    
        // profile pic form submit action
        profilePicForm.submit(async function (event) {
            event.preventDefault();
            let data = { profilePicInput: profilePicInput.val() };
            profilePicForm[0].reset()
            profilePicForm.hide(); 
    
            // profilePicInput validation
            let validInput = true;
            let res = data.profilePicInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if(res === null){
                validInput = false;
            }
    
            // if profilePicInput is valid then make the ajax request to /profile/profilePic route
            if(validInput){
                profileError.hide();
                const status = await $.ajax({
                    url: '/profile/profilePic',
                    type: 'Post',
                    data: data
                });
                if(status.success){
                    profilePic.attr("src", data.profilePicInput);
                } else {
                    profileError.text('Could not update profile picture with supplied link!');
                    profileError.show();
                }
            } else {
                profileError.text('Supplied link is not valid!');
                profileError.show();
            }
        });
    
        // bio form submit action
        bioForm.submit(async function (event) {
            event.preventDefault();
            let data = { bioInput: bioInput.val() };
            bioForm[0].reset()
            bioForm.hide(); 
    
            // profilePicInput validation
            let validInput = true;
            data.bioInput = data.bioInput.trim();
            if(data.bioInput.length === 0){
                validInput = false;
            }
    
            // if bioInput is valid then make the ajax request to /profile/bio route
            if(validInput){
                profileError.hide();
                const status = await $.ajax({
                    url: '/profile/bio',
                    type: 'Post',
                    data: data
                });
                if(status.success){
                    bio.text(data.bioInput);
                } else {
                    profileError.text('Could not update bio!');
                    profileError.show();
                }
            } else {
                profileError.text('Supplied bio is not valid!');
                profileError.show();
            }
        });
})(window.jQuery);