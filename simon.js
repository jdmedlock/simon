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

    // Create a button handler for the help dialog
    $(".si-btn-red").click(function(event) {
        console.log("Clicked on the red button");
    });

});

// -------------------------------------------------------------
// User Interface functions
// -------------------------------------------------------------
