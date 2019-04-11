/*
 * Simple runner for getNextGen / Conway's Game of Life
 *
 * Use: node app.js <rows> <columns> <generations> <delay b/w generations in milliseconds>
 */

const gameOfLife = require('./life.js');

if (process.argv.length < 6){
    console.log(`\tYou must enter 4 arguments: rows, columns, generations, and delay (in milliseconds)`);
    process.exit();
}

var numRows         = process.argv[2];
var numCols         = process.argv[3];
var generations     = process.argv[4];
var delay           = process.argv[5];

var board = generateBoard(numRows, numCols);
for (let i = 0; i < generations; i++){
    board = gameOfLife.getNextGen(board);
    //setTimeout( ()=> gameOfLife.displayBoard(board), delay);
}

function generateBoard(numRows, numCols){
    var board = [];
    for (let row = 0; row < numRows; row++){
        var newRow = [];
        for (let col = 0; col < numCols; col++)
            newRow.push(Math.floor(Math.random() * 2));
        board.push(newRow);
    }
    return board;
}
