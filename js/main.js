//-------------------Constants-----------------------//
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
const solutionBoard9x9 = [
    4, 5, 3, 8, 2, 6, 1, 9, 7,
    8, 9, 2, 5, 7, 1, 6, 3, 4, 
    1, 6, 7, 4, 9, 3, 5, 2, 8,
    7, 1, 4, 9, 5, 2, 8, 6, 3, 
    5, 8, 6, 1, 3, 7, 2, 4, 9,
    3, 2, 9, 6, 8, 4, 7, 5, 1,
    9, 3, 5, 2, 1, 8, 4, 7, 6,
    6, 7, 1, 3, 4, 5, 9, 8, 2,
    2, 4, 8, 7, 6, 9, 3, 1, 5
];
const thickness = '0.75vmin';


//-------------State Variables--------------------//
let puzzleBoard;
let solutionBoard;
let puzzleBoard4x4;
let puzzleBoard6x6;
let puzzleBoard9x9;
let choice;
let solvedCorrectly;
let currentInput;
let currentCell;
let lastCell;
let initial;
let checkArr;
let displaying;
let startTime;
let endTime;

//---------Page Elements to be Accessed Frequently------------//
let gridEl;
const submitBtn = document.getElementById('submit');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');
const inputVal = document.getElementById('val-input');
const messageEl = document.querySelector('h1');
const boardEl = document.getElementById('board');
const numbersEl = document.getElementById('numbers');

//-------------------Event Listeners--------------//
document.getElementById('board').addEventListener('click', gridClick);
resetBtn.addEventListener('click', resetClick);
checkBtn.addEventListener('click', checkAnsClick);
document.getElementById('board-4').addEventListener('click', userChoice);
document.getElementById('board-6').addEventListener('click', userChoice);
document.getElementById('board-9').addEventListener('click', userChoice);
numbersEl.addEventListener('click', numClick);

//----------------------Main--------------------------//
renderMessage();

//--------------------------Functions----------------------------//

//-----------Initialization Function----------//
function init () {
    puzzleBoard4x4 = [
        null, null, null, 3,
        null, 4, null,null,
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
    ];
    puzzleBoard9x9 = [
        4, 5, null, null, null, null, null, null, null,
        null, null, 2, null, 7, null, 6, 3, null, 
        null, null, null, null, null, null, null, 2, 8,
        null, null, null, 9, 5, null, null, null, null, 
        null, 8, 6, null, null, null, 2, null, null,
        null, 2, null, 6, null, null, 7, 5, null,
        null, null, null, null, null, null, 4, 7, 6,
        null, 7, null, null, 4, 5, null, null, null,
        null, null, 8, null, null, 9, null, null, null
    ];
    if (choice === 4){ puzzleBoard = puzzleBoard4x4; }
    else if (choice === 6) { puzzleBoard = puzzleBoard6x6; }
    else if (choice === 9) { puzzleBoard = puzzleBoard9x9;}
    solvedCorrectly = null;
    lastCell = null;
    checkArr = [];
    initial = 1;
    displaying = 1;
    startTime = Date.now();
    createBoard();
    render ();
    initial = 0;
}


//----------------Rendering Functions------------------//
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
                cellEl.style.color = '#000E8C';
            }
        }
    });
}

function renderMessage (){
    if (choice === undefined){
        messageEl.innerText = 'Please Make Your Difficulty Selection'
        return
    }
    if (initial === 1 || currentInput){ messageEl.innerText = ''}
    else if(!currentInput){
    messageEl.innerText = 'Please Enter A Valid Number';
    }
    if (solvedCorrectly === 1){
        messageEl.innerText = `You Sovled the Puzzle Correctly in ${endTime} Seconds!`
    }
    else if (solvedCorrectly === 0){
        messageEl.innerText = 'Take a Look Again, Somethings Not Quite Right'
        solvedCorrectly = null;
    }
}


//------------------Event Handler Functions------------------//
function numClick (evt) {
    currentInput = parseInt(evt.target.innerText);
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
    if (checkArr.toString() === solutionBoard.toString()){
        solvedCorrectly = 1;
        endTime = (Date.now() - startTime)/1000;
    } 
    else {solvedCorrectly = 0;}
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
    if (evt.target.id === 'board-9'){
        choice = 9;
        puzzleBoard = puzzleBoard9x9;
        solutionBoard = solutionBoard9x9
    }
    init();
}

//----------------Create Board Function-----------------//

function createBoard () {
    if (gridEl){
        boardEl.innerHTML = '';
        numbersEl.innerHTML = '';
    }
    for (i=1; i < choice+1; i++){
        const textEl = document.createElement('p',`id="p${i}"`);
        textEl.innerHTML = `${i}`;
        numbersEl.appendChild(textEl);
    }
    puzzleBoard.forEach(function(cell, idx){
        const div = document.createElement(`div`);
        boardEl.appendChild(div).setAttribute('id', idx);
     });
     gridEl = [...document.querySelectorAll('#board > div')];
     if (choice === 4){
        boardEl.style.gridTemplateColumns = 'repeat(4, 20vmin)';
        boardEl.style.gridTemplateRows = 'repeat(4, 20vmin)';
        for (i=1; i < 14; i+=4){
            document.getElementById(`${i}`).style.borderRight = `${thickness} solid black`
        }
        for (i=4; i < 8; i++){
            document.getElementById(`${i}`).style.borderBottom = `${thickness} solid black`
        }
     } else if (choice === 6){
        boardEl.style.gridTemplateColumns = 'repeat(6, 13vmin)';
        boardEl.style.gridTemplateRows = 'repeat(6, 13vmin)';
        for (i=2; i < 33; i+=6){
            document.getElementById(`${i}`).style.borderRight = `${thickness} solid black`
        }
        for (i=6; i < 12; i++){
            document.getElementById(`${i}`).style.borderBottom = `${thickness} solid black`
        }
        for (i=18; i < 24; i++){
            document.getElementById(`${i}`).style.borderBottom = `${thickness} solid black`
        }
     } else if (choice === 9){
        boardEl.style.gridTemplateColumns = 'repeat(9, 9vmin)';
        boardEl.style.gridTemplateRows = 'repeat(9, 9vmin)';
        for (i=2; i < 75; i+=9){
            document.getElementById(`${i}`).style.borderRight = `${thickness} solid black`
        }
        for (i=5; i < 78; i+=9){
            document.getElementById(`${i}`).style.borderRight = `${thickness} solid black`
        }
        for (i=18; i < 27; i++){
            document.getElementById(`${i}`).style.borderBottom = `${thickness} solid black`
        }
        for (i=45; i < 54; i++){
            document.getElementById(`${i}`).style.borderBottom = `${thickness} solid black`
        }
     }
}