(async function ($) {
    // jquery targets
    let gamesError = $('#gamesError');
    let gamesList = $('#gamesList');
    let addGamePic = $('#addGamePic');
    let addGameForm = $('#addGameForm');
    let gamePicInput = $('#gamePicInput');
    let gameNameInput = $('#gameNameInput');

    // get all games and add to gamesList
    let games = await $.ajax({
        url: '/games/getAllGames',
        type: 'Get'
    });
    if(games){
        for(let i=0; i<games.length; i++){
            let img = $(`<a href="/game/${games[i].name}"><img src=${games[i].gamePic} alt=${games[i].name}></a>`);
            let p = $(`<p>${games[i].name}</p>`);
            let article = $('<article></article>');
            article.append(img);
            article.append(p);
            gamesList.append(article);
        }
    }

    // check if user is authenticated
    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        addGamePic.show();
    } else {
        addGamePic.hide();
    }

    // add click event to addGamePic
    addGamePic.on("click", function () {
        addGamePic.hide();
        addGameForm.show();
    });

    // add submit event to addGameForm
    addGameForm.submit(async function (event) {
        event.preventDefault();
        let data = { gamePicInput: gamePicInput.val(), gameNameInput: gameNameInput.val() };
        addGameForm[0].reset()
        addGameForm.hide(); 

        // gamePicInput validation
        let validPic = true;
        let res = data.gamePicInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            validPic = false;
        }

        // gameNameInput validation
        let validName = true;
        data.gameNameInput = data.gameNameInput.trim();
        if(data.gameNameInput.length === 0){
            validName = false;
        }

        // if gamePicInput and gameNameInput are valid make post request to /games/addGame
        if(validPic && validName){
            gamesError.hide();
            const added = await $.ajax({
                url: '/games/addGame',
                type: 'Post',
                data: data
            });
            if(added.success){
                let img = $(`<a href="/game/${data.gameNameInput}"><img src=${data.gamePicInput} alt=${data.gameNameInput}></a>`);
                let p = $(`<p>${data.gameNameInput}</p>`);
                let article = $('<article></article>');
                article.append(img);
                article.append(p);
                gamesList.append(article);
                addGamePic.show();
            } else {
                gamesError.text('Could not add game with supplied link and name!');
                gamesError.show();
                addGamePic.show();
            }
        } else if(!validPic){
            gamesError.text('Supplied link is not valid!');
            gamesError.show();
            addGamePic.show();
        } else {
            gamesError.text('Supplied name is not valid!');
            gamesError.show();
            addGamePic.show();
        }
    });
})(window.jQuery);