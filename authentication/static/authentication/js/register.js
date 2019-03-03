'use strict';

$(function () {

    const $check_username_url = $('#check-username-url');

    const $success_msg = $('#register-success');
    const $error_msg = $('#register-error');

    const $form = $('#register-form');
    const $form_username = $('#username');
    const $form_password = $('#password');
    const $form_confirm = $('#confirm-password');

    let is_valid_username = false;
    let is_valid_password = false;

    let username_setTimeout = null;
    let password_setTimeout = null;


    //
    // Check if username is already taken by another user
    //
    function check_username() {

        try {
            clearTimeout(username_setTimeout);
        }
        catch (e) {
            // Ignored
        }

        if ($form_username.val()) {

            username_setTimeout = setTimeout(function () {

                $.get('/auth/checkuser', {'username': $form_username.val()}, function (data) {
                    is_valid($form_username, 'Username is available');
                    is_valid_username = true;
                })
                    .fail(function () {

                        is_invalid($form_username, 'Username already taken');
                        is_valid_username = false;
                    });
            }, 500);
        }

        clear_valid($form_username);

        is_valid_username = false;
    }

    //
    // Check if 'Password' and 'Confirm Password' fields match
    //
    function check_password() {

        try {
            clearTimeout(password_setTimeout);
        }
        catch (e) {
            // Ignored
        }

        if ($form_password.val() && $form_confirm.val()) {

            password_setTimeout = setTimeout(function () {

                if ($form_password.val() === $form_confirm.val()) {
                    is_valid($form_password);
                    is_valid($form_confirm);
                    is_valid_password = true;
                }
                else {
                    is_invalid($form_password);
                    is_invalid($form_confirm, 'Passwords do not match');
                    is_valid_password = false;
                }
            }, 500);
        }

        clear_valid($form_password);
        clear_valid($form_confirm);

        is_valid_password = false;
    }


    $success_msg.hide();
    $error_msg.hide();


    $form_username.on('keyup keydown', function () {
        is_valid_username = check_username();
    });


    $form_password.on('keyup keydown', function () {
        is_valid_password = check_password();
    });


    $form_confirm.on('keyup keydown', function () {
        is_valid_password = check_password();
    });


    $form.submit(function (event) {

        event.preventDefault();

        if (is_valid_username && is_valid_password) {

            $.post(window.location.pathname, $form.serialize(), function (data) {

                $form.find('input, button').attr('disabled', 'disabled');

                $error_msg.hide();
                $success_msg.show();
            })
                .fail(function () {
                    $error_msg.show();
                });
        }
    });
});