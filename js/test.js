/**
 * Created by SachinHandiekar on 13/02/2016.
 */
$(document).ready(function () {

    $.getJSON('behaviour.json' , function (data) {

        $.each(data, function (index, element) {
            $('body').append( element.id + ' - ' + element.tooltip);
        });
    });

});