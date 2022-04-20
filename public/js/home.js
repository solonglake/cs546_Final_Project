// this function runs whenever the home handlebars file is loaded
(async function ($) {
    let loginForm = $('#loginForm');
    let profileForm = $('#profileForm');

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