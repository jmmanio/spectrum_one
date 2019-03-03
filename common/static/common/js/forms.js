'use strict';

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