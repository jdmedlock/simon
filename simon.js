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
let scoreDisplay = null;
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
   scoreDisplay = new ScoreDisplay();
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
// Score Display Object
//
// Object variables:
// - gameScore: The number of turns successfully passed in the series
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function ScoreDisplay() {
   this.gameScore = 0;
};

ScoreDisplay.prototype = {
   // Alert that an error has occurred by replacing the current score with
   // two exclamation points ('!!') and flashing the score for 3 seconds.
   //
   // Returns: N/a
   errorAlert: function() {
      let saveScore = this.gameScore;
      this.updateScore("!!");
      this.flash(1);
      this.gameScore = saveScore;
   },

   // Flash the score for the specified number of seconds
   //
   // Returns: N/a
   flash: function(durationSeconds) {
      $(".si-score").addClass("si-score-flash");
      gameEngine.pause(durationSeconds).then(() => {
         $(".si-score").removeClass("si-score-flash");
      });
   },

   // Set the initial state
   //
   // Returns: N/a
   setInitialState: function() {
      this.updateScore(0);
   },

   // Update the score value
   //
   // Returns: N/a
   updateScore: function(newScore) {
       this.gameScore = newScore;
       $("#si-score").text(this.gameScore);
    },
};

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
      scoreDisplay.setInitialState();
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
// - colors:      Array of attributes for each of the four response buttons.
// - pressCount:  The number of player responses in the current turn.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const colorRed = 0;
const colorBlue = 1;
const colorGreen = 2;
const colorYellow = 3;

function ResponseButton() {
   this.colors = [{
      name: "red",
      number: colorRed,
      buttonID: "si-btn-red",
      sound: "simonSound1.mp3"
   }, {
      name: "blue",
      number: colorBlue,
      buttonID: "si-btn-blue",
      sound: "simonSound2.mp3"
   }, {
      name: "green",
      number: colorGreen,
      buttonID: "si-btn-green",
      sound: "simonSound3.mp3"
   }, {
      name: "yellow",
      number: colorYellow,
      buttonID: "si-btn-yellow",
      sound: "simonSound4.mp3"
   }];
   this.pressCount = 0;
};

ResponseButton.prototype = {
   // Highlight the button and play it's corresponding sound
   //
   // Returns: N/a
   blinkNPlayButton: function(buttonColorNum) {
      const buttonID = this.getButtonID(buttonColorNum);
      $("."+buttonID).addClass(buttonID+"-hovered");
      var audio = new Audio(this.colors[buttonColorNum].sound);
      audio.play();
/*
      gameEngine.pause(.25).then(() => {
         $("."+buttonID).removeClass(buttonID+"-hovered");
      });
*/
      $("."+buttonID).removeClass(buttonID+"-hovered");
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
      if (startButton.isInProgress()) {
         this.pressCount++;
         let buttonID = $(thisButton).attr("id");
         let buttonColorNum = this.colors.find((color, index, array) => {
            return color.buttonID === buttonID;
         }).number;
         this.blinkNPlayButton(buttonColorNum);
         gameEngine.play(buttonColorNum);
      }
   },

   // Get the user response button id matching that of the specified color.
   //
   // Return: User response button id
   getButtonID: function(buttonColorNum) {
      return this.colors.find((color, index, array) => {
         return color.number === buttonColorNum;
      }).buttonID;
   },

   // Set the object to its initial state
   //
   // Returns: N/a
   setInitialState: function() {
      this.pressCount = 0;
   }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Game Engine Object
//
// Object variables:
// - playerResponses: An array of player responses containing the button color
//                    numbers the player has pressed
// - turnsInSeries:   An array of the challenges expressed as button color
//                    numbers the player must respond with.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const playLimit = 20;
const playerResponseDiffers = 0;
const playerResponseMatches = 1;
const playerHasWon = 2;

function GameEngine() {
   this.playerResponses = [];
   this.turnsInSeries = [];
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
      if (this.turnsInSeries[position] === playerColorNum) {
         if (this.turnsInSeries.length === playLimit) {
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
      this.turnsInSeries = [];
      this.playerResponses = [];
      responseButton.setInitialState();
      this.generateNewColor();
      this.replaySeries();
   },

   // Generate a new color and add it to the current series
   // Attribution: Mozilla Developer Network Math.random (https://goo.gl/xIe4k)
   //
   // Returns: N/a
   generateNewColor: function() {
      let min = Math.ceil(colorRed);
      let max = Math.floor(colorYellow);
      let newColor = Math.floor(Math.random() * (max - min + 1)) + min;
      this.turnsInSeries.push(newColor);
      scoreDisplay.updateScore(this.turnsInSeries.length);
   },

   // Pause execution for n seconds
   //
   // Returns: Promise when the timeout has expired
   pause: function(waitSeconds) {
      return new Promise(function(resolve, reject) {
         setTimeout(() => {
            resolve("Pause of " + waitSeconds + " completed.");
         }, waitSeconds * 1000);
      });
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
      this.addNewPlayerResponse(buttonColorNum);
      let playStatus = this.checkPlayerResponse((this.playerResponses.length - 1), buttonColorNum);
      switch (playStatus) {
         case playerResponseDiffers:
            scoreDisplay.errorAlert();

            // Create a new series of the same number of turns as the current
            // series if we are in Strict mode.
            if (strictButton.isStrict()) {
               let noPlays = this.turnsInSeries.length;
               this.turnsInSeries = [];
               this.playerResponses = [];
               for (let i = 0; i < noPlays; i++){
                  this.generateNewColor();
               }
            }
            this.replaySeries();
            break;
         case playerResponseMatches:
            this.generateNewColor();
            this.replaySeries();
            break;
         case playerHasWon:
            scoreDisplay.flash(3);
            break;
         default:
            console.log("Error in gameEngine.play - unknown playStatus="+playStatus);
      };
   },

   // Replay the current series
   //
   // Returns: N/a
   replaySeries: function() {
      this.turnsInSeries.forEach((colorNum, index, array) => {
         this.pause(.5).then(() => {
            responseButton.blinkNPlayButton(colorNum);
         });
      });
   }
};
