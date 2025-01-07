const GRID_SIZE = 12;
 
function generatePuzzle() {
   const tbody = document.getElementById('tbody');
   tbody.innerHTML = '';
   
   // Create empty 12x12 grid
   let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(''));
   // Place words in the grid
   placeWords(grid);
 
//for loop

 
document.addEventListener('mouseup', endSelection);
   
   // Adjust grid size after creation
   adjustGridSize();
}
 
}
 
window.addEventListener('resize', adjustGridSize);
 
function adjustGridSize() {
   const playSection = document.querySelector('.play-sec');
   const gridWidth = playSection.offsetWidth - 60; // Account for padding
   const cellSize = Math.floor(gridWidth / GRID_SIZE); // Calculate cell size based on available width
   
   // Update cell sizes
   document.querySelectorAll('td').forEach(cell => {
       cell.style.width = `${cellSize}px`;
       cell.style.height = `${cellSize}px`;
       cell.style.fontSize = `${Math.max(cellSize * 0.4, 14)}px`; // Responsive font size
   });
}
function placeWords(grid) {
   wordLocations.clear();
   
   for (let word of currentWords) {
       let placed = false;
       let attempts = 0;
       const maxAttempts = 100;
 
       while (!placed && attempts < maxAttempts) {
           const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
           const row = Math.floor(Math.random() * (GRID_SIZE - (direction === 'vertical' ? word.length : 0)));
           const col = Math.floor(Math.random() * (GRID_SIZE - (direction === 'horizontal' ? word.length : 0)));
 
           if (canPlaceWord(grid, word, row, col, direction)) {
               placeWordInGrid(grid, word, row, col, direction);
               wordLocations.set(word, { row, col, direction });
               placed = true;
           }
           attempts++;
       }
   }
}
function canPlaceWord(grid, word, row, col, direction) {
   for (let i = 0; i < word.length; i++) {
       const currentRow = direction === 'vertical' ? row + i : row;
       const currentCol = direction === 'horizontal' ? col + i : col;
       
       if (grid[currentRow][currentCol] && grid[currentRow][currentCol] !== word[i]) {
           return false;
       }
   }
   return true;
}
 
function placeWordInGrid(grid, word, row, col, direction) {
   for (let i = 0; i < word.length; i++) {
       if (direction === 'horizontal') {
           grid[row][col + i] = word[i];
       } else {
           grid[row + i][col] = word[i];
       }
   }
}

function getRandomLetter() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}
