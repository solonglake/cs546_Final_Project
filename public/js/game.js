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
    let tag1 = $('#tag1');
    let tag2 = $('#tag2');
    let tag3 = $('#tag3');
    let tag4 = $('#tag4');
    let runsList = $('#runsList');
    let tagSearchForm = $('#tagSearchForm');
    let tag1Search = $('#tag1Search');
    let tag2Search = $('#tag2Search');
    let tag3Search = $('#tag3Search');
    let tag4Search = $('#tag4Search');
    let graph = $('#graph');
    let graphDiv = $('#graphDiv');

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
    let runs = await $.ajax({
        url: '/game/getRuns',
        type: 'Post',
        data: {name: runGame}
    });

    // graph data
    let data = {
        labels: [],
        datasets: [{
            label: 'Run Speed Over Time (Seconds)',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    //Appends All runs Into runs Div
    let fastestTime = Infinity;
    for(id in runs){
        let totalTime = runs[id].time;
        if(totalTime < fastestTime){
            fastestTime = totalTime;
            data.datasets[0].data.push(fastestTime);
            data.labels.push(runs[id].date);
        }
        
        let h = Math.floor(runs[id].time/3600);
        let m = Math.floor((runs[id].time%3600)/60);
        let s = runs[id].time%3600%60;
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
        runsList.append(`<div><h2><a href =/runs/${runs[id]._id}>${t}</a> by <a href=/profileVisit/${runs[id].runUser }>${runs[id].runUser}</a> on ${runs[id].date} [${runs[id].tags}]</h2></div>`);
    }
    if(runs.length === 0){
        runsList.append('<p>There are currently no runs</p>');
    }

    // graph
    let config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    let myChart = new Chart(
        graph,
        config
    );

    //Tag Search Form Submit Action
    tagSearchForm.submit(async function (event) {
        event.preventDefault();
        let tags = [];
        if(tag1Search.is(":checked")) tags.push(tag1Search.val());
        if(tag2Search.is(":checked")) tags.push(tag2Search.val());
        if(tag3Search.is(":checked")) tags.push(tag3Search.val());
        if(tag4Search.is(":checked")) tags.push(tag4Search.val());
        
        let allRuns = await $.ajax({
            url: '/game/getRuns',
            type: 'Post',
            data: {name: runGame}
        });

        let validRuns = [];
        if(tags.length > 0){
            for(let i=0; i<allRuns.length; i++){
                let valid = true;
                for(let j=0; j<tags.length; j++){
                    if(!allRuns[i].tags.includes(tags[j])){
                        valid = false;
                    }
                }
                if(valid){
                    validRuns.push(allRuns[i]);
                }
            }
        } else {
            validRuns = allRuns;
        }      

        runsList.empty();
        graphDiv.empty();
        graphDiv.append(`<canvas id="graph"></canvas>`);
        graph = $('#graph');
        data = {
            labels: [],
            datasets: [{
                label: `Run Speed Over Time (Seconds) for ${tags}`,
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
        fastestTime = Infinity;
        for(id in validRuns){
            let totalTime = validRuns[id].time;
            if(totalTime < fastestTime){
                fastestTime = totalTime;
                data.datasets[0].data.push(fastestTime);
                data.labels.push(validRuns[id].date);
            }

            let h = Math.floor(validRuns[id].time/3600);
            let m = Math.floor((validRuns[id].time%3600)/60);
            let s = validRuns[id].time%3600%60;

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
            runsList.append(`<div><h2><a href =/runs/${validRuns[id]._id}>${t}</a> by <a href=/profileVisit/${validRuns[id].runUser }>${validRuns[id].runUser}</a> on ${validRuns[id].date} [${validRuns[id].tags}]</h2></div>`);          
        }
        if(validRuns.length === 0){
            let message = 'No Runs with Supplied Tags';
            if(allRuns.length === 0){
                message = 'There are currently no runs';
            }
            runsList.append(`<p>${message}</p>`);
        }
        config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        myChart = new Chart(
            graph,
            config
        );
    });

    //Run Post Form Submit Action
    runPostForm.submit(async function (event) {
        event.preventDefault();
        let tags = [];
        if(tag1.is(":checked")) tags.push(tag1.val());
        if(tag2.is(":checked")) tags.push(tag2.val());
        if(tag3.is(":checked")) tags.push(tag3.val());
        if(tag4.is(":checked")) tags.push(tag4.val());
        let data = { 
            runHour: runHour.val(),
            runMin: runMin.val(),
            runSec: runSec.val(),
            runVideo: runVideo.val(),
            runBody: runBody.val(),
            runGame: runGame,
            runUser: runUser.val(),
            tags: tags
        };
        console.log(data.runHour);
        console.log(data.runMin);
        console.log(data.runSec);
        // RunPost validation
        if(tags.length === 0){
            alert("ERROR: Please select a tag!");
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
        let validBody = true;
        data.runBody = data.runBody.trim();
        if(data.runBody.length === 0 || data.runBody.length > 1000)
            validBody = false;
        
        if(validVid && validTime && validBody) {
            runError.hide();
            const status = await $.ajax({
                url: '/game/newRun',
                type: 'Post',
                data: data
            });
            if(status.success){
                let t = data.runHour+"h "+data.runMin+"m "+data.runSec+"s";
                runsList.append(`<div><h2><a href=/runs/${status.id}>${t}</a> by <a href=/profileVisit/${data.runUser}>${data.runUser}</a> on ${status.date} [${data.tags}]</h2></div>`);
            } else {
                runError.text(status.failure);
                runError.show();
            }
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