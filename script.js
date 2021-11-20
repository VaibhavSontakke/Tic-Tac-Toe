// Your scripts here!
const statusDisplay=document.querySelector(".game--status");

let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""];

const winingsMessage =()=>
`Congratulation!Player${currentPlayer === "X" ? 1:2} wins`;

const drawMessage="Draw!";
const currentPlayerTurn= ()=>
`It's Player${currentPlayer === "X" ? 1:2}'s turn`;

statusDisplay.innerHTML=currentPlayerTurn();
const winingConditions=[
             [0,1,2],
             [3,4,5],
             [6,7,8],
             [0,3,6],
             [1,4,7],
             [2,5,8],
             [0,4,8],
             [2,4,6],
];
document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
        .querySelector(".game--restart")
        .addEventListener("click", handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell=clickedCellEvent.target;
    const clickedCellIndex=parseInt(clickedCell.id)-1;

    if(!gameActive || gameState[clickedCellIndex]!=="")return;
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame(){
    gameActive=true;
    currentPlayer="X";
    gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML=""));
}
function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
}
function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i< winingConditions.length;i++){
        const winConditions=winingConditions[i];
        let a=gameState[winConditions[0]];
        let b=gameState[winConditions[1]];
        let c=gameState[winConditions[2]];
        if(a===""||b===""||c==="")continue;
        if(a===b&&b===c){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML=winingsMessage();
        gameActive=false;
        return;
    }
    let roundDraw=!gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML=drawMessage;
        gameActive=false;
        return;
    }
    handlePlayerChange();
}
function handlePlayerChange(){
    currentPlayer=currentPlayer==="X" ? "O":"X";
    statusDisplay.innerHTML=currentPlayerTurn();
}
            





