//
// File Name: simon.js
// Date: 12/17/2016
// Programmer: Jim Medlock
//
// Attributions:
// - N/a
/* @flow */

"use strict";

let onOffButton = null;
let startButton = null;
let strictButton = null;
let responseButton = null;
let gameEngine = null;


// -------------------------------------------------------------
// Initialization function(s)
// -------------------------------------------------------------

// Initialization Logic invoked when the DOM is ready for execution
//
// Returns: N/a
$(document).ready(function() {
   console.clear();
   onOffButton = new OnOffButton();
   startButton = new StartButton();
   strictButton = new StrictButton();
   responseButton = new ResponseButton();
   gameEngine = new GameEngine();
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

function OnOffButton() {
   this.gameState = gameOff;
};

OnOffButton.prototype = {
  // Set the initial state
  //
  // Returns: N/a
   setInitialState: function() {
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
   turnOff: function() {
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
   turnOn: function() {
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
   buttonPress: function() {
      if (this.gameState == gameOff) {
         this.turnOn();
      } else {
         this.turnOff();
      }
   },

   // Determine if the game is on or off.
   //
   // Returns: True if the game is on, false if it is off.
   isGameOn: function()  {
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

function StartButton() {
   this.gameMode = gameWaiting;
};

StartButton.prototype = {
   // Start a new game
   //
   // Returns: N/a
   newGame: function() {
      this.gameMode = gameInprogress;
      $("#si-btn-start").removeClass("si-btn-inactive");
      $("#si-btn-start").addClass("si-btn-active");
      $("#si-btn-start").text("Stop");
      gameEngine.createNewSeries();
   },

   // Stop the game
   //
   // Returns: N/a
   stopGame: function() {
      this.gameMode = gameWaiting;
      $("#si-btn-start").removeClass("si-btn-active");
      $("#si-btn-start").addClass("si-btn-inactive");
      $("#si-btn-start").text("Start");
   },

   // Starts and stops game play. When the state changes
   // the score will be set to '00'.
   //
   // Returns: N/a
   buttonPress: function() {
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
   isInProgress: function() {
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

function StrictButton() {
   this.playMode = playNormal;
};

StrictButton.prototype = {
   // Enable strict play mode
   //
   // Returns: N/a
   strictGame: function() {
      this.playMode = playStrict;
      $("#si-btn-strict").removeClass("si-btn-inactive");
      $("#si-btn-strict").addClass("si-btn-active");
   },

   // Enable normal play mode
   //
   // Returns: N/a
   normalGame: function() {
      this.playMode = playNormal;
      $("#si-btn-strict").removeClass("si-btn-active");
      $("#si-btn-strict").addClass("si-btn-inactive");
   },

   // Toggles between normal and strict game play
   //
   // Returns: N/a
   buttonPress: function() {
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
   isStrict: function() {
      return this.playMode;
   }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Player Response Button Object
//
// Object variables:
// - None
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const colorRed = 0;
const colorBlue = 1;
const colorGreen = 2;
const colorYellow = 3;

const colors = [{
   name: "red",
   number: colorRed,
   buttonID: "si-btn-red"
}, {
   name: "blue",
   number: colorBlue,
   buttonID: "si-btn-blue"
}, {
   name: "green",
   number: colorGreen,
   buttonID: "si-btn-green"
}, {
   name: "yellow",
   number: colorYellow,
   buttonID: "si-btn-yellow"
}];

function ResponseButton() {
};

ResponseButton.prototype = {
   // Highlight the button and play it's corresponding sound
   //
   // Returns: N/a
   blinkNPlayButton: function(buttonColor) {
      const buttonID = this.getButtonID(buttonColor);
      $("."+buttonID).addClass(buttonID+".hovered");
      //TODO: Add sound playback
   },

   // Add the button press to the current set of player responses.
   //
   // Pre-conditions:
   //    1. The game series contains at least one computer generated color.
   //    2. The player series has been created and contains one entry less
   //       than the game series.
   //
   // Returns: N/a
   buttonPress: function(thisButton) {
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
   getButtonID: function(buttonColorNum) {
      return colors.find((color, index, array) => {
         return color.number === buttonColorNum;
      }).buttonID;
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

function GameEngine() {
   this.playerResponses = [];
   this.playsInSeries = [];
};

GameEngine.prototype = {
   // Add a new player response to the player response array
   //
   // Returns: N/a
   addNewPlayerResponse: function(buttonColorNum) {
      this.playerResponses.push(buttonColorNum);
   },

   // Check the provided color against the entry in the series in the same
   // position to see if they match.
   //
   // Returns: playerResponseMatches if the response matches the last entry in
   //              the series
   //          playerHasWon if the response matches after 20 consecutive matches
   //          playerResponseDiffers if it doesn't match.
   checkPlayerResponse: function(position, playerColorNum) {
      if (this.playsInSeries[position] === playerColorNum) {
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
   createNewSeries: function() {
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
   getLastInSeries: function() {
      if (this.playsInSeries.length > 0) {
         return this.playsInSeries[length - 1];
      }
      return null;
   },

   // Generate a new color and add it to the current series
   // Attribution: Mozilla Developer Network Math.random (https://goo.gl/xIe4k)
   //
   // Returns: N/a
   generateNewColor: function() {
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
   play: function(buttonColorNum) {
      let playStatus = this.checkPlayerResponse((this.playerResponses.length - 1), buttonColorNum);


      this.replaySeries();
   },

   // Replay the current series
   //
   // Returns: N/a
   replaySeries: function() {
      this.playsInSeries.forEach((color, index, array) => {
        responseButton.blinkNPlayButton(color);
      });
   }
};
