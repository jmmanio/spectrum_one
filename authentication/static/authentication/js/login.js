'use strict';

$(function () {


    const $loginWarning      = $('#login-warning');
    const $loginSuccess      = $('#login-success');

    const $form              = $('#login-form');

    // Hide login status boxes on initial load
    $loginWarning.hide();
    $loginSuccess.hide();


    // On login form submit
    $form.submit(function (event) {

        event.preventDefault();

        console.log($form.serialize());

        $.post('/',
            $form.serialize(), function () {
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
