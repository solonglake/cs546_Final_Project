// this function runs whenever the forum handlebars file is loaded
(async function ($) {

    let unverified = $('#unverified-forumPost');
    let forumPostForm = $('#verified-forumPost');
    let forumError = $('#forumError');
    let postTitle = $('#postTitle');
    let postBody = $('#postBody');
    let postUser = $('#postUser');
    //Determines if form can be shown based on the users authentification
    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        unverified.hide();
    } else {
        forumPostForm.hide();
    }
    //Pulls All Posts In The Database
    let posts = await $.ajax({
        url: '/forums/posts',
        type: 'Get'
    });

    //Appends All Posts Into postList Div
    for(id in posts){
        $("#postList").append(`<a href=/forums/posts/${posts[id]._id}><div><h2>${posts[id].title} by <a href=/profileVisit/${posts[id].username}>${posts[id].username}</a></h2><p class="body">${posts[id].body}</p></div></a>`);
    }
    //Forum Post Form Submit Action
    forumPostForm.submit(async function (event) {
        event.preventDefault();
        let data = { 
            postTitle: postTitle.val(),
            postBody: postBody.val(),
            postUser: postUser.val()
        };
        // FormPost validation
        if(!data.postTitle){
            alert("ERROR: Please provide a title to your forum post.");
        } else if (!data.postBody){
            alert("ERROR: Please provide a description to your forum post.");
        } else {
            forumError.hide();
            const status = await $.ajax({
                url: '/forums/newPost',
                type: 'Post',
                data: data
            });
            if(status.postInserted){
                $("#postList").empty();
        //Pulls All Posts In The Database
                let posts = await $.ajax({
                    url: '/forums/posts',
                    type: 'Get'
                });

        //Appends All Posts Into postList Div
                for(id in posts){
                    $("#postList").append(`<a href=/forums/posts/${posts[id]._id}><div><h2>${posts[id].title} by <a href=/profileVisit/${posts[id].username}>${posts[id].username}</a></h2><p class="body">${posts[id].body}</p></div></a>`);
                }
            }
            else{
                forumError.text('Could not upload new forum post!');
                forumError.show();
            }
        }
    });

})(window.jQuery);