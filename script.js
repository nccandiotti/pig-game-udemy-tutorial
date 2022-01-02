'use strict';
//added 'hidden' class to CSS (did not exist) so that we could hide the dice in the beginning.
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
let score0El = document.getElementById(`score--0`);
let score1El = document.getElementById(`score--1`);
let current0El = document.getElementById(`current--0`);
let current1El = document.getElementById(`current--1`);
// el for element, not to confuse with the score value of score 0 and score 1
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

//declaring empty variables with commas - they are all "let" so that they can be reassigned within the init function
//since they are declared here, they can now be recycled in any function. if not declared outside init function, they will not work and will only be accessible within the init function
let totalScore, currentScore, activePlayer, playing;

//starting conditions, these cannot be inside functions otherwise they would keep being set to zero
// now that starting conditions are in a function, they will not get started when it loads, so need to call it
const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0; // makes sense for active player to be set to zero and one because arrays start at zero
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  //remove on both because javascript will not know which is the active player
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
// run init to start game with all of the starting variables and values

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //Switch to next player
    } else {
      //reassigning active player here
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. add current score to active player's score, total scores are scored in the totalScores array
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    //2. check if player's score is >=100
    //Finish game
    if (totalScore[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
console.log('Welcome');
