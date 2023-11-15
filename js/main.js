//Constants
const solutionBoard4x4 = [
    1, 2, 4, 3,
    3, 4, 2, 1,
    4, 1, 3, 2,
    2, 3, 1, 4
];
const solutionBoard6x6 = [
    5, 3, 1, 2, 6, 4,
    2, 4, 6, 1, 5, 3, 
    1, 6, 3, 5, 4, 2, 
    4, 5, 2, 3, 1, 6, 
    3, 1, 4, 6, 2, 5, 
    2, 6, 5, 4, 3, 1
];

//State Variables
let puzzleBoard;
let solutionBoard;
let puzzleBoard4x4;
let puzzleBoard6x6;
let choice;
let solvedCorrectly;
let currentInput;
let currentCell;
let lastCell;
let initial;
let checkArr;
let displaying;

//Page Elements to be Accessed Frequently
let gridEl;
const submitBtn = document.getElementById('submit');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');
const inputVal = document.getElementById('val-input');
const messageEl = document.querySelector('h1');
const boardEl = document.getElementById('board');

//Event Listeners
submitBtn.addEventListener('click', submitClick);
document.getElementById('board').addEventListener('click', gridClick);
resetBtn.addEventListener('click', resetClick);
checkBtn.addEventListener('click', checkAnsClick);
document.getElementById('board-4').addEventListener('click', userChoice)
document.getElementById('board-6').addEventListener('click', userChoice)
document.getElementById('board-9').addEventListener('click', userChoice)

//Functions

function init () {
 puzzleBoard4x4 = [
    null, null, null, 3,
    null, 4, null, 1,
    null, null, 3, 2,
    null, null, null, null
 ];
 puzzleBoard6x6 = [
    5, null, null, null, 6, null,
    null, 4, null, 1, null, 3,
    1, null, 3, null, 4, null,
    null, null, 2, null, 1, null,
    null, 1, 4, 6, null, 5,
    null, 6, null, 4, null, null
 ]
 if (choice === 4){ puzzleBoard = puzzleBoard4x4; }
 else if (choice === 6) { puzzleBoard = puzzleBoard6x6; }
 solvedCorrectly = null;
 lastCell = null;
 checkArr = [];
 initial = 1;
 displaying = 1;
 createBoard();
 render ();
 initial = 0;
}

function render () {
    renderBoard();
    renderMessage();
}

function renderBoard () {
    puzzleBoard.forEach(function(cell, idx) {
        const cellPos = idx;
        const cellEl = gridEl[cellPos];
        if (puzzleBoard[idx] === null){return}
        else{
            cellEl.innerText = puzzleBoard[idx];
            if (initial === 1){
                cellEl.style.fontWeight = 'bold';
                cellEl.style.color = '#3282F6';
            }
        }
    });
}

function renderMessage (){
    if (choice === null){
        messageEl.innerText = 'Please Make Your Difficulty Selection'
        return
    }
    if (initial === 1 || currentInput){ messageEl.innerText = ''}
    else if(!currentInput){
    messageEl.innerText = 'Please Enter A Valid Number';
    }
    if (solvedCorrectly === 1){
        messageEl.innerText = 'Congrats You Sovled the Puzzle Correctly!'
    }
    else if (solvedCorrectly === 0){
        messageEl.innerText = 'Take a Look Again, Somethings Not Quite Right'
        solvedCorrectly = null;
    }
}

function submitClick () {
    currentInput = parseInt(inputVal.value);
    if (!currentInput){render();}
    else{
    currentCell.innerText = currentInput;
    currentCell.style.backgroundColor = 'white';
    render();
    }
}

function gridClick (evt) {
    console.log(gridEl)
        if (gridEl.indexOf(evt.target) === -1){return;}
        const cellPos = gridEl.indexOf(evt.target);
        console.log(cellPos)
        lastCell = currentCell;
        if(lastCell){
        lastCell.style.backgroundColor = null;
        }
        currentCell = gridEl[cellPos];
        currentCell.style.backgroundColor = '#808080';
}

function checkAnsClick () {
    gridEl.forEach(function(elem, idx){
        checkArr[idx] = elem.innerText;
    });
    if (checkArr.toString() === solutionBoard.toString()){ solvedCorrectly = 1;} 
    else {solvedCorrectly = 0;}
    console.log(checkArr);
    console.log(solvedCorrectly);
    render();
}

function resetClick (){
    gridEl.forEach(function(element){
        element.innerText = '';
    })
    init ();
}

function userChoice (evt){
    if (evt.target.id === 'board-4'){
        choice = 4;
        puzzleBoard = puzzleBoard4x4;
        solutionBoard = solutionBoard4x4;

    }
    if (evt.target.id === 'board-6'){
        choice = 6;
        puzzleBoard = puzzleBoard6x6;
        solutionBoard = solutionBoard6x6;
    }
    init();
}

function createBoard () {
    if (gridEl){boardEl.innerHTML = '';}
    puzzleBoard.forEach(function(cell, idx){
        const div = document.createElement(`div`);
        boardEl.appendChild(div).setAttribute('id', idx);
     });
     gridEl = [...document.querySelectorAll('#board > div')];
     if (choice === 4){
        boardEl.style.gridTemplateColumns = 'repeat(4, 20vmin)';
        boardEl.style.gridTemplateRows = 'repeat(4, 20vmin)';
     } else if (choice === 6){
        boardEl.style.gridTemplateColumns = 'repeat(6, 13vmin)';
        boardEl.style.gridTemplateRows = 'repeat(6, 13vmin)';
     }
}
