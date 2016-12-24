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
// Initialization function(s)
// -------------------------------------------------------------

// Initialization Logic invoked when the DOM is ready for execution
//
// Returns: N/a
$(document).ready(function() {
    console.clear();
    onOffButton.setInitialState();

    // Create a button handler for the on/off button
    $("#si-btn-onoff").click(function(event) {
        console.log("Clicked on the on/off button");
        onOffButton.buttonPress();
    });

    // Create a button handler for the start button
    $("#si-btn-start").click(function(event) {
        console.log("Clicked on the start button");
        startButton.buttonPress();
    });

    // Create a button handler for the strict button
    $("#si-btn-strict").click(function(event) {
        console.log("Clicked on the strict button");
        strictButton.buttonPress();
    });

    // Create a button handler for the help dialog
    $("#si-btn-help").click(function(event) {
        $("#si-help-dialog").css("display", "block");
    });

    // Create a button handler to close the help dialog
    $(".si-dialog-close").click(function(event) {
        $("#si-help-dialog").css("display", "none");
    });

    // Create a button handler for the red player response button
    $("#si-btn-red").click(function(event) {
        console.log("Clicked on the red button");
        responseButton.buttonPress(this);
    });

    // Create a button handler for the blue player response button
    $("#si-btn-blue").click(function(event) {
        console.log("Clicked on the blue button");
        responseButton.buttonPress(this);
    });

    // Create a button handler for the green player response button
    $("#si-btn-green").click(function(event) {
        console.log("Clicked on the green button");
        responseButton.buttonPress(this);
    });

    // Create a button handler for the yellow player response button
    $("#si-btn-yellow").click(function(event) {
        console.log("Clicked on the yellow button");
        responseButton.buttonPress(this);
    });
});

// -------------------------------------------------------------
// Object Definitions
// -------------------------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~
// On/Off Button Object
//~~~~~~~~~~~~~~~~~~~~~
const gameOn = true;
const gameOff = false;

let onOffButton = {
   // Set the initial state
   //
   // Returns: N/a
   setInitialState: () => {
     this.gameState = gameOff;
     $("#si-btn-onoff").removeClass("si-btn-active");
     $("#si-btn-onoff").addClass("si-btn-inactive");
     $("#si-btn-onoff").text("On");
     startButton.stopGame();
     strictButton.normalGame();
   },

   // Turn the game off
   //
   // Returns: N/a
   turnOff: () => {
     this.gameState = gameOff;
     $("#si-btn-onoff").removeClass("si-btn-active");
     $("#si-btn-onoff").addClass("si-btn-inactive");
     $("#si-btn-onoff").text("On");
     startButton.stopGame();
     strictButton.normalGame();
   },

   // Turn the game on
   //
   // Returns: N/a
   turnOn: () => {
     this.gameState = gameOn;
     $("#si-btn-onoff").removeClass("si-btn-inactive");
     $("#si-btn-onoff").addClass("si-btn-active");
     $("#si-btn-onoff").text("Off");
     startButton.stopGame();
     strictButton.normalGame();
   },

   // Toggles the current game state. When the state changes from
   // off to on the state of the Start and Strict buttons will be
   // reset and the score will be set to '00'.
   //
   // Returns: N/a
   buttonPress: () => {
      if (this.gameState == gameOff) {
         onOffButton.turnOn();
      } else {
         onOffButton.turnOff();
      }
   },

   // Determine if the game is on or off.
   //
   // Returns: True if the game is on, false if it is off.
   isGameOn: () => {
      return this.gameState;
   }
};

//~~~~~~~~~~~~~~~~~~~~
// Start Button Object
//~~~~~~~~~~~~~~~~~~~~
const gameInprogress = true;
const gameWaiting = false;

