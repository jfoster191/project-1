//Constants
const solutionBoard4x4 = [
    1, 2, 4, 3,
    3, 4, 2, 1,
    4, 1, 3, 2,
    2, 3, 1, 4
];

//State Variables
let puzzleBoard
let puzzleBoard4x4;
let puzzleBoard6x6;
let choice;
let solvedCorrectly;
let currentInput;
let currentCell;
let lastCell;
let initial;
let checkArr;

//Page Elements to be Accessed Frequently
let gridEl;
const submitBtn = document.getElementById('submit');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');
const inputVal = document.getElementById('val-input');
const messageEl = document.querySelector('h1');

//Event Listeners
submitBtn.addEventListener('click', submitClick);
document.getElementById('board-4-4').addEventListener('click', gridClick);
document.getElementById('board-6-6').addEventListener('click', gridClick);
resetBtn.addEventListener('click', resetClick);
checkBtn.addEventListener('click', checkAnsClick);
document.getElementById('board-4').addEventListener('click', userChoice)
document.getElementById('board-6').addEventListener('click', userChoice)
document.getElementById('board-9').addEventListener('click', userChoice)

//Main
hideGrids();

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
 if (choice === 4){ puzzleBoard = puzzleBoard4x4;}
 else if (choice === 6){ puzzleBoard = puzzleBoard6x6}
 solvedCorrectly = null;
 lastCell = null;
 checkArr = [];
 initial = 1;
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
        const cellEl = document.getElementById(cellPos);
        if (puzzleBoard[idx] === null){return}
        else{
            cellEl.innerText = puzzleBoard[idx];
            if (initial === 1){
                cellEl.style.fontWeight = 'bold';
                cellEl.style.backgroundColor = '#D4D4D4';
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
        if (gridEl.indexOf(evt.target) === -1){return;}
        const cellPos = gridEl.indexOf(evt.target);
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
    if (checkArr.toString() === solutionBoard4x4.toString()){ solvedCorrectly = 1;} 
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
        gridEl = [...document.querySelectorAll('#board-4-4 > div')];
        gridEl.forEach(function(cell){
            cell.removeAttribute('hidden')
            choice = 4;
        })
    }
    else if (evt.target.id === 'board-6'){
        gridEl = [...document.querySelectorAll('#board-6-6 > div')]
        gridEl.forEach(function(cell){
            cell.removeAttribute('hidden')
            choice = 6;
        })
    }
    init();
}

function hideGrids (){
    gridEl = [...document.querySelectorAll('#board-4-4 > div')];
    gridEl.forEach(function(cell){
        cell.setAttribute('hidden', 'hidden')
    })

    gridEl = [...document.querySelectorAll('#board-6-6 > div')];
    gridEl.forEach(function(cell){
        cell.setAttribute('hidden', 'hidden')
    })
    choice = null;
    renderMessage();
}