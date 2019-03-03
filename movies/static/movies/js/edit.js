'use strict';

$(function () {

    const $check_title_url = $('#check-title-url');
    const $details_url = $('#details-url');

    const $form_title_prev = $('#prev-title');
    const $form_title = $('#title');
    const $form = $('#edit-form');

    let is_valid_title = false;
    let title_setTimeout = null;
    function check_title() {

        try {
            clearTimeout(title_setTimeout);
        }
        catch (e) {
            // Ignored
        }

        if ($form_title.val() && ($form_title.val() !== $form_title_prev.val())) {

            title_setTimeout = setTimeout(function () {

                $.get($check_title_url.val(), {'title': $form_title.val()}, function () {

                    is_valid($form_title);
                    is_valid_title = true;
                })
                    .fail(function () {
                        is_invalid($form_title, 'Movie title already exists');
                        is_valid_title = false;
                    });

            }, 250);
        }

        clear_valid($form_title);
        is_valid_title = false;
    }

    // Initial value to title text input
    $form_title.val( $form_title_prev.val() );


    $form_title.on('keyup keydown', function () {
        check_title();
    });

    $form.submit(function (event) {

        event.preventDefault();

        if (is_valid_title) {

            $.post(window.location.pathname, $form.serialize(), function () {

                location.href = $details_url.val() + '/?title=' + $form_title.val() + '&edit=1';
            }).fail(function (data) {

                alert('Failed to contact server. Please try again');
            });
        }
    });
});