// Function to check if a number is valid in the current cell
function isValid(board, row, col, num) {
    // Check if the number exists in the current row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }

    // Check if the number exists in the current column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
            return false;
        }
    }

    // Check if the number exists in the current 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Function to generate a full Sudoku solution using backtracking with randomness
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // Find an empty cell (denoted by 0)
            if (board[row][col] === 0) {
                // Create an array with numbers 1-9 and shuffle them
                const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                // Try shuffled numbers
                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        // Place the number in the cell
                        board[row][col] = num;

                        // Recursively attempt to fill the rest of the board
                        if (solveSudoku(board)) {
                            return true;
                        }

                        // If the number leads to a conflict, reset the cell and backtrack
                        board[row][col] = 0;
                    }
                }
                return false; // Trigger backtracking
            }
        }
    }
    return true; // The board is fully solved
}

// Function to check if a puzzle has a unique solution
function hasUniqueSolution(board) {
    let solutions = 0;

    function countSolutions(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            countSolutions(board);
                            board[row][col] = 0;
                        }
                    }
                    return; // Backtrack when encountering empty cell
                }
            }
        }
        solutions++;
    }

    countSolutions(board);
    return solutions === 1; // True if only one solution exists
}

// Create an empty 9x9 grid
function generateEmptyGrid() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(Array(9).fill(0));
    }
    return board;
}

// Generate a complete Sudoku solution
function generateSudokuSolution() {
    const board = generateEmptyGrid();

    // Solve the Sudoku board
    solveSudoku(board);

    return board; // Return the filled grid
}

// Function to generate a puzzle with a unique solution
function displayNumbers(cells, difficulty) {
    let puzzle = generateSudokuSolution(); // Generate a solved board
    let numbersToRemove;

    if (difficulty === 'f') {
        numbersToRemove = 40;
    } else if (difficulty === 'm') {
        numbersToRemove = 50;
    } else if (difficulty === 'd') {
        numbersToRemove = 60;
    }

    // Create an array of all cell positions
    let cellIndices = [...Array(81).keys()];
    cellIndices = shuffleArray(cellIndices); // Shuffle the array

    for (let i = 0; i < numbersToRemove; i++) {
        const cellIndex = cellIndices[i];
        const row = Math.floor(cellIndex / 9);
        const col = cellIndex % 9;

        const temp = puzzle[row][col]; // Temporarily remove the number
        puzzle[row][col] = 0;

        // Check if the puzzle is still solvable with a unique solution
        if (!hasUniqueSolution(puzzle)) {
            puzzle[row][col] = temp; // Revert if it leads to multiple solutions
        }
    }

    // Now display the puzzle in the grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellIndex = row * 9 + col;
            const cell = cells[cellIndex];

            if (puzzle[row][col] !== 0) {
                cell.innerText = puzzle[row][col];
                cell.setAttribute('data-value', puzzle[row][col]); // Store the value as attribute
            } else {
                cell.innerText = ''; // Hide empty cells
                cell.setAttribute('data-value', ''); // Clear data-value attribute
            }
        }
    }
}

// Shuffle function to randomize array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
