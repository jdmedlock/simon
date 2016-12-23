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
        onOffButton.buttonPress(this);
    });

    // Create a button handler for the start button
    $("#si-btn-start").click(function(event) {
        console.log("Clicked on the start button");
        startButton.buttonPress(this);
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
// Object Definitions
// -------------------------------------------------------------

// On/Off Button Object
const gameOn = true;
const gameOff = false;

let onOffButton = {
   gameState: gameOff,
   // Toggles the current game state. When the state changes from
   // off to on the state of the Start and Strict buttons will be
   // reset and the score will be set to '00'.
   //
   // Returns: N/a
   buttonPress: (thisButton) => {
      if (this.gameState == gameOff) {
         this.gameState = gameOn;
         $(thisButton).removeClass("si-btn-active");
         $(thisButton).addClass("si-btn-active");
         $(thisButton).text("On");
      } else {
         this.gameState = gameOff;
         $(thisButton).removeClass("si-btn-active");
         $(thisButton).text("Off");
      }
   },
   // Returns: the current game state.
   isGameOn: () => {
      return this.gameState;
   }
};

// Start Button Object
const gameInprogress = true;
const gameWaiting = false;

let startButton = {
   gameMode: gameWaiting,
   // Starts and stops game play. When the state changes
   // the score will be set to '00'.
   //
   // Returns: N/a
   buttonPress: (thisButton) => {
      if (onOffButton.isGameOn() == gameOff) {
         if (this.gameMode == gameWaiting) {
            this.gameMode = gameInprogress;
            $(thisButton).removeClass("si-btn-active");
            $(thisButton).addClass("si-btn-active");
            $(thisButton).text("Stop");
         } else {
            this.gameMode = gameWaiting;
            $(thisButton).removeClass("si-btn-active");
            $(thisButton).text("Start");
         }
      }
   }
};
