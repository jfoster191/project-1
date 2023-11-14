//Constants
const solutionBoard4x4 = [
    1, 2, 4, 3,
    3, 4, 2, 1,
    4, 1, 3, 2,
    2, 3, 1, 4
];

//State Variables
let puzzleBoard4x4;
let solvedCorrectly;
let currentInput;
let currentCell;
let lastCell;
let initial;

//Page Elements to be Accessed Frequently
const gridEl = [...document.querySelectorAll('#board-4-4 > div')];
const submitBtn = document.getElementById('submit');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');
const inputVal = document.getElementById('val-input');
const messageEl = document.querySelector('h1');

//Event Listeners
submitBtn.addEventListener('click', submitClick);
document.querySelector('section').addEventListener('click', gridClick);
resetBtn.addEventListener('click', resetClick)

//Main
init ();

//Functions

function init () {
 puzzleBoard4x4 = [
    null, null, null, 3,
    null, 4, null, 1,
    null, null, 3, 2,
    null, null, null, null
 ];
 solvedCorrectly = null;
 lastCell = null;
 initial = 1;
 render ();
 initial = 0;
}

function render () {
    renderBoard();
    renderMessage();
}

function renderBoard () {
    puzzleBoard4x4.forEach(function(cell, idx) {
        const cellPos = idx;
        const cellEl = document.getElementById(cellPos);
        if (puzzleBoard4x4[idx] === null){return}
        else{
            cellEl.innerText = puzzleBoard4x4[idx];
            if (initial === 1){
                cellEl.style.fontWeight = 'bold';
                cellEl.style.backgroundColor = '#D4D4D4';
            }
        }
    });
}

function renderMessage (){
    if (initial === 1 || currentInput){ messageEl.innerText = ''}
    else if(!currentInput){
    messageEl.innerText = 'Please Enter A Valid Number';
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

function resetClick (){
    gridEl.forEach(function(element){
        element.innerText = '';
    })
    init ();
}