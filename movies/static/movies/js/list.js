'use strict';

$(function () {

    let $table = $('#movies-list');

    //
    // Initialize DataTables instance
    //
    $table.DataTable({
        'ajax': window.location.pathname
    });
});