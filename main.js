const cells = document.querySelectorAll(".cell");
const turn = document.querySelector("#turn");
const message = document.querySelector("#msg");
const restartBtn = document.querySelector("#restartBtn");
const startBtn = document.querySelector("#startBtn");
const btnGroup = document.querySelector("#btnGroup");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


startBtn.addEventListener('click', () =>{
    startBtn.classList.toggle('hidden');
    btnGroup.classList.toggle('hidden');
    startGame();
})

restartBtn.addEventListener('click', restartGame);

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked, {once: true}));
    restartBtn.addEventListener("click", restartGame);
    turn.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !== "" || !running)
        return;

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, cellIndex){
    options[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    turn.textContent = `${currentPlayer}'s turn`; 
}

function checkWinner(){
    let win = false;

    for(let i = 0; i < winConditions.length; i++){
        let combination = winConditions[i];

        let cellA = options[combination[0]];
        let cellB = options[combination[1]];
        let cellC = options[combination[2]];

        if(cellA == "" || cellB == "" || cellC == "")
            continue;

        if(cellA == cellB && cellB == cellC){
            win = true;
            break;
        }
    }

    if(win){
        btnGroup.classList.toggle('hidden');
        message.textContent = `${currentPlayer} Wins!`
        running = false;
        restartBtn.classList.toggle('hidden');
        return;
    }
    
    if(!options.includes("")){
        btnGroup.classList.toggle('hidden');
        message.textContent = "Match Draw!";
        running = false;
        restartBtn.classList.toggle('hidden');
    }
    else
        changePlayer();
}

function restartGame(){
    currentPlayer = "X";
    options.fill("");
    cells.forEach(cell => cell.textContent = "");
    turn.textContent = "";
    message.textContent = "Tic-Tac-Toe";
    startBtn.classList.toggle('hidden');
    restartBtn.classList.toggle('hidden');
}
