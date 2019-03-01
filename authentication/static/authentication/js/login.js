'use strict';

$(function () {


    const $loginWarning      = $('#login-warning');
    const $loginSuccess      = $('#login-success');

    const $form              = $('#login-form');
    const $form_usernameText = $('#username');
    const $form_passwordText = $('#password');
    const $form_csrfToken    = $('input[name=csrfmiddlewaretoken]');


    // Hide login status boxes on initial load
    $loginWarning.hide();
    $loginSuccess.hide();


    // On login form submit
    $form.submit(function (event) {

        event.preventDefault();

        $.post('/', {
            username: $form_usernameText.val(),
            password: $form_passwordText.val(),
            csrfmiddlewaretoken: $form_csrfToken.val()
        }, function () {
            // Authenticated
            $loginWarning.hide();
            $loginSuccess.show();
        })
            .fail(function () {
                // Incorrect password
                $loginWarning.show();
                $loginSuccess.hide();
            });
    });
});
