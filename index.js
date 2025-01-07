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
