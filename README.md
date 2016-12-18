# simon

##Overview
This project implements a virtual Simon game to fulfill the last of the
Advanced Frontend Development Certificate offered by
[freeCodeCamp](http://freeCodeCamp.com).

[Simon](https://en.wikipedia.org/wiki/Simon_(game)) is an electronic game
developed in the late-1970's which tests the players memory by requiring the
player to repeat an increasing series of colors. The game has four buttons,
each in a primary color, which light up in a random sequence that the players
must repeat. The length of the sequence is incremented in each successive
round of play.

An example of a Simon simulator can be found
[here](https://codepen.io/FreeCodeCamp/full/obYBjE) .

###User Stories
A successful implementation of the Simon game must satisfy the following
user stories:

1. I am presented with a random series of button presses.
2. Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
3. I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
4. If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
5. I can see how many steps are in the current series of button presses.
6. If I want to restart, I can hit a button to do so, and the game will return to a single step.
7. I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
8. I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

###Resources
Meeting User Story 3 requires the following sound resources:

* https://s3.amazonaws.com/freecodecamp/simonSound1.mp3  
* https://s3.amazonaws.com/freecodecamp/simonSound2.mp3  
* https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
* https://s3.amazonaws.com/freecodecamp/simonSound4.mp3

##Design

###Example Game Image:
![alt text](https://github.com/jdmedlock/simon/blob/master/Simon_Game_Example.png?raw=true "Simon Game Example")

###States & Modes

The terms state and mode are both used to define the condition of the game at
any point in time. The difference between the two is that a state is the
current status of the game and encompasses whatever mode of operation it
happens to be in at a point in time. The mode describes the operational
condition of the game which directs how it is to be played. So, the state
describes the overall condition of the game while the mode prescribes a set of
rules to be followed for its operation.

It is important to note that only one state may be in effect at any point in
time, but multiple modes of operation by be concurrent with one another as long
as they are of different categories.

| State	  | Description                                                  |
|----------|--------------------------------------------------------------|
| Game on  | The game is powered on and game play modes are ready for use |
| Game off | The game is powered off                                      |

| Mode	         | Description
|-----------------|--------------------------------------|
| Game-Inprogress	| Game play is in progress             |
| Game-Waiting	   | Game play is waiting to start        |
| Play-Normal	   | Normal game play rules are in effect |
| Play-Strict	   | Strict game play rules are in effect |

###State/Mode Transitions

|Starting State/Mode	| Allowable Actions	| Next State/Mode |
|--------------------|--------------------|-----------------|
|Game-Off	         | • On	            | • Game-On       |
|Game-On	            | • Strict	         | • Play-Strict   |
|                  	| • Start	         | • Play-Normal   |
|     	            | • Off	            | • Game-Off      |
|Play-Normal	      | • Start	         | • Play-Normal   |
|	    	            | • Strict (enable)	| • Play-Strict   |
|    	               | • Off	            | • Game-Off      |
|	    	            | • Game play        |                 |
|Play-Strict	      | • Start	         | • Play-Normal   |
|    	               | • Strict (disable)	| • Play-Strict   |
|    	               | • Off	            | • Game-Off      |
|    	               | • Game play        |                 |

###User Interface Rules:

| Component	      | Purpose	            | # | Action                        | Desired Result    |
|-----------------|-----------------------|---|-------------------------------|-------------------|
| Button - Off/On	|Turns the game off     | 1 |	Off	                          | • No other buttons functional while in off state |
| Button - Off/On	|Turn the game on	      | 2 |	On	                          | • All game controls functional. <br/> • The game can be turned off at any point as long as it is on. |
| Button - Start	|Start new game	      | 1 |	Starts a new round of play  	| • A new round of play is started with a sequence of one. <br/> • Start can be pressed at any time as long as the game is turned on |
| Button - Strict	|Enable Strict mode     | 1 |	Enables strict game play mode	| • If an incorrect response is made the game notifies the player and it restarts at a new random series of button presses. <br/> • The new series has the same length as the prior sequence |
| Button - Strict	|Disable Strict mode|2|	Disable strict game play mode	|• Return to normal game play mode. <br/> • If the wrong button is pressed the player is notified and that series of button presses starts again to remind the player of the pattern so she can try again |
| Count	          |Game count	         | 1 |	Displays the number of steps in the current sequence. Two digit max.	| • Updated at the start of each round of play |
| Count	          |Error notification    | 2 |	Displays a sentinel if an error occurs | • For example, exclamation points. <br/> • After 2 seconds returns to displaying number of steps in the current series. |
| Button - Player Response	|Main game play interface | 1 | Challenge playback	| • The current round of color/sound sequences are played to challenge the users memory. <br/> • Each time a series of button presses is correctly entered, the same series of button presses is echoed back, but with an additional step |
| Button - Player Response	|Main game play interface	|2| Player response to challenge playback | • The player presses the buttons in the same sequence as the previous challenge playback to win. <br/> 	• I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button. <br/>   • If the wrong button is pressed the player is notified and that series of button presses starts again to remind the player of the pattern so she can try again <br/>   • A win is a series of 20 correctly entered steps. I am notified of my victory, then the game starts over. |
