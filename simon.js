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
   // the message provided by the caller and flashing the score for 3 seconds.
   //
   // Returns: Promise
   alertMsg: function(message) {
      let saveScore = this.gameScore;
      this.updateScore(message);
      $(".si-score").addClass("si-score-flash");
      return new Promise(function(resolve, reject) {
         gameEngine.pause(3)
            .then((resolutionVal) => {
               $(".si-score").removeClass("si-score-flash");
               scoreDisplay.gameScore = saveScore;
               resolve("scoreDisplay.alertMsg completed.");
            }).catch((rejectionVal) => {
               console.log("scoreDisplay.alertMsg Promise Rejected=" + rejectionVal);
               reject("scoreDisplay.alertMsg error");
            });
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
   isGameOn: function() {
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
      scoreDisplay.setInitialState();
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
// - colors:          Array of attributes for each of the four response buttons.
// - playerResponses: An array of player responses containing the button color
//                    numbers the player has pressed
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
   this.playerResponses = [];
};

ResponseButton.prototype = {
   // Add a new player response to the player response array
   //
   // Returns: N/a
   addNewPlayerResponse: function(buttonColorNum) {
      this.playerResponses.push(buttonColorNum);
   },

   // Blink the specified button and play it's corresponding sound
   //
   // Returns: Promise when completed
   blinkNPlayButton: function(buttonColorNum) {
      const buttonID = this.getButtonID(buttonColorNum);
      var audio = new Audio(this.colors[buttonColorNum].sound);
      audio.play();
      $("." + buttonID).addClass(buttonID + "-highlighted");
      gameEngine.pause(.5)
         .then((resolutionVal) => {
            $("." + buttonID).removeClass(buttonID + "-highlighted");
         }).catch((rejectionVal) => {
            console.log("responseButton.blinkNPlay error");
         });
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
         /*
         this.blinkNPlayButton(buttonColorNum)
            .then((resolutionVal) => {
               console.log("responseButton.buttonPress color=" + buttonColorNum + " Promise resolved=" + resolutionVal);
            });
         */
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

   // Get the index of the last response in the playerResponses array.
   //
   // Returns: Index of the last response in the playerResponses array.
   getLastResponseIndex: function() {
      return this.playerResponses.length - 1;
   },

   // Get the number of responses currently in the playerResponses array.
   //
   // Returns: Count of the number of responses in the playerResponses array.
   getResponseCount: function() {
      return this.playerResponses.length;
   },

   // Set the object to its initial state
   //
   // Returns: N/a
   setInitialState: function() {
      this.playerResponses = [];
   }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Game Engine Object
//
// Object variables:
// - turnsInSeries:   An array of the challenges expressed as button color
//                    numbers the player must respond with.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//const playLimit = 20;   // For production
const playLimit = 3; // For testing
const playerResponseDiffers = 0;
const playerResponseMatches = 1;
const playerHasWon = 2;

function GameEngine() {
   this.turnsInSeries = [];
   this.turnPromises = [];
};

GameEngine.prototype = {
   // Check the provided color against the entry in the series in the same
   // position to see if they match.
   //
   // Returns: playerResponseMatches if the response matches the last entry in
   //              the series
   //          playerHasWon if the response matches after 20 consecutive matches
   //          playerResponseDiffers if it doesn't match.
   checkPlayerResponse: function(position, playerColorNum) {
      if (this.turnsInSeries[position] === playerColorNum) {
         if (responseButton.getResponseCount() === playLimit) {
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
         const waitForSecs = waitSeconds * 1000;
         setTimeout(() => {
            resolve("Pause of " + waitSeconds + " completed.");
         }, waitForSecs);
      });
   },

   // Play a turn by evaluating the most recent player response against the
   // most recent computer generated color.
   //
   // Returns: N/a
   play: function(buttonColorNum) {
      responseButton.addNewPlayerResponse(buttonColorNum);
      let playStatus = this.checkPlayerResponse((responseButton.getLastResponseIndex()), buttonColorNum);

      console.log("\nTurn #" + this.turnsInSeries.length);
      console.log("turnsInSeries=" + this.turnsInSeries);
      console.log("playerResponses=" + responseButton.playerResponses);

      switch (playStatus) {
         case playerResponseDiffers:
            scoreDisplay.alertMsg("MISS");
            this.pause(1).then((resolutionVal) => {
               // Create a new series of the same number of turns as the current
               // series if we are in Strict mode.
               if (strictButton.isStrict()) {
                  let noPlays = this.turnsInSeries.length;
                  this.turnsInSeries = [];
                  responseButton.setInitialState();
                  for (let i = 0; i < noPlays; i++) {
                     this.generateNewColor();
                  }
               }
               this.replaySeries();
               responseButton.setInitialState();
            });
            break;
         case playerResponseMatches:
            if (responseButton.getResponseCount() === this.turnsInSeries.length) {
               this.generateNewColor();
               this.replaySeries();
               responseButton.setInitialState();
            }
            break;
         case playerHasWon:
            scoreDisplay.alertMsg("WIN!")
               .then((resolutionVal) => {
                  this.turnsInSeries = [];
                  responseButton.setInitialState();
                  startButton.stopGame();
               });
            break;
         default:
            console.log("Error in gameEngine.play - unknown playStatus=" + playStatus);
      };
   },

   // Replay the current series
   //
   // Returns: N/a
   replaySeries: function() {
      this.turnsInSeries.forEach(function(buttonColorNum) {
         responseButton.blinkNPlayButton(buttonColorNum);
         gameEngine.pause(1)
            .then((resolutionVal) => {
               console.log("gameEngine.replaySeries spacing gap over");
            }).catch((rejectionVal) => {
               console.log("gameEngine.replaySeries spacing gap error");
            });
      });
   }
};
