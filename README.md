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

##User Stories
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

##Resources
Meeting User Story 3 requires the following sound resources:

* https://s3.amazonaws.com/freecodecamp/simonSound1.mp3  
* https://s3.amazonaws.com/freecodecamp/simonSound2.mp3  
* https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
* https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
