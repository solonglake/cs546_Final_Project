// this function runs whenever the forum handlebars file is loaded
(async function ($) {

    let unverified = $('#unverified-runPost');
    let runPostForm = $('#verified-runPost');
    let runError = $('#runsError');
    let runHour = $('#runHour');
    let runMin = $('#runMin');
    let runSec = $('#runSec');
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
            let h = Math.floor(runs[id].time/3600)/10;
            let m = Math.floor((runs[id].time%3600)/60)/10;
            let s = runs[id].time%3600%60;
            let t = h+"h "+m+"m "+s+"s";
            $("#runsList").append(`<div><h2><a href =/runs/${runs[id]._id}>${t}</a> by <a href=/profileVisit/${runs[id].runUser }>${runs[id].runUser}</a> on ${runs[id].date}</h2></div>`);
        }
    } catch(e){
        console.log('empty');
    }
    //Run Post Form Submit Action
    runPostForm.submit(async function (event) {
        event.preventDefault();
        let data = { 
            runHour: runHour.val(),
            runMin: runMin.val(),
            runSec: runSec.val(),
            runVideo: runVideo.val(),
            runBody: runBody.val(),
            runTag: runTag.val(),
            runGame: runGame,
            runUser: runUser.val()
        };
        // RunPost validation
        if(!data.runTag){
            alert("ERROR: Please provide a Tag to your run post.");
        } 
        else if(!data.runBody){
            alert("ERROR: Please provide a Body to your run post.");
        }  
        else if (!data.runSec || !data.runMin || !data.runHour){
            alert("ERROR: Please provide a Time to your run post.");
        } 
        else if (!data.runVideo){
            alert("ERROR: Please provide a video link to your run post.");
        }
        let validVid = true;
        let res = data.runVideo.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
        if(res===null)
            validVid = false;
        let validTime = true;
        if(data.runHour <= 0 && data.runMin<=0 && data.runSec<=0)
            validTime = false;
        if(data.runHour < 0)
            validTime = false;
        if(data.runMin < 0 || data.runMin >=60){
            validTime = false;
        }
        if(data.runSec < 0 || data.runSec >= 60){
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
                let t = data.runHour+"h "+data.runMin+"m "+data.runSec+"s";
                $("#runsList").append(`<div><h2><a href=/runs/${status.id}>${t}</a> by <a href=/profileVisit/${data.runUser}>${data.runUser}</a> on ${status.date}</h2></div>`);
            }
            else{
                runError.text('Could not upload new run!');
                runError.show();
            }
        } else if(!validTag){
            runError.text('Need valid input for tag!');
            runError.show();
        } else if(!validBody){
            runError.text('Need valid input for body!');
            runError.show();
        } else if(!validTime){
            runError.text('Need valid input for time!');
            runError.show();
        } else {
            runError.text('Need valid input for video link!');
            runError.show();
        }

    });

})(window.jQuery);