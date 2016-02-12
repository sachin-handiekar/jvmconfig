/**
 * app.js
 */

// JVM Mode -  server or clients
var jvmMode = "-server";

var space = " ";

// GC Collector Algorithm
var gcCollectorAlgorithm = "";

// Enable GC Log Rotation Option
var enableGCLogRotation = "";

// Print GC Details Option
var printGCDetails = "";

var heapDumpOnOOMemory = "";

var aggressiveOpts = "";

var errorFile = "";

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
    } else if (gcAlgo == 'cms') {
        gcCollectorAlgorithm = '-XX:+UseConcMarkSweepGC';
    } else if (gcAlgo == 'parallel') {
        gcCollectorAlgorithm = '-XX:+UseParNewGC -XX:+UseConcMarkSweepGC';
    }


});

/**
 * Reset Form Options
 */
function resetJVMOptions() {
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
    $("#jvmFlagResult").text("");

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


}


function addTextToJVMSummary(val) {
    $("#jvmFlagResult").append(val);
    $("#jvmFlagResult").append(space);
}