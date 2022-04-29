// this function runs whenever the games handlebars file is loaded
(async function ($) {
    let games = $('#gameList');
    let adder = $('#addButton');

    let status = await $.ajax({
        url: '/authenticated',
        type: 'Post'
    });
    if(status.authenticated){
        loginForm.hide();
    } else {
        profileForm.hide();
    }
})(window.jQuery);