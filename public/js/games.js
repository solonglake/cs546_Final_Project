// this function runs whenever the games handlebars file is loaded
(async function ($) {
    // the unordered list of games
    let games = $('#allGames');
    let gamesDiv = $('#normalGames');
    // the add game button
    let adder = $('#gamePic');
    let addDiv = $('#adding');


    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        adder.show();
    } else {
        adder.hide();
    }
    adder.on("click", function () {
        gamesDiv.hide();
        addDiv.show();
    });

    let all = await $ajax({
        url: '/games/getAll',
        type: 'Get'
    });
    console.log("outside the loop")
    for (let x in all) {
        console.log("is this printing")
        let temp = '<li>' + x.gameImage + '</li>'
        games.append(temp);
    }

})(window.jQuery);