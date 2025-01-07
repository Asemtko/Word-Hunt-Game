const GRID_SIZE = 12;
const fruits = ["APPLE", "BANANA", "ORANGE", "MANGO", "GRAPE", "PEAR", "PEACH", "PLUM", "KIWI", "LEMON", "CHERRY", "PAPAYA", "MELON", "BERRY", "FIG"];
const clothes = ["SHIRT", "PANTS", "DRESS", "SKIRT", "JACKET", "SOCKS", "SHOES", "SCARF", "HAT", "COAT", "JEANS", "SWEATER", "HOODIE", "GLOVES", "BELT"];
const countries = ["FRANCE", "SPAIN", "ITALY", "JAPAN", "BRAZIL", "CANADA", "INDIA", "CHINA", "EGYPT", "MEXICO", "RUSSIA", "GREECE", "KOREA", "PERU", "CHILE"];
const cities = ["PARIS", "LONDON", "TOKYO", "ROME", "BERLIN", "MADRID", "DUBAI", "SEOUL", "MOSCOW", "SYDNEY", "VENICE", "ATHENS", "CAIRO", "MIAMI", "DELHI"];
const animals = ["LION", "TIGER", "ELEPHANT", "GIRAFFE", "ZEBRA", "MONKEY", "BEAR", "WOLF", "DEER", "FOX", "PANDA", "KOALA", "EAGLE", "SNAKE", "WHALE"];
const cars = ["TOYOTA", "HONDA", "FORD", "BMW", "AUDI", "TESLA", "VOLVO", "MAZDA", "LEXUS", "JEEP", "PORSCHE", "FERRARI", "BENZ", "KIA", "DODGE"];
const sports = ["SOCCER", "TENNIS", "GOLF", "RUGBY", "BOXING", "HOCKEY", "SKIING", "CYCLING", "RUNNING", "SWIMMING", "KARATE", "JUDO", "POLO", "SURF", "YOGA"];
const food = ["PIZZA", "PASTA", "SUSHI", "BURGER", "SALAD", "BREAD", "STEAK", "SOUP", "CURRY", "TACO", "RICE", "FISH", "CHIPS", "CAKE", "PIE"];
const jobs = ["DOCTOR", "TEACHER", "LAWYER", "CHEF", "ARTIST", "PILOT", "NURSE", "WRITER", "ACTOR", "POLICE", "JUDGE", "BANKER", "DRIVER", "BAKER", "HOST"];
const colors = ["BLACK", "WHITE", "PURPLE", "ORANGE", "YELLOW", "GREEN", "BROWN", "SILVER", "GOLDEN", "PINK", "BLUE", "RED", "GREY", "BEIGE", "NAVY"];
const mixed = ["APPLE", "SHIRT", "PARIS", "LION", "TOYOTA", "SPAIN", "PIZZA", "DOCTOR", "BLACK", "SOCCER", "BEAR", "DRESS", "ROME", "GRAPE", "SURF"];


let currentWords = [];
let selectedCells = [];
let foundWords = new Set();
let wordLocations = new Map(); // Stores word positions for solution display
let startTime;
let timerInterval;
let isTimerRunning = false;
let fastestTime = localStorage.getItem('fastestTime') ? parseInt(localStorage.getItem('fastestTime')) : null;
let currentCategory = '';

// Category selection functions
function fruitf() {
    currentWords = fruits;
    currentCategory = 'Fruits';
    displayWords();
    updateFastestTimeDisplay();
}

function clothf() {
    currentWords = clothes;
    currentCategory = 'Clothes';
    displayWords();
    updateFastestTimeDisplay();
}

function countryf() {
    currentWords = countries;
    currentCategory = 'Countries';
    displayWords();
    updateFastestTimeDisplay();
}

function cityf() {
    currentWords = cities;
    currentCategory = 'Cities';
    displayWords();
    updateFastestTimeDisplay();
}

