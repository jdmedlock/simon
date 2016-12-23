//
// File Name: simon.js
// Date: 12/17/2016
// Programmer: Jim Medlock
//
// Attributions:
// - N/a
/* @flow */

"use strict";
// -------------------------------------------------------------
// Global variables & constants
// -------------------------------------------------------------


// -------------------------------------------------------------
// Initialization function(s)
// -------------------------------------------------------------

// Initialization Logic invoked when the DOM is ready for execution
//
// Returns: N/a
$(document).ready(function() {
    console.clear();

    // Create a button handler for the on/off button
    $("#si-btn-onoff").click(function(event) {
        console.log("Clicked on the on/off button");
    });

    // Create a button handler for the start button
    $("#si-btn-start").click(function(event) {
        console.log("Clicked on the start button");
    });

    // Create a button handler for the strict button
    $("#si-btn-strict").click(function(event) {
        console.log("Clicked on the strict button");
    });

    // Create a button handler for the red player response button
    $("#si-btn-red").click(function(event) {
        console.log("Clicked on the red button");
    });

    // Create a button handler for the blue player response button
    $("#si-btn-blue").click(function(event) {
        console.log("Clicked on the blue button");
    });

    // Create a button handler for the green player response button
    $("#si-btn-green").click(function(event) {
        console.log("Clicked on the green button");
    });

    // Create a button handler for the yellow player response button
    $("#si-btn-yellow").click(function(event) {
        console.log("Clicked on the yellow button");
    });

});

// -------------------------------------------------------------
// User Interface functions
// -------------------------------------------------------------
