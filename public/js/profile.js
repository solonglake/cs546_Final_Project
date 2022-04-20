// this function runs whenever the profile handlebars file is loaded
(async function ($) {
    let profilePic = $('#profilePic');
    let profilePicForm = $('#profilePicForm');
    let profilePicInput = $('#profilePicInput');

    profilePic.click(function() {
        profilePicForm.show();
    });

    profilePicForm.submit(async function (event) {
        event.preventDefault();
        let data = { profilePicInput: profilePicInput.val()};
        profilePicForm[0].reset()
        profilePicForm.hide();
        await $.ajax({
            url: '/profile/profilePic',
            type: 'Post',
            data: data
        });
        
    });
})(window.jQuery);