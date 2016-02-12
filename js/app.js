/**
 * app.js
 */

// JVM Mode -  server or clients
var jvmMode = "-server";
var space = " ";
var gcCollectorAlgorithm = "";
var enableGCLogRotation = "";
var printGCDetails = "";
var heapDumpOnOOMemory = "";
var aggressiveOpts = "";
var errorFile = "";
var largePages = "";

/**
 * Function to invoke on document ready.
 */
$(document).ready(function () {

    resetJVMOptions();

    $("[data-toggle=tooltip]").tooltip();

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
    }


});

/**
 * Reset Form Options
 */
function resetJVMOptions() {
    // Hide the G1 extra option panel
    $("#g1ExtraFlags").addClass('hidden');


    $("#printGCDetails").text("unchecked");
    $("#enableGCLogRotation").text("unchecked");
}


/**
 * Global Change Listener
 */
$("form :input").change(function () {
    // Print GC Details
    validateCheckboxInput("printGCDetails", "-verbose:gc -XX:+PrintGCDetails");

    // Log Rotation
    validateCheckboxInput("enableGCLogRotation", "-Xloggc:gc.log.'date +%Y%m%d%H%M%S' -XX:+UseGCLogFileRotation");

    // heapDumpOnOOMemory
    validateCheckboxInput("heapDumpOnOOMemory", "-XX:-HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heapDump.hprof");

    //aggressiveOpts
    validateCheckboxInput("aggressiveOpts", "-XX:+AggressiveOpts");

    //errorFile
    validateCheckboxInput("errorFile", "-XX:ErrorFile=C:/log/java/java_error.log");

    //largePages
    validateCheckboxInput("largePages", "-XX:+UseLargePages");

    refreshJVMFlagRef();
});


function validateCheckboxInput(chkboxId, jvmFlag) {
    if ($("#" + chkboxId).is(':checked')) {
        this[chkboxId] = jvmFlag;
    } else {
        this[chkboxId] = '';
    }
}


/**
 * Refresh the JVM Options Summary textbox
 */
function refreshJVMFlagRef() {
    $("#jvmFlagResult").text('');

    // Set the JVM Mode
    addTextToJVMSummary(jvmMode);

    // GC Collector Algorithm
    addTextToJVMSummary(gcCollectorAlgorithm);

    // Print GC Details
    addTextToJVMSummary(printGCDetails);

    // GC Log Rotation
    addTextToJVMSummary(enableGCLogRotation);

    // GC Log Rotation
    addTextToJVMSummary(heapDumpOnOOMemory);

    //Enable AggressiveOpts
    addTextToJVMSummary(aggressiveOpts);

    //Enable Largepages
    addTextToJVMSummary(largePages);
}


function addTextToJVMSummary(val) {

    if (!val.trim()) {
        // String is empty; don't do anything
    } else {
        $("#jvmFlagResult").append(val);
        $("#jvmFlagResult").append(space);
    }


}