let startButton = {
   // Start a new game
   //
   // Returns: N/a
   newGame: () => {
     this.gameMode = gameInprogress;
     $("#si-btn-start").removeClass("si-btn-inactive");
     $("#si-btn-start").addClass("si-btn-active");
     $("#si-btn-start").text("Stop");
   },

   // Stop the game
   //
   // Returns: N/a
   stopGame: () => {
     this.gameMode = gameWaiting;
     $("#si-btn-start").removeClass("si-btn-active");
     $("#si-btn-start").addClass("si-btn-inactive");
     $("#si-btn-start").text("Start");
   },

   // Starts and stops game play. When the state changes
   // the score will be set to '00'.
   //
   // Returns: N/a
   buttonPress: () => {
      if (onOffButton.isGameOn()) {
         if (this.gameMode == gameWaiting) {
            startButton.newGame();
         } else {
            startButton.stopGame();
         }
      }
   },

   // Determine if the game is in progress.
   //
   // Returns: True if a game is in progress, false if it is waiting to start.
   isInProgress: () => {
      return this.gameMode;
   }
};

//~~~~~~~~~~~~~~~~~~~~~
// Strict Button Object
//~~~~~~~~~~~~~~~~~~~~~
const playNormal = false;
const playStrict = true;

let strictButton = {
   // Enable strict play mode
   //
   // Returns: N/a
   strictGame: () => {
     this.playMode = playStrict;
     $("#si-btn-strict").removeClass("si-btn-inactive");
     $("#si-btn-strict").addClass("si-btn-active");
   },

   // Enable normal play mode
   //
   // Returns: N/a
   normalGame: () => {
     this.playMode = playNormal;
     $("#si-btn-strict").removeClass("si-btn-active");
     $("#si-btn-strict").addClass("si-btn-inactive");
   },

   // Toggles between normal and strict game play
   //
   // Returns: N/a
   buttonPress: () => {
      if (onOffButton.isGameOn()) {
         if (this.playMode == playNormal) {
            strictButton.strictGame();
         } else {
            strictButton.normalGame();
         }
      }
   },

   // Determine if the game play is in Strict mode.
   //
   // Returns: True if a game is to be played strictly, false if it is to be
   //          played normally.
   isStrict: () => {
      return this.playMode;
   }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Player Response Button Object
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const colorRed = 0;
const colorBlue = 1;
const colorGreen = 2;
const colorYellow = 3;
const responseButtonPrefix = "si-btn-";

let responseButton = {
   // Create a new player response series
   //
   // Returns: N/a
   newPlayerSeries: () => {
     this.playerSeries = [];
   },

   // Add the button press to the current set of player responses
   //
   // Returns: N/a
   buttonPress: (thisButton) => {
      if (onOffButton.isGameOn()) {
        let buttonName = $(thisButton).attr("id");
        let buttonColor = buttonName.slice(responseButtonPrefix.length);
        console.log(buttonColor);
      }
   }
};

//~~~~~~~~~~~~~~~~~~~
// Game Engine Object
//~~~~~~~~~~~~~~~~~~~
const playLimit = 20;
const playerResponseDiffers = 0;
const playerResponseMatches = 1;
const playerHasWon = 2;

let gameEngine = {
   // Check the provided color against the entry in the series in the same
   // position to see if they match.
   //
   // Returns: playerResponseMatches if the response matches the last entry in
   //              the series
   //          playerHasWon if the response matches after 20 consecutive matches
   //          playerResponseDiffers if it doesn't match.
   checkPlayerResponse: (position, playerColor) => {
      if (this.playsInSeries[position] === playerColor) {
         if (this.playsInSeries.length === playLimit) {
            return playerHasWon;
         }
         return playerResponseMatches;
      }
      return playerResponseDiffers;
   },

   // Create a new series
   //
   // Returns: N/a
   createNewSeries: () => {
      this.playsInSeries = [];
   },

   // Retrieve the most recent color generated by the computer in the current
   // series.
   //
   // Returns: The most recent color added to the series (as colorRed,
   //          colorBlue, colorGreen, or colorYellow). Null if the series is
   //          empty.
   getLastInSeries: () => {
      if (this.playsInSeries.length > 0) {
         return this.playsInSeries[length-1];
      }
      return null;
   },

   // Generate a new color and add it to the current series
   // Attribution: Mozilla Developer Network Math.random (https://goo.gl/xIe4k)
   //
   // Returns: New color
   generateNewColor: () => {
      let min = Math.ceil(colorRed);
      let max = Math.floor(colorYellow);
      let newColor = Math.floor(Math.random() * (max - min + 1)) + min;
      this.playsInSeries.push(newColor);
      return newColor;
   },

   // Replay the current series
   //
   // Returns: N/a
   replaySeries: () => {

   }
};
