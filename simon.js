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
   onOffButton = new OnOffButton();
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

// ---------------------------------------------------------------------------
// Object Definitions
// ---------------------------------------------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// On/Off Button Object
//
// Object variables:
// - gameState: The state of the game - on or off
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const gameOn = true;
const gameOff = false;

let onOffButton = null;

function OnOffButton() {
   this.gameState = gameOff;

};

// Set the initial state
//
// Returns: N/a
OnOffButton.prototype = {
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
         OnOffButton.turnOn();
      } else {
         OnOffButton.turnOff();
      }
   },

   // Determine if the game is on or off.
   //
   // Returns: True if the game is on, false if it is off.
   isGameOn: () => {
      return this.gameState;
   }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Start Button Object
//
// Object variables:
// - gameMode: The game mode - in-progress or waiting to start
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
      gameEngine.createNewSeries();
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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Strict Button Object
//
// Object variables:
// - playMode: The game play mode - normal or strict
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Player Response Button Object
//
// Object variables:
// - None
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const colors = [{
   name: "red",
   number: 0,
   buttonID: "si-btn-red"
}, {
   name: "blue",
   number: 1,
   buttonID: "si-btn-blue"
}, {
   name: "green",
   number: 2,
   buttonID: "si-btn-green"
}, {
   name: "yellow",
   number: 3,
   buttonID: "si-btn-yellow"
}];

let responseButton = {
   // Highlight the button and play it's corresponding sound
   //
   // Returns: N/a
   blinkNPlayButton: (buttonColor) => {
      buttonID = this.getButtonID(buttonColor);
      $("#"+buttonID).addClass(buttonID);
   },

   // Add the button press to the current set of player responses.
   //
   // Pre-conditions:
   //    1. The game series contains at least one computer generated color.
   //    2. The player series has been created and contains one entry less
   //       than the game series.
   //
   // Returns: N/a
   buttonPress: (thisButton) => {
      if (onOffButton.isGameOn()) {
         let buttonID = $(thisButton).attr("id");
         let buttonColorNum = colors.find((color, index, array) => {
            return color.buttonID === buttonID;
         }).number;
         gameEngine.addNewPlayerResponse(buttonColorNum);
         gameEngine.play(buttonColorNum);
      }
   },

   // Get the user response button id matching that of the specified color.
   //
   // Return: User response button id
   getButtonID: (buttonColor) => {
      const buttonID = colors.find((color, index, array) => {
         return color.name === buttonColor;
      }).buttonID;
      return $("#"+buttonID);
   }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Game Engine Object
//
// Object variables:
// - playerResponses: An array of player responses containing the button color
//                    numbers the player has pressed
// - playsInSeries:   An array of the challenges expressed as button color
//                    numbers the player must respond with.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const playLimit = 20;
const playerResponseDiffers = 0;
const playerResponseMatches = 1;
const playerHasWon = 2;

let gameEngine = {
   // Add a new player response to the player response array
   //
   // Returns: N/a
   addNewPlayerResponse: (buttonColorNum) => {
      this.playerResponses.push(buttonColorNum);
   },

   // Check the provided color against the entry in the series in the same
   // position to see if they match.
   //
   // Returns: playerResponseMatches if the response matches the last entry in
   //              the series
   //          playerHasWon if the response matches after 20 consecutive matches
   //          playerResponseDiffers if it doesn't match.
   checkPlayerResponse: (position, playerColorNum) => {
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
      this.playerResponses = [];
      this.generateNewColor();
      this.replaySeries();
   },

   // Retrieve the most recent color generated by the computer in the current
   // series.
   //
   // Returns: The most recent color added to the series (as colorRed,
   //          colorBlue, colorGreen, or colorYellow). Null if the series is
   //          empty.
   getLastInSeries: () => {
      if (this.playsInSeries.length > 0) {
         return this.playsInSeries[length - 1];
      }
      return null;
   },

   // Generate a new color and add it to the current series
   // Attribution: Mozilla Developer Network Math.random (https://goo.gl/xIe4k)
   //
   // Returns: N/a
   generateNewColor: () => {
      let min = Math.ceil(colorRed);
      let max = Math.floor(colorYellow);
      let newColor = Math.floor(Math.random() * (max - min + 1)) + min;
      this.playsInSeries.push(newColor);
   },

   // Play a turn by evaluating the most recent player response against the
   // most recent computer generated color.
   //
   // Pre-conditions:
   //    1. The player and game series arrays should contain the same number of
   //       entries.
   //
   // Returns: N/a
   play: (buttonColorNum) => {
      let playStatus = this.checkPlayerResponse((responseButton.playerSeries.length - 1), buttonColorNum);


      this.replaySeries();
   },

   // Replay the current series
   //
   // Returns: N/a
   replaySeries: () => {
      this.playsInSeries.forEach(responseButton.blinkNPlayButton(color));
   }
};
