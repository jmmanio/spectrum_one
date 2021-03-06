'use strict';

$(function () {

    const $check_title_url = $('#check-title-url');
    const $details_url = $('#details-url');

    const $form_title = $('#title');
    const $form = $('#add-form');

    let is_valid_title = false;
    let title_setTimeout = null;
    function check_title() {

        try {
            clearTimeout(title_setTimeout);
        }
        catch (e) {
            // Ignored
        }

        if ($form_title.val()) {

            title_setTimeout = setTimeout(function () {

                $.get($check_title_url.val(), {'title': $form_title.val()}, function () {

                    is_valid($form_title);
                    is_valid_title = true;
                })
                    .fail(function () {
                        is_invalid($form_title, 'Movie title already exists');
                        is_valid_title = false;
                    });

            }, 500);
        }

        clear_valid($form_title);
        is_valid_title = false;
    }

    $form_title.on('keyup keydown', function () {
        check_title();
    });

    $form.submit(function (event) {

        event.preventDefault();

        if (is_valid_title) {

            $.post(window.location.pathname, $form.serialize(), function () {

                location.href = $details_url.val() + '/?title=' + $form_title.val() + '&new=1';
            }).fail(function (data) {

                alert('Failed to contact server. Please try again');
            });
        }
    });
});