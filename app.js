// Import Pixi.js
import * as PIXI from 'pixi.js';

// Create a Pixi.js application
const app = new PIXI.Application({
  width: 800, // Set the width of your game canvas
  height: 600, // Set the height of your game canvas
  backgroundColor: 0x1099bb, // Set the background color
  antialias: true, // Enable antialiasing
});

// Append the Pixi.js canvas to the DOM
document.body.appendChild(app.view);

// Define the slot machine symbols
const symbols = ['symbol1.png', 'symbol2.png', 'symbol3.png', 'symbol4.png', 'symbol5.png'];

// Create an array to hold the symbols on the reels
const reels = [];

// Create a container for the reels
const reelsContainer = new PIXI.Container();
reelsContainer.x = 100; // Adjust the position as needed
reelsContainer.y = 100;

// Add the reels container to the stage
app.stage.addChild(reelsContainer);

// Define the number of reels and symbols per reel
const numReels = 5;
const symbolsPerReel = 3;

// Create the reels and populate them with symbols
for (let i = 0; i < numReels; i++) {
  const reel = [];
  for (let j = 0; j < symbolsPerReel; j++) {
    const symbol = PIXI.Sprite.from(symbols[Math.floor(Math.random() * symbols.length)]);
    symbol.y = j * symbol.height;
    reel.push(symbol);
    reelsContainer.addChild(symbol);
  }
  reels.push(reel);
}

// Function to spin the reels
function spinReels() {
  for (let i = 0; i < numReels; i++) {
    const reel = reels[i];
    for (let j = 0; j < symbolsPerReel; j++) {
      const symbol = reel[j];
      symbol.texture = PIXI.Texture.from(symbols[Math.floor(Math.random() * symbols.length)]);
    }
  }
}

// Create a spin button
const spinButton = new PIXI.Graphics();
spinButton.beginFill(0xff0000);
spinButton.drawRect(0, 0, 100, 50);
spinButton.endFill();
spinButton.interactive = true;
spinButton.buttonMode = true;
spinButton.x = 350;
spinButton.y = 500;
spinButton.on('pointerdown', spinReels);

// Add the spin button to the stage
app.stage.addChild(spinButton);

// Start the Pixi.js ticker
app.ticker.start();
