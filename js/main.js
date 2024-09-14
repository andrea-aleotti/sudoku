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

// Shuffle function to randomize the order of numbers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

function displayNumbers(cells, difficulty) {
    // Set number of cells to display based on difficulty
    let numbersToDisplay;

    if (difficulty === 'f') {
        numbersToDisplay = 40;
    } else if (difficulty === 'm') {
        numbersToDisplay = 30;
    } else if (difficulty === 'd') {
        numbersToDisplay = 20;
    }

    // Create an array of cell indices
    let cellIndices = [...Array(cells.length).keys()];

    // Shuffle the cellIndices array to get random indices
    cellIndices = shuffleArray(cellIndices);

    // Display the appropriate number of cells
    for (let i = 0; i < numbersToDisplay; i++) {
        const randomIndex = cellIndices[i];
        const cell = cells[randomIndex];

        // Display the number in the cell from the data-value attribute
        cell.innerText = cell.getAttribute('data-value');
    }
}

// Shuffle function to randomize cell indices (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example: Call displayNumbers() with the chosen difficulty
// displayNumbers('medium'); // Or 'easy', 'hard' based on player choice
