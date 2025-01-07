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
