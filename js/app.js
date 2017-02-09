/**
 * app.js
 */



$.ajaxSetup({
    async: false
});


var jvmMode = "-server";
var space = " ";
var gcCollectorAlgorithm = "";

var jdkVersion = "";
var minHeapSize = "";
var maxHeapSize = "";
var defaultPermSize = "";
var maxPermSize = "";

var defaultMetaspace = "";
var maxMetaspace = "";

var tooltipMap = {};

var hashCodeAlgo = '';

var jvmOptsChkBox = {};

var inputBindAttrs = 'DOMAttrModified textInput input change keypress paste focus'

var debugOpts = {};
var performanceOpts = {};

var g1gcOpts = {};

var g1gcInputBoxMap = {};
/**
 * Populate Tooltip from the tooltip.json file.
 */
function populateTooltip() {
    $.getJSON('https://rawgit.com/sachin-handiekar/jvmconfig/gh-pages/data/tooltip.json', function (data) {
        $.each(data.tooltips, function (key, val) {
            tooltipMap['tooltip-' + val.id] = val.tooltip;
        });
    });

    /* $("i").each(function () {
     var id = this.id;
     console.log(id);
     $("#" + id).tooltip({
     "title": function () {
     return "" + tooltipMap[id] + "";
     }
     });
     });*/
}


function populateDebuggingOptions() {
    $.getJSON('https://rawgit.com/sachin-handiekar/jvmconfig/gh-pages/data/debuggingOpts.json', function (data) {
        $.each(data.debugging, function (key, val) {
            // Parse the JSON and store the id and jvm Option Value in a map
            debugOpts['' + val.id + ''] = val.value;
            var tmp = generateCheckbox(val.id, val.text, val.tooltip);
            $('#debugging').append(tmp);
        });
    });
}


function populatePerformanceOptions() {
    $.getJSON('https://rawgit.com/sachin-handiekar/jvmconfig/gh-pages/data/performanceOpts.json', function (data) {
        $.each(data.performance, function (key, val) {
            // Parse the JSON and store the id and jvm Option Value in a map
            performanceOpts['' + val.id + ''] = val.value;
            var tmp = generateCheckbox(val.id, val.text, val.tooltip);
            $('#performance').append(tmp);
        });
    });
}


function populateG1GCExtraFlags() {
    $.getJSON('https://rawgit.com/sachin-handiekar/jvmconfig/gh-pages/data/g1gcOpts.json', function (data) {
        var g1gcHtml = '';
        $.each(data.g1gcOpts, function (key, val) {
            // Parse the JSON and store the id and jvm Option Value in a map
            g1gcOpts['' + val.id + ''] = val.value;
            var tmp = generateInputbox(val.id, val.text, val.tooltip);
            g1gcHtml += tmp;
        });


        $('#g1ExtraFlags').append('<div class="panel-heading">Garbage First (G1) Garbage Collection Options</div> '
            + '<div class="panel-body">'
            + g1gcHtml
            + '</div>');

    });
}


function generateCheckbox(id, text, tooltip) {
    var tmp = '<div class="form-group">' +
        '        <label class="col-sm-7" for="' + id + '">' + text + ' <i ' +
        '        id="tooltip-' + id + '" ' +
        '       data-toggle="tooltip" ' +
        '       data-original-title="' + tooltip + '" ' +
        '        class="glyphicon glyphicon-info-sign"></i></label> ' +
        '         <div class="col-sm-5">' +
        '         <input id="' + id + '" type="checkbox" value=""> ' +
        '         </div>' +
        '        </div>';

    return tmp;
}


function generateInputbox(id, text, tooltip) {

    var tmp = '<div class="form-group">' +
        '  <label class="col-sm-5" for="g1gc-maxGCPauseTime">' + text + ' <i' +
        ' id="tooltip-' + id + '" data-toggle="tooltip"' +
        '       data-original-title="' + tooltip + '" ' +
        'class="glyphicon glyphicon-info-sign"></i></label>' +
        '     <div class="col-sm-5">' +
        '    <input class="form-control" id="' + id + '" type="text" value="">' +
        '   </div>' +
        '    </div>';


    return tmp;
}

