'use strict';

$(function () {

    let $like_url = $('#movies-like-url');
    let $edit_url = $('#movies-edit-url');
    let $delete_url = $('#movies-delete-url');

    let $table = $('#movies-list');
    let $table_datatables;

    let $delete_title = $('#delete-title');
    let $delete_modal = $('#delete-modal');
    let $delete_btn = $('#delete-btn');

    //
    // Initialize DataTables instance
    //
    try {
        $table_datatables = $table.DataTable({
            'ajax': window.location.pathname,
            "columnDefs": [{
                "targets": -1,
                "data": null,
                "defaultContent": "<button class='btn-edit'>Edit</button>&nbsp;&nbsp;<button class='btn-delete'>Delete</button>" +
                    "&nbsp;&nbsp;<button class='btn-like'>Like</button>"
            }]
        });

        //
        // Show delete modal on 'Delete' action button click
        //
        $('#' + $table.attr('id') + ' tbody').on('click', 'button.btn-delete', function () {
            let data = $table_datatables.row($(this).parents('tr')).data();

            $delete_title.html(data[0]);
            $delete_modal.modal('show');
        });

        //
        // Redirect to edit page on 'Edit' action button click
        //
        $('#' + $table.attr('id') + ' tbody').on('click', 'button.btn-edit', function () {
            let data = $table_datatables.row($(this).parents('tr')).data();
            location.href = $edit_url.val() + '/?title=' + data[0];
        });

        //
        // Trigger like function on 'Like' action button click
        //
        $('#' + $table.attr('id') + ' tbody').on('click', 'button.btn-like', function () {

            let data = $table_datatables.row($(this).parents('tr')).data();

            $.post($like_url.val(), {
                'title': data[0],
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            }, function () {
                alert('likey');
            })
        });
    }
    catch (ex) {
        $table_datatables = $table.DataTable({
            'ajax': window.location.pathname
        });
    }

    //
    // Delete selected movie title on delete button click
    //
    $delete_btn.click(function () {

        $.post($delete_url.val(), {
            'title': $delete_title.html(),
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
        }, function () {
            alert('Record successfully deleted!');
            location.reload();
        });
    });
});