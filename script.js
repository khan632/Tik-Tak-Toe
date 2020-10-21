var Board;
const huPlayer = 'O';
const aiPlayer = 'X';

const winningComb = [
  [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]]
 //------------------------------------------                 

const cells = document.querySelectorAll('.cell');
startGame();
//-----------------------------------------
function startGame(){
  document.querySelector(".endGame").style.display = 'none';
  Board = Array.from(Array(9).keys());
  for(var i = 0; i < cells.length; i++){
    cells[i].innerText = ' ';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}
//-----------------------------------------------------------
function turnClick(square){
  if(typeof Board[square.target.id] == 'number'){
    turn(square.target.id, huPlayer);
    if(!cheakForTie()) turn(bestSpot(), aiPlayer);
  }
}
//--------------------------------------------------------------
function turn(target, player){
  Board[target] = player;
  document.getElementById(target).innerText = player;
  let gameWinner = cheakWinner(Board, player);
  if(gameWinner) gameOver(gameWinner);
}
//---------------------------------------------------------------
function cheakWinner(board, player){
  let play = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);

  let gameWinner = null;
  for(let [index, win] of winningComb.entries()){
    if(win.every(elem => play.indexOf(elem) > -1)){
      gameWinner = {index: index, player: player};
      break;
    }
  }
  return gameWinner;
}
//-----------------------------------------------------------------
function gameOver(gameWinner){
  for(let index of winningComb[gameWinner.index]){
    document.getElementById(index).style.backgroundColor = gameWinner.player == huPlayer ? '#fca652' : '#8675a9';
  }

  for(let i = 0; i < cells.length; i++){
    cells[i].removeEventListener('click', turnClick, false);
  }

  declareWinner(gameWinner.player == huPlayer ? "You Win!!" : "You Lose..");
}
//-------------------------------------------------------------------
function declareWinner(whoIsWinner){
  document.querySelector(".endGame").style.display = "block";
  document.querySelector(".endGame .text").innerText = whoIsWinner;
}
//-------------------------------------------------------------------
function emptySquares(){
  return Board.filter(s => typeof s == 'number');
}
//------------------------------------------------------------------
function bestSpot(){
  return emptySquares()[0];
}
//-------------------------------------------------------------------
function cheakForTie(){
  if(emptySquares().length  == 0){
    for(var i = 0; i < cells.length; i++){
      cells[i].style.backgroundColor = "#7ea04d";
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!!");
    return true;
  }
  return false;
}