/**
 * Function to invoke on document ready.
 */
$(document).ready(function () {

    populateDebuggingOptions();
    populatePerformanceOptions();


    populateG1GCExtraFlags();

    populateTooltip();
    resetJVMOptions();

    $("[data-toggle=tooltip]").tooltip();

    // Initial value for jdkVersion
    jdkVersion = $("input:radio[name='jdkVersionRadioGroup']:checked").val();


    $("input[name='jdkVersionRadioGroup']").click(function () {
        jdkVersion = $("input:radio[name='jdkVersionRadioGroup']:checked").val();


        if (jdkVersion == 'jdkVersion8') {
            $("#metaSpace").removeClass('hidden');
            $("#permSize").addClass('hidden');


        } else {
            $("#metaSpace").addClass('hidden');
            $("#permSize").removeClass('hidden');

        }

    });




    $('[id^=g1gc-]').bind(inputBindAttrs, function () {
           addKeyValueToMap($(this).attr('id'), $(this).val(), g1gcInputBoxMap);
           validateAndRefreshJVMOptions();
    });
    
    
    $.ajaxSetup({
    async: true
});
    
    
});

$('form').on('change', ':checkbox', function () {
    validateAndRefreshJVMOptions();
});


/**
 * GC Algorithm Selector
 */
$('#gcCollector').on('change', function () {

    var gcAlgo = this.value;

    if (gcAlgo == 'g1') {
        gcCollectorAlgorithm = '-XX:+UseG1GC';
        $("#g1ExtraFlags").removeClass('hidden');
    } else if (gcAlgo == 'cms') {
        gcCollectorAlgorithm = '-XX:+UseConcMarkSweepGC';
        $("#g1ExtraFlags").addClass('hidden');
    } else if (gcAlgo == 'parallel') {
        gcCollectorAlgorithm = '-XX:+UseParNewGC -XX:+UseConcMarkSweepGC';
        $("#g1ExtraFlags").addClass('hidden');
    } else {
        gcCollectorAlgorithm = '';
    }


});


/**
 * GC Algorithm Selector
 */
$('#hashcodeSelect').on('change', function () {
    if (!isEmpty(this.value)) {
        hashCodeAlgo = '';
    } else {
        hashCodeAlgo = '-XX:hashCode=' + this.value;

    }
});


/**
 * Reset Form Options
 */
function resetJVMOptions() {
    // Hide the G1 extra option panel
    $("#g1ExtraFlags").addClass('hidden');
    $("#metaSpace").addClass('hidden');
    $("#permSize").removeClass('hidden');

    $("#printGCDetails").text("unchecked");
    $("#enableGCLogRotation").text("unchecked");
}


/**
 * HeapSize
 */
$('#minHeapSize').bind(inputBindAttrs, function () {
    updateMemoryInputFields('minHeapSize', $(this).val(), '-Xms');

});

$('#maxHeapSize').bind(inputBindAttrs, function () {
    updateMemoryInputFields('maxHeapSize', $(this).val(), '-Xmx');
});

$('#defaultPermSize').bind(inputBindAttrs, function () {
    updateMemoryInputFields('defaultPermSize', $(this).val(), '-XX:PermSize=');

});

$('#maxPermSize').bind(inputBindAttrs, function () {
    updateMemoryInputFields('maxPermSize', $(this).val(), '-XX:MaxPermSize=');
});

$('#defaultMetaSpace').bind(inputBindAttrs, function () {
    updateMemoryInputFields('defaultMetaspace', $(this).val(), '-XX:MetaspaceSize=');
});

$('#maxMetaSpace').bind(inputBindAttrs, function () {
    updateMemoryInputFields('maxMetaspace', $(this).val(), '-XX:MaxMetaspaceSize=');
});




// G1 GC Flags


function getSizeUnitValue(sizeUnitId) {
    var sizeUnit = '';
    if (sizeUnitId != null) {
        sizeUnit = $('#' + sizeUnitId).val();
    }

    return sizeUnit;
}


