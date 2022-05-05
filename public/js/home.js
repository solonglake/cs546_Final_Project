// this function runs whenever the home handlebars file is loaded
(async function ($) {
    let loginForm = $('#loginForm');
    let profileForm = $('#profileForm');
    let usersCount = $('#usersCount');
    let runsCount = $('#runsCount');
    let gamesCount = $('#gamesCount');
    let forumsCount = $('#forumsCount');

    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        loginForm.hide();
    } else {
        profileForm.hide();
    }

    // load users profile picture
    if(status.authenticated){
        const link = await $.ajax({
            url: '/profile/profilePic',
            type: 'Get'
        });
        if(link.link){
            profileForm.attr("src", link.link);
        }
    }

    let totalUsers = await $.ajax({
        url: '/totalUsers',
        type: 'Post'
    });
    usersCount.text(totalUsers.totalUsers);

    let totalRuns = await $.ajax({
        url: '/totalRuns',
        type: 'Post'
    });
    runsCount.text(totalRuns.totalRuns);

    let totalGames = await $.ajax({
        url: '/totalGames',
        type: 'Post'
    });
    gamesCount.text(totalGames.totalGames);

    let totalForums = await $.ajax({
        url: '/totalForums',
        type: 'Post'
    });
    forumsCount.text(totalForums.totalForums);

})(window.jQuery);