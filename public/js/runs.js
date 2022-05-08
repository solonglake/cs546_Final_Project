(async function ($) {
    let unverified = $('#unverified-commentPost');
    let commPostForm = $('#verified-commentPost');
    let error = $('#error');
    let likes = $('#likes');
    let dislikes = $('#dislikes');
    let likesVal = $('#likeVal');
    let dislikesVal = $('#dislikeVal');
    let likesCt = $('#likesCt');
    let dislikesCt = $('#dislikesCt');
    let runId = $('#runId');
    let commentUser = $('#commUser');
    let comment = $('#commDesc');
    let time = $('#time');
    let commentsList = $('#commentsList');

    //Determines if form can be shown based on the users authentification
    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        unverified.hide();
    } else {
        commPostForm.hide();
        likes.hide();
        dislikes.hide();
    }

    likes.append(`<p id="likeShown">${likesVal.val()}</p>`)
    dislikes.append(`<p id="dislikeShown">${dislikesVal.val()}</p>`)

    //like and dislike increment
    time = time.val();
    let h = Math.floor(time/3600)/10;
    let m = Math.floor((time%3600)/60)/10;
    let s = time%3600%60;
    if(h<1){
        h = 0;
        m = Math.floor(time/60)/10;
        s = time%60;
    }
    else if(m<1&&h<1){
        h =0;
        m = 0;
        s = time;
    }
            
    let t = "Completed in " +h+"h "+m+"m "+s+"s";
    $("#displayTime").text(t);
    likes.submit(async function (event){
        event.preventDefault();
        let data = {
            runId: runId.val()
        }
        let l = await $.ajax({
            url: '/runs/like',
            type: 'Post',
            data:data
        });
        if(l.success){
            $("#likeShown").text(l.runLike+1);
        }
    });

    dislikes.submit(async function (event){
        event.preventDefault();
        let data = {
            runId: runId.val()
        }
        let d = await $.ajax({
            url: '/runs/dislike',
            type: 'Post',
            data:data
        });
        if(d.success){
            $("#dislikeShown").text(d.runDislike+1);
        }
    });

    commPostForm.submit(async function (event) {
        event.preventDefault();
        let data = {
            runId: runId.val(),
            comment: comment.val()
        };
        if (!runId.val() || !comment.val()) {
            alert("you need to enter all fields")
        }
        else {
            try {
                let addComm = await $.ajax({
                url: '/runs/newComment',
                type: 'Post',
                data: data
            })
            commentsList.append(`<div><li>${addComm.username} <br>${addComm.content}</li></div>`);
            } catch (e) {
                error.text(e);
                error.show();
            }
        }
    })

    // Pulls All comments from game
    try{
        let comments = await $.ajax({
            url: '/runs/getComments',
            type: 'Post',
            data: {runId: runId.val()}
        });
        for(let i=0; i<comments.comments.length; i++){
            commentsList.append(`<div><li>${comments.comments[i].username} <br>${comments.comments[i].comment}</li></div>`);
        }
    } catch (e) {
        error.text(e);
        error.show();
    }
})(window.jQuery);