
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const phraseUl = document.querySelector('#phrase ul');
const ol = document.querySelector('#scoreboard ol');
const restartButton = document.createElement('button');
restartButton.innerText = 'Restart Game';
restartButton.style.width = '5em';
restartButton.style.margin = '20px auto';

// Array holding 5 different phrases
const phrases = [
    'The barrel is hollow',
    'I got pitted',
    'The winds are howling',
    'I am riding a single fin',
    'After the session we are going to go get breaky'
];

//Missed attempts counter.
let missed = 0;

//Event Listener's for start button and restart button
startButton.addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
});

restartButton.addEventListener('click', () => {
    restartGame();
});

// Initial call to start game and populate the phrase in the display
const phraseArray = getRandomPhrasesArray(phrases);
addPhraseToDisplay(phraseArray);

// Event Listener for keyboard buttons
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON' && e.target.className !== 'chosen') {
        e.target.className = 'chosen';
        const letterFound = checkLetter(e.target.textContent);
        if (letterFound === null) {
            let attempts = document.querySelector('#scoreboard ol').children;
            let heart = attempts[missed].childNodes[0];
            heart.src = 'images/lostHeart.png';
            missed ++;
            checkWin();
        } else {
            checkWin();
        };
    } 
});

function getRandomPhrasesArray(arr) {
    // The purpose of the function is to take an array, randomly choose string,
    // split the string and return it.
    const i = Math.floor(Math.random() * arr.length);
    const random = arr[i];
    const randomPhrase = random.split('');
    return randomPhrase;
};

// Function to add selected phrase letters and add them to the display.
function addPhraseToDisplay(arr) {
    for (i=0; i < arr.length; i++) {
        let letter = document.createTextNode(arr[i]);
        let li = document.createElement('li');
        li.append(letter);
        phraseUl.append(li);

        if (li.textContent === " ") {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
};

// Function checks if the letter selected matches any of the letters in the array.
function checkLetter(buttonText) {
    const elementsLi = document.getElementsByClassName('letter');
    let match = null;
    for (i=0; i<elementsLi.length; i++) {
        const li = elementsLi[i];
        if (li.textContent.toLowerCase() === buttonText) {
            li.className += ' show';
            // Transition state for correctly chosen letters.
            li.style.transition = '2s';
            match += buttonText;
        } else {};
    }
    return match
}; 

// Function checks if the number of chosen letter match the letter in the phrase. 
function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const overlay = document.getElementById('overlay');

    if (letter.length == show.length) {
        overlay.className = 'win';
        overlay.innerText = 'CONGRATS! You Won!';
        overlay.style.display = 'flex';
        overlay.append(restartButton);


    } else if (missed > 4) {
        overlay.className = 'lose';
        overlay.innerText = 'BUMMER! You Lost!';
        overlay.style.display = 'flex';
        overlay.append(restartButton);
    }
};

//Function to clear the board and restart the game.
function restartGame() {
    document.getElementById('overlay').style.display = 'none';
    phraseUl.innerHTML = '';
    const phraseArray = getRandomPhrasesArray(phrases);
    addPhraseToDisplay(phraseArray);
    missed = 0;
    const buttons = qwerty.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('chosen');
    }
    document.querySelectorAll('.tries img').forEach(e => e.src = 'images/liveHeart.png');
};

