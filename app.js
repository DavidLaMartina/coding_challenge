/*
* i3logix Code Challenge
* 
* Please refer to the README.md for challenge questions and complete your challenge below.
*/

var exports = {};

exports.getNextGen = function(board,
                              minNeighbors = 2,
                              maxNeighbors = 3,
                              reproduceAt = 3,
                              reach = 1){
// Take 2d rectangular binary array; return next generation as 2d binary array
    if (!isBoardValid(board)) return null;
    var numRows = board.length;
    var numCols = board[0].length;
 
    // Pad original board in order to iterate with square kernel
    var paddedBoard = padBoard(board, reach);
    var newBoard = [];
    var neighborTotal;

    // Create new kernel for every row of non-padded board, starting inside pad.
    // Shift kernel for every column, only having to access next column and next
    // point.
    for (let row = reach; row < numRows + reach; row++){
        var newRow = [];
        var kernel = createKernel(paddedBoard, row, reach, reach);
        for (let col = reach; col < numCols + reach; col++){
            neighborTotal = totalKernel(paddedBoard, kernel, row, col);
            if (neighborTotal < minNeighbors || neighborTotal > maxNeighbors)
                newRow.push(0);
            else if (neighborTotal === reproduceAt)
                newRow.push(1);
            else
                newRow.push(paddedBoard[row][col]);
            advanceKernel(paddedBoard, kernel, row, col, reach);
        }
        newBoard.push(newRow);
    }
    return newBoard;
}

function isBoardValid(board){
// Is board rectangular single-nested array with all 0s and 1s?
    if (!Array.isArray(board)) return false;
    if (board.some( function(outEle){
        if (!Array.isArray(outEle) || outEle.length !== board[0].length)
            return true;
        if (outEle.some( inEle => inEle !== 0 && inEle !== 1 ? true : false))
            return true;
    }))
        return false;
    return true;
}

function padBoard(board, pad){
// Adds zeroes in perimeter of thickness=pad
    var numRows = board.length;
    var numCols = board[0].length;
    var paddedBoard = [];

    for (let i =0; i < numRows + pad * 2; i++){
        var row = new Array(numCols + pad * 2);
        for (let j = 0; j < numCols + pad * 2; j++)
            row[j] = 0;
        paddedBoard.push(row);
    }
    for (let i = 0; i < numRows; i++)
        for (let j = 0; j < numCols; j++)
            paddedBoard[i + pad][j + pad] = board[i][j];

    return paddedBoard; 
}

function createKernel(board, centerRow, centerCol, reach){
// Creates square structuring element (kernel) with side length=reach * 2 - 1
// starting from given (row, col) space of board. Returns array
// representing numbers of 1s within each column of kernel (not counting middle)
    var kernel = [];
    var onesCount;
    for (let col = centerCol - reach; col <= centerCol + reach; col++){
        onesCount = 0;
        for (let row = centerRow - reach; row <= centerRow + reach; row++)
            if (board[row][col] === 1) onesCount++;
        kernel.push(onesCount);
    }
    return kernel
}

function advanceKernel(board, kernel, centerRow, centerCol, reach){
// Shift kernel 1 column right, dropping left-most column
    kernel.shift();
    var onesCount = 0;
//    var newCenterRow = centerRow + 1;
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
    if (board[centerRow][centerCol] === 1) total --;
    return total;
}

function displayBoard(board){
// Tab-separated board for convenient output / pasting / piping
    for (const rowIdx of board.keys()){
        for (const colIdx of board[rowIdx].keys()){
            if (colIdx < board[rowIdx].length - 1)
                process.stdout.write(board[rowIdx][colIdx] + '\t');
            else
                process.stdout.write(board[rowIdx][colIdx] + '\n');
        }
    }
    process.stdout.write('\n');
}

module.exports = exports;
