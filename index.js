const puzzle1 = [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
                [6, 0, 0, 1, 9, 5, 0, 0, 0], 
                [0, 9, 8, 0, 0, 0, 0, 6, 0], 
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]];


const solution1 =  [[5, 3, 4, 6, 7, 8, 9, 1, 2],
                    [6, 7, 2, 1, 9, 5, 3, 4, 8],
                    [1, 9, 8, 3, 4, 2, 5, 6, 7],
                    [8, 5, 9, 7, 6, 1, 4, 2, 3],
                    [4, 2, 6, 8, 5, 3, 7, 9, 1],
                    [7, 1, 3, 9, 2, 4, 8, 5, 6],
                    [9, 6, 1, 5, 3, 7, 2, 8, 4],
                    [2, 8, 7, 4, 1, 9, 6, 3, 5],
                    [3, 4, 5, 2, 8, 6, 1, 7, 9]];


const getRow = function (sudoku, row) {
    return sudoku[row];
};

const getCol = function (sudoku, col) {
    return sudoku.map(ele => ele[col]);  
};

const getAllCol = function (sudoku) {
    return [getCol(sudoku, 0), getCol(sudoku, 1), getCol(sudoku, 2), getCol(sudoku, 3), getCol(sudoku, 4), getCol(sudoku, 5), getCol(sudoku, 6), getCol(sudoku, 7), getCol(sudoku, 8)];
};

const getBox = function (sudoku, box) {
    const region = box >=0 && box < 3 ? sudoku.slice(0, 3) : box >= 3 && box < 6 ? sudoku.slice(3, 6) : sudoku.slice(6, 9);  
    const box_arr = box % 3 === 0 ? region.map(ele => ele.slice(0, 3)) : box-1 % 3 === 0 ? region.map(ele => ele.slice(3, 6)): region.map(ele => ele.slice(6, 9));
    return [...box_arr[0], ...box_arr[1], ...box_arr[2]]; 
};

const getAllBox = function (sudoku) {
    return [getBox(sudoku, 0), getBox(sudoku, 1), getBox(sudoku, 2), getBox(sudoku, 3), getBox(sudoku, 4), getBox(sudoku, 5), getBox(sudoku, 6), getBox(sudoku, 7), getBox(sudoku, 8)];
};

const firstEmptyPosition = function (sudoku) {
    for (let i = 0; i < sudoku.length; i++){
        if (sudoku[i].includes(0)){
            return [i, sudoku[i].indexOf(0)];
        }
    }
    return [-1, -1];
};

const isSectionValid = function (nums) {
    if (nums.includes(0)) {
        numsFiltered = nums.filter(ele => ele != 0);
        for (let i = 0; i < numsFiltered.length - 1; i++) {
            if (numsFiltered.slice(i + 1, numsFiltered.length).includes(numsFiltered[i])){
                return false;
            }    
        }
        return true;
    }else{
        return nums.reduce(((num1, num2) => num1 + num2), 0) === 45;
    }
};

const isSudokuValid = function (sudoku){
    const rowsValid = sudoku.every(row => isSectionValid(row));
    const columsValid = getAllCol(sudoku).every(col => isSectionValid(col));
    const boxValid = getAllBox(sudoku).every(box => isSectionValid(box));
    return rowsValid && columsValid && boxValid;
};

const isSectionComplete = function (nums) {
    if(nums.includes(0)){
        return false;
    }else{
        return nums.reduce(((num1, num2) => num1 + num2), 0) === 45;
    }
};

const isSudokuComplete = function (sudoku) {
    const rowsComplete = sudoku.every(row => isSectionComplete(row));
    const columsComplete = getAllCol(sudoku).every(col => isSectionComplete(col));
    const boxComplete = getAllBox(sudoku).every(box => isSectionComplete(box));
    return rowsComplete && columsComplete && boxComplete;
};

const repeat = function (sudoku) {
    if(isSudokuComplete(sudoku)){
        return true;
    }
    const [i, j] = firstEmptyPosition(sudoku);
    let digit = 1;
    while (digit < 10) {
        sudoku[i][j] = digit;
        if (isSudokuValid(sudoku)){
            const result = repeat(sudoku);
            if(result){
                return true;
            }
        }
        sudoku[i][j] = 0;
        digit++;
    }
    return false;
};

const solveSudoku = function (sudoku) {
    const sudokuCopied = JSON.parse(JSON.stringify(sudoku)); 
    const result = repeat(sudokuCopied);
    if (result){
        return sudokuCopied;
    }else{
        return null;
    }
};

