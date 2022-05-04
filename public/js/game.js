// this function runs whenever the forum handlebars file is loaded
(async function ($) {

    let unverified = $('#unverified-runPost');
    let runPostForm = $('#verified-runPost');
    let runError = $('#runError');
    let runTime = $('#runTime');
    let runVideo = $('#runVideo');
    let runGame = $("h1").context.title;
    let runUser = $('#runUser');
    let runTag = $('#runTag');
    //Determines if form can be shown based on the users authentification
    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        unverified.hide();
    } else {
        runPostForm.hide();
    }

    //Pulls All Runs from game
    console.log($("h1").context.title);
    try{
        let runs = await $.ajax({
            url: '/game/getRuns',
            type: 'Post',
            data: {name: $("h1").context.title}
        });

        for(id in runs){
            $("#runsList").append(`<div><h2>${runs[id].title} by <a href=/profile/${runs[id].userId}>${runs[id].tag}</a></h2><p>${runs[id].body}</p></div>`);
        }
    } catch(e){
        console.log('empty');
    }
    //Appends All runs Into runs Div
    
    //Run Post Form Submit Action
    runPostForm.submit(async function (event) {
        event.preventDefault();
        let data = { 
            runTime: runTime.val(),
            runVideo: runVideo.val(),
            runTag: runTag.val(),
            runGame: runGame,
            runUser: runUser.val()
        };
        console.log(data.runVideo);
        // RunPost validation
        if(!data.runTag){
            alert("ERROR: Please provide a Tag to your run post.");
        } else if (!data.runTime){
            alert("ERROR: Please provide a Time to your run post.");
        } else if (!data.runVideo){
            alert("ERROR: Please provide a video link to your run post.");
        } else {
            runError.hide();
            const status = await $.ajax({
                url: '/game/newRun',
                type: 'Post',
                data: data
            });
            if(status.runInserted){
                $("#runList").append(`<div><h2>${data.runTime} by <a href=/profile/${data.runUser}>${data.runTag}</a></h2></div>`);
            }
            else{
                runError.text('Could not upload new run!');
                runError.show();
            }
        }
    });

})(window.jQuery);