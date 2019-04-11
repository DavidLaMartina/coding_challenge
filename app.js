/*
 * Simple runner for getNextGen / Conway's Game of Life
 * Displays start and end results and times only if numsCols & numRows <= 10
 * Play-by-play better suited to browser
 *
 * Use: node app.js <rows> <columns> <generations>
 */

const gameOfLife = require('./life.js');

if (process.argv.length < 5){
    console.log("\tYou must enter 3 arguments: rows, columns, and generations");
    process.exit();
}

var numRows         = process.argv[2];
var numCols         = process.argv[3];
var generations     = process.argv[4];

if (
    (numRows > 1000 || numRows < 3) ||
    (numCols > 1000 || numCols < 3) ||
    (generations > 1000 || generations < 1) ){
    console.log("\tKeep rows, columns, and generations between 1 and 1000");
    process.exit();
}

var board = gameOfLife.generateBoard(numRows, numCols);
if (numRows <= 10 && numCols <= 10)
    gameOfLife.displayBoard(board);

var start = new Date();
for (let i = 0; i < generations; i++){
    board = gameOfLife.getNextGen(board);
}
var end = new Date - start;

if (numRows <= 10 && numCols <= 10)
    gameOfLife.displayBoard(board);
console.log("Loop execution time: %dms", end);
