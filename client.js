// Client-side script for Conway's Game of Life runner
// JS adapted from
// http://disruptive-communications.com/conwaylifejavascript/

var boardDisplay    = document.querySelector("#board");
var height          = boardDisplay.getAttribute("height");
var width           = boardDisplay.getAttribute("width");
var ctx             = boardDisplay.getContext("2d");
ctx.fillStyle       = "#2e74b2";

// *** Height = numRows; Width = numCols
var board = generateBoard(height, width);

function drawBoard(){
    ctx.clearRect(0, 0, height, width);
    for (let row = 0; row < height; row++){
        for (let col = 0; col < width; col++){
            if (board[row][col] === 1){
                ctx.fillRect(row, col, 1, 1);
            }
        }
    }
}
function again(){
    drawBoard();
    board = getNextGen(board);
    requestAnimationFrame(again);
}
again();