function animalf() {
    currentWords = animals;
    currentCategory = 'Animals';
    displayWords();
    updateFastestTimeDisplay();
}

function carf() {
    currentWords = cars;
    currentCategory = 'Cars';
    displayWords();
    updateFastestTimeDisplay();
}

function mixedf() {
    currentWords = mixed;
    currentCategory = 'Mixed';
    displayWords();
    updateFastestTimeDisplay();
}
// Add these new category functions
function sportsf() {
    currentWords = sports;
    currentCategory = 'Sports';
    displayWords();
    updateFastestTimeDisplay();
}

function foodf() {
    currentWords = food;
    currentCategory = 'Food';
    displayWords();
    updateFastestTimeDisplay();
}

function jobsf() {
    currentWords = jobs;
    currentCategory = 'Jobs';
    displayWords();
    updateFastestTimeDisplay();
}

function colorsf() {
    currentWords = colors;
    currentCategory = 'Colors';
    displayWords();
    updateFastestTimeDisplay();
}

 
function generatePuzzle() {
   const tbody = document.getElementById('tbody');
   tbody.innerHTML = '';
   
   // Create empty 12x12 grid
   let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(''));
   // Place words in the grid
   placeWords(grid);
 
//for loop
  for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement('td');
            cell.textContent = grid[i][j] || getRandomLetter();
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('mousedown', startSelection);
            cell.addEventListener('mouseover', updateSelection);
            cell.addEventListener('mouseup', endSelection);
            tbody.appendChild(cell);
        }
 
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

function submit() {
    const textarea = document.getElementById('textarea');
    const words = textarea.value.toUpperCase().trim().split(/\s+/);
    
    }

 const validWords = words.filter(word => word.length >= 3 && word.length <= 16);
    if (validWords.length > 0) {
        currentWords = validWords;
   
    } else {
        alert('Please enter valid words (3-16 letters)');
    }

// Display words in the word list
function displayWords() {
    const wordList = document.getElementById('words');
    wordList.innerHTML = currentWords.map(word => `<span class="word">${word}</span>`).join(' ');
}
// Word selection functionality
function startSelection(e) {
    selectedCells = [e.target];
    e.target.classList.add('selecting');
}

function updateSelection(e) {
    if (selectedCells.length === 0) return;
    
    const firstCell = selectedCells[0];
    const currentCell = e.target;
    
    // Check if selection is valid (same row or column)
    if (firstCell.dataset.row === currentCell.dataset.row || 
        firstCell.dataset.col === currentCell.dataset.col) {
        // Keep the first cell and update the end cell
        selectedCells = [firstCell];
        highlightCellsBetween(firstCell, currentCell);
    }
}

function endSelection() {
    const word = getSelectedWord();
    if (currentWords.includes(word)) {
        if (!foundWords.has(word)) {
            foundWords.add(word);
            markWordAsFound(word);
            highlightFoundWord();
            
            // Check if puzzle is completed
            if (foundWords.size === currentWords.length) {
                puzzleCompleted();
            }
        }
    }
    clearSelection();
}
function clearSelection() {
    document.querySelectorAll('td.selecting').forEach(cell => {
        cell.classList.remove('selecting');
    });
    selectedCells = [];
}

function highlightCellsBetween(cell1, cell2) {
    clearSelection();
    const cells = getAllCellsBetween(cell1, cell2);
    cells.forEach(cell => cell.classList.add('selecting'));
    // Add the cells to selectedCells array
    selectedCells = cells;
}