function updateMemoryInputFields(varName, varValue, prefix) {
    if (isEmpty(varValue)) {
        var tmpValue = prefix + varValue;
        this[varName] = tmpValue;
    } else {
        this[varName] = '';
    }

    validateAndRefreshJVMOptions();
}

function addKeyValueToMap(key, value, map) {
    if (!(key in map)) {
        // Value doesn't exist
        map['' + key + ''] = value;

    } else {
        map['' + key + ''] = value;
    }


}


function isEmpty(data) {
    return $.trim(data) != '';
}


/**
 * Global Change Listener
 */
$("form :input").change(function () {
    validateAndRefreshJVMOptions();
});


function updateCheckboxValues(map) {
    for (var key in map) {
        if (map.hasOwnProperty(key)) {
            validateCheckboxInput(key, map[key]);
        }
    }

}


function validateAndRefreshJVMOptions() {

    // Debugging
    updateCheckboxValues(debugOpts);

    //Performance
    updateCheckboxValues(performanceOpts);

    refreshJVMFlagRef();
}


function getIdVal(data) {
    return $("#" + data).attr('value');
}


function validateCheckboxInput(chkboxId, jvmFlag) {
    if ($("#" + chkboxId).is(':checked')) {

        jvmOptsChkBox['' + chkboxId + ''] = jvmFlag;
        this[chkboxId] = jvmFlag;
    } else {
        jvmOptsChkBox['' + chkboxId + ''] = '';
        this[chkboxId] = '';
    }
}


function getG1ExtraFlags() {
    var tmp = '';
    for (var key in g1gcOpts) {
        if (g1gcOpts.hasOwnProperty(key)) {
            var g1gcOptionValue = g1gcOpts[key];


            if (g1gcInputBoxMap[key]) {



                var extraOptValue = g1gcInputBoxMap[key] || '';


            if (!extraOptValue.trim()) {
                // String is empty; don't do anything
            } else {
                tmp += space + g1gcOptionValue + extraOptValue;

            }
            }

        }
    }


    return tmp;


}

/**
 * Refresh the JVM Options Summary textbox
 */
function refreshJVMFlagRef() {
    $("#jvmFlagResult").text('');

    // Set the JVM Mode
    addTextToJVMSummary(jvmMode);

    // Heap Size
    addMemoryOptsToJVMSummary(minHeapSize, getSizeUnitValue('heapSizeSelect'));
    addMemoryOptsToJVMSummary(maxHeapSize, getSizeUnitValue('heapSizeSelect'));


    if (jdkVersion == 'jdkVersion8') {
        // Metaspace
        addMemoryOptsToJVMSummary(defaultMetaspace, getSizeUnitValue('metaSpaceSelect'));
        addMemoryOptsToJVMSummary(maxMetaspace, getSizeUnitValue('metaSpaceSelect'));
    } else {
        // Perm Size
        addMemoryOptsToJVMSummary(defaultPermSize, getSizeUnitValue('permSizeSelect'));
        addMemoryOptsToJVMSummary(maxPermSize, getSizeUnitValue('permSizeSelect'));
    }

    // GC Collector Algorithm
    addTextToJVMSummary(gcCollectorAlgorithm);

    // Use G1 Extra Flags only if the collector algorithm is G1GC
    if (gcCollectorAlgorithm == '-XX:+UseG1GC') {

        addTextToJVMSummary( getG1ExtraFlags());

    }


    // hashcode Algo
    addTextToJVMSummary(hashCodeAlgo);


    // Iterate through performanceOpts
    for (var key in jvmOptsChkBox) {
        if (jvmOptsChkBox.hasOwnProperty(key)) {
            addTextToJVMSummary(jvmOptsChkBox[key]);
        }
    }

}


function addTextToJVMSummary(val) {

    if (!val.trim()) {
        // String is empty; don't do anything
    } else {
        $("#jvmFlagResult").append(val);
        $("#jvmFlagResult").append(space);
    }
}


function addMemoryOptsToJVMSummary(val, sizeSelect) {

    if (!val.trim()) {
        // String is empty; don't do anything
    } else {
        $("#jvmFlagResult").append(val + sizeSelect);
        $("#jvmFlagResult").append(space);
    }
}
