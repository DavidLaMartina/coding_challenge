/*
* i3logix Code Challenge
*
* Please refer to the README.md for challenge questions and complete your challenge below.
*/

function getNextGen(board,              // 2d array of 1s and 0s
                    minNeighbors = 2,   // < min --> cell dies
                    maxNeighbors = 3,   // > max --> cell dies
                    reproduceAt = 3,    // == reproduce --> cell revives
                    reach = 1){         // neighbor distance to check
// Take 2d rectangular binary array; return next generation as 2d binary array
// * Returns NULL if input invalid *

    if (!isBoardValid(board)) return null;
    var numRows = board.length;
    var numCols = board[0].length;

    // Pad original board to avoid bad array referencing
    var paddedBoard = padBoard(board, reach);
    var newBoard = [];
    var neighborTotal;

    // Create kernel once per row. For each subseqent column, drop left neighbor
    // count & add right neighbor count. Avoids redundant array element access.
    for (let row = reach; row < numRows + reach; row++){
        var newRow = [];
        var kernel = createKernel(paddedBoard, row, reach, reach);
        for (let col = reach; col < numCols + reach; col++){
            neighborTotal = totalKernel(paddedBoard, kernel, row, col);
            if (neighborTotal < minNeighbors || neighborTotal > maxNeighbors){
                newRow.push(0);
            }else if (neighborTotal === reproduceAt){
                newRow.push(1);
            }else{
                newRow.push(paddedBoard[row][col]);
            }
            advanceKernel(paddedBoard, kernel, row, col, reach);
        }
        newBoard.push(newRow);
    }
    return newBoard;
}

function isBoardValid(board){
// Is board rectangular single-nested array with all 0s and 1s?
    if (!Array.isArray(board)){
      return false;
    }
    if (!board.every( function(row){
        return (Array.isArray(row) && row.length === board[0].length);
    })){
        return false;
    }
    if (!board.every( function(row){
        return row.some(function(element){
            return (element !== 1 && element !== 0);
        })
    })){
        return false;
    }
    //
    // for (let row = 0; row < board.length; row++){
    //     if (!Array.isArray(board[row]) || board[row].length !== board[0].length){
    //         return false;
    //     }
    // }
    // for (let row = 0; row < board.length; row++){
    //     for (let col = 0; col < board[row].length; col++){
    //         if (board[row][col] !== 1 && board[row][col] !== 0){
    //             return false;
    //         }
    //     }
    // }
    //
    // if (board.some( function(outEle){
    //     if (!Array.isArray(outEle) || outEle.length !== board[0].length){
    //         return true;
    //     }
    //     if (outEle.some( inEle => inEle !== 0 && inEle !== 1 ? true : false)){
    //         return true;
    //     }
    // })){
    //     return false;
    // }
    return true;
}

function padBoard(board, pad){
// Adds zeroes in perimeter of thickness=pad
    var numRows = board.length;
    var numCols = board[0].length;
    var paddedBoard = [];

    for (let row = 0; row < numRows + pad * 2; row++){
        var newRow = new Array(numCols + pad * 2);
        for (let col = 0; col < numCols + pad * 2; col++){
            newRow[col] = 0;
        }
        paddedBoard.push(newRow);
    }
    for (let row = 0; row < numRows; row++){
        for (let col = 0; col < numCols; col++)
            paddedBoard[row + pad][col + pad] = board[row][col];
    }
    return paddedBoard;
}

function createKernel(board, centerRow, centerCol, reach){
// Square structuring element (kernel), side length=reach * 2 + 1
// 1d array representing per-column neighbor counts centered on given cell
    var kernel = [];
    for (let col = centerCol - reach; col <= centerCol + reach; col++){
        var onesCount = 0;
        for (let row = centerRow - reach; row <= centerRow + reach; row++){
            if (board[row][col] === 1) onesCount++;
        }
        kernel.push(onesCount);
    }
    return kernel;
}

function advanceKernel(board, kernel, centerRow, centerCol, reach){
// Shift kernel 1 column right, dropping left-most column
    kernel.shift();
    var onesCount = 0;
    var newFarMostCol = centerCol + reach + 1;
    for (let row = centerRow - reach; row <= centerRow + reach; row++){
        onesCount += board[row][newFarMostCol];
    }
    kernel.push(onesCount);
}

function totalKernel(board, kernel, centerRow, centerCol){
// Totals neighbor count for kernel - not counting center element
    var total = 0;
    for (let num of kernel) total += num;
    if (board[centerRow][centerCol] === 1){
        total --;
    }
    return total;
}

function generateBoard(numRows, numCols){
    var board = [];
    for (let row = 0; row < numRows; row++){
        var newRow = [];
        for (let col = 0; col < numCols; col++){
            newRow.push(Math.floor(Math.random() * 2));
        }
        board.push(newRow);
    }
    return board;
}

function displayBoard(board){
// exports.displayBoard = function(board){
    for (const rowIdx of board.keys()){
        for (const colIdx of board[rowIdx].keys()){
            if (colIdx < board[rowIdx].length - 1){
                process.stdout.write(board[rowIdx][colIdx] + '\t');
            }else{
                process.stdout.write(board[rowIdx][colIdx] + '\n');
            }
        }
    }
    process.stdout.write('\n');
}

var exportFunc = {
    getNextGen: getNextGen,
    generateBoard: generateBoard,
    displayBoard: displayBoard
};

// Help on module export to Node and browser from:
// https://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = exportFunc;
}else if (typeof define === 'function' && define.amd){
    define([], function() {
        return exportFunc;
    });
}else{
    window.gameOfLife = exportFunc;
}
