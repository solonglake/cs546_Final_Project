// this function runs whenever the forum handlebars file is loaded
(async function ($) {

    let unverified = $('#unverified-runPost');
    let runPostForm = $('#verified-runPost');
    let runError = $('#runsError');
    let runTime = $('#runTime');
    let runVideo = $('#runVideo');
    let runBody = $('#runBody');
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
    try{
        let runs = await $.ajax({
            url: '/game/getRuns',
            type: 'Post',
            data: {name: runGame}
        });
        //Appends All runs Into runs Div
        for(id in runs){
            $("#runsList").append(`<div><h2><a href =/runs/${runs[id]._id}>${runs[id].time}</a> by <a href=/profileVisit/${runs[id].runUser }>${runs[id].runUser}</a></h2></div>`);
        }
    } catch(e){
        console.log(e);
        console.log('empty');
    }
    //Run Post Form Submit Action
    runPostForm.submit(async function (event) {
        event.preventDefault();
        let data = { 
            runTime: runTime.val(),
            runVideo: runVideo.val(),
            runBody: runBody.val(),
            runTag: runTag.val(),
            runGame: runGame,
            runUser: runUser.val()
        };
        console.log(data.runGame);
        // RunPost validation
        if(!data.runTag){
            alert("ERROR: Please provide a Tag to your run post.");
        } 
        if(!data.runBody){
            alert("ERROR: Please provide a Body to your run post.");
        }  
        if (!data.runTime){
            alert("ERROR: Please provide a Time to your run post.");
        } 
        if (!data.runVideo){
            alert("ERROR: Please provide a video link to your run post.");
        }
        let validVid = true;
        let res = data.runVideo.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
        if(res===null)
            validVid = false;
        let validTime = true;
        data.runTime = data.runTime.trim();
        if(data.runTime.length === 0)
            validTime = false;
        if(data.runTime.length != 9){
            validTime = false;
        }
        if(isNaN(data.runTime.substring(0,2)) || isNaN(data.runTime.substring(3,5) || isNaN(data.runTime.substring(6,8)))){
            validTime = false;
        }

        if(data.runTime.charAt(2)!='.' || data.runTime.charAt(5)!='.'){
            validTime = false;
        }
        
        let validTag = true;
        data.runTag = data.runTag.trim();
        if(data.runTag.length === 0)
            validTag = false;
        let validBody = true;
        data.runBody = data.runBody.trim();
        if(data.runBody.length === 0)
            validBody = false;
        
        if(validTag && validVid && validTime && validBody) {
            runError.hide();
            const status = await $.ajax({
                url: '/game/newRun',
                type: 'Post',
                data: data
            });
            if(status.success){
                $("#runsList").append(`<div><h2><a href=/runs/${status.id}>${data.runTime}</a> by <a href=/profileVisit/${data.runUser}>${data.runUser}</a></h2></div>`);
            }
            else{
                runError.text('Could not upload new run!');
                runError.show();
            }
        } else if(!validTime){
            runError.text('Need valid input for time!');
            runError.show();
        } else if(!validVid){
            runError.text('Need valid input for video link!');
            runError.show();
        } else if(!validTag){
            runError.text('Need valid input for tag!');
            runError.show();
        } else {
            runError.text('Need valid input for body!');
            runError.show();
        }

    });

})(window.jQuery);