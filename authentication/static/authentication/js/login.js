'use strict';

$(function () {

    const $success_msg = $('#login-success');
    const $warning_msg = $('#login-warning');

    const $form = $('#login-form');

    // Hide login status boxes on initial load
    $success_msg.hide();
    $warning_msg.hide();


    // On login form submit
    $form.submit(function (event) {

        event.preventDefault();

        $.post(window.location.pathname, $form.serialize(), function () {
            // Authenticated
            $warning_msg.hide();
            $success_msg.show();
            window.location.reload();
        })
            .fail(function () {
                // Incorrect password
                $warning_msg.show();
                $success_msg.hide();
            });
    });
});
