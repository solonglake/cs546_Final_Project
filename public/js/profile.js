// this function runs whenever the profile handlebars file is loaded
(async function ($) {
    let profilePic = $('#profilePic');
    let profilePicForm = $('#profilePicForm');
    let profilePicInput = $('#profilePicInput');
    let profileError = $('#profileError');
    let helpForm = $('#helpForm');
    let help = $('#help');

    // load users profile picture
    const link = await $.ajax({
        url: '/profile/profilePic',
        type: 'Get'
    });
    if(link.link){
        profilePic.attr("src", link.link);
    }

    // profile pic click function
    profilePic.click(function() {
        profilePicForm.show();
    });

    // help button submit form action
    helpForm.submit(async function (event) {
        event.preventDefault();
        if(help.is(":visible")) {
            help.hide();
        } else {
            help.show();
        }
    });

    // profile pic submit form action
    profilePicForm.submit(async function (event) {
        event.preventDefault();
        let data = { profilePicInput: profilePicInput.val() };
        profilePicForm[0].reset()
        profilePicForm.hide(); 

        // profilePicInput validation
        let validInput = true;
        let res = data.profilePicInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            validInput = false;
        }

        // if profilePicInput is valid then make the ajax request to /profile/profilePic route
        if(validInput){
            profileError.hide();
            const status = await $.ajax({
                url: '/profile/profilePic',
                type: 'Post',
                data: data
            });
            if(status.success){
                profilePic.attr("src", data.profilePicInput);
            } else {
                profileError.text('Could not update profile picture with supplied link!');
                profileError.show();
            }
        } else {
            profileError.text('Supplied link is not valid!');
            profileError.show();
        }
    });
})(window.jQuery);