function getAllCellsBetween(cell1, cell2) {
    const row1 = parseInt(cell1.dataset.row);
    const col1 = parseInt(cell1.dataset.col);
    const row2 = parseInt(cell2.dataset.row);
    const col2 = parseInt(cell2.dataset.col);
    
    const cells = [];
    if (row1 === row2) {
        // Horizontal selection
        const start = Math.min(col1, col2);
        const end = Math.max(col1, col2);
        for (let col = start; col <= end; col++) {
            cells.push(document.querySelector(`td[data-row="${row1}"][data-col="${col}"]`));
        }
    } else if (col1 === col2) {
        // Vertical selection
        const start = Math.min(row1, row2);
        const end = Math.max(row1, row2);
        for (let row = start; row <= end; row++) {
            cells.push(document.querySelector(`td[data-row="${row}"][data-col="${col1}"]`));
        }
    }
    return cells;
}
function getSelectedWord() {
    if (selectedCells.length < 2) return '';
    
    return selectedCells.map(cell => cell.textContent).join('');
}
function highlightCellsBetween(cell1, cell2) {
    clearSelection();
    const cells = getAllCellsBetween(cell1, cell2);
    cells.forEach(cell => cell.classList.add('selecting'));
    // Add the cells to selectedCells array
    selectedCells = cells;
}
function markWordAsFound(word) {
    document.querySelectorAll('.word').forEach(span => {
        if (span.textContent === word) {
            span.classList.add('found');
        }
    });
}
function highlightFoundWord() {
    selectedCells.forEach(cell => cell.classList.add('found'));
}

function solution() {
    clearSelection();
    isTimerRunning = false;
    clearInterval(timerInterval);
    
    wordLocations.forEach((location, word) => {
        if (!foundWords.has(word)) {
            const { row, col, direction } = location;
            const startCell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
            const endRow = direction === 'vertical' ? row + word.length - 1 : row;
            const endCol = direction === 'horizontal' ? col + word.length - 1 : col;
            const endCell = document.querySelector(`td[data-row="${endRow}"][data-col="${endCol}"]`);
            
            const cells = getAllCellsBetween(startCell, endCell);
            cells.forEach(cell => cell.classList.add('found'));
        }
    });
}
function start() {
    if (currentWords.length === 0) {
        alert('Please select a category or create your own puzzle first!');
        return;
    }
    
    // Reset timer
    startTime = Date.now();
    isTimerRunning = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerDisplay, 1000);
    foundWords.clear();
    
    generatePuzzle();
}

function updateTimerDisplay() {
    if (!startTime || !isTimerRunning) return;
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    document.getElementById('timer').textContent = formatTime(elapsedTime);
}

// Add this function to format time
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
function puzzleCompleted() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    // Check if this is the fastest time for the category
    const categoryFastestTime = localStorage.getItem(`fastest_${currentCategory}`);
    if (!categoryFastestTime || totalTime < parseInt(categoryFastestTime)) {
        localStorage.setItem(`fastest_${currentCategory}`, totalTime.toString());
        updateFastestTimeDisplay();
        
        // Show special message for new record
        setTimeout(() => {
            alert(`🎉 NEW RECORD! 🎉\nYou completed the ${currentCategory} puzzle in ${formatTime(totalTime)}!`);
        }, 300);
    } else {
        // Show regular completion message
        setTimeout(() => {
            alert(`Congratulations! You completed the puzzle in ${formatTime(totalTime)}!\nBest time: ${formatTime(parseInt(categoryFastestTime))}`);
        }, 300);
    }
}
function updateFastestTimeDisplay() {
    const fastestTimeElement = document.getElementById('fastest-time');
    const categoryFastestTime = localStorage.getItem(`fastest_${currentCategory}`);
    
    if (categoryFastestTime) {
        fastestTimeElement.textContent = formatTime(parseInt(categoryFastestTime));
    } else {
        fastestTimeElement.textContent = '--:--';
    }
}

function restart() {
    foundWords.clear();
    wordLocations.clear();
    document.querySelectorAll('.word').forEach(span => span.classList.remove('found'));
    document.querySelectorAll('td.found').forEach(cell => cell.classList.remove('found'));
    
    // Reset timer
    startTime = Date.now();
    isTimerRunning = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerDisplay, 1000);
    
    if (currentWords.length > 0) {
        generatePuzzle();
    }
}
