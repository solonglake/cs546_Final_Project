// this function runs whenever the forum handlebars file is loaded
(async function ($) {

    let unverified = $('#unverified-commentForm');
    let commentForm = $('#verified-commentForm');
    let postError = $('#postError');
    let commentBody = $('#commentBody');
    let commentUser = $('#commentUser');
    let postId = $('#postId');
    let noComments = $('#noComments');
    //Determines if form can be shown based on the users authentification
    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        unverified.hide();
    } else {
        commentForm.hide();
    }

    //Comment Form Submit Action
    commentForm.submit(async function (event) {
        event.preventDefault();
        let data = { 
            commentBody: commentBody.val(),
            commentUser: commentUser.val(),
            postId: postId.val()
        };
        // FormPost validation
        if (!data.commentBody){
            alert("ERROR: Please provide text to your comment.");
        } else {
            postError.hide();
            const status = await $.ajax({
                url: '/forums/newComment',
                type: 'Post',
                data: data
            });
            if(status.commentInserted){
                noComments.hide();
                $("#commentList").empty();
                
                for(comment of status.comments){
                $("#commentList").append(`
                <div>
                <p class="commentBody">${comment.content}</p>
                <h4 class="commentTitle">
                ${comment.username} <br>
                ${comment.date}
                </h4>   
                </div>`);
                }
            }
            else{
                postError.text('Could not upload new comment!');
                postError.show();
            }
        }
    });

})(window.jQuery);