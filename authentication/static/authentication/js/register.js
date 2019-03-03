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

    let username_setTimeout = false;
    let password_setTimeout = false;


    //
    // Clear validity indicators in specified element
    //
    function clear_valid($element) {

        let $group = $element.closest('.form-group');

        $group.removeClass('has-success has-error');
        $group.find('.help-block').hide();
    }


    //
    // Adds 'invalid' style indicators to a form element
    //
    function is_invalid($element, message) {

        let $group = $element.closest('.form-group');

        $group.removeClass('has-success');
        $group.addClass('has-error');

        $group.find('.help-block').show();
        $group.find('.help-block').html(message);
    }


    //
    // Adds 'valid' style indicators to a form element
    //
    function is_valid($element, message) {

        let $group = $element.closest('.form-group');

        $group.removeClass('has-error');
        $group.addClass('has-success');

        if (typeof (message) !== 'undefined') {
            $group.find('.help-block').show();
            $group.find('.help-block').html(message);
        }
        else {
            $group.find('.help-block').hide();
        }
    }


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

                $.get('/auth/checkuser', { 'username': $form_username.val() }, function (data) {
                    is_valid($form_username, 'Username is available');
                    return true;
                })
                    .fail(function () {

                        is_invalid($form_username, 'Username already taken');
                        return false;
                    });
            }), 500;
        }

        clear_valid($form_username);

        return false;
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
                    return true;
                }
                else {
                    is_invalid($form_password);
                    is_invalid($form_confirm, 'Passwords do not match');
                    return false;
                }
            }, 500);
        }

        clear_valid($form_password);
        clear_valid($form_confirm);

        return false;
    }


    $success_msg.hide();
    $error_msg.hide();


    $form_username.on('keyup change', function () {
        is_valid_username = check_username();
    });


    $form_password.on('keyup change', function () {
        is_valid_password = check_password();
    });


    $form_confirm.on('keyup change', function () {
        is_valid_password = check_password();
    });


    $form.submit(function (event) {

        event.preventDefault();

        $.post(window.location.pathname, $form.serialize(), function (data) {

            $form.find('input, button').attr('disabled', 'disabled');

            $error_msg.hide();
            $success_msg.show();
        })
            .fail(function() {
                $error_msg.show();
            });
    });
});