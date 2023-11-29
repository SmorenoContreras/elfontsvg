// Import necessary modules
import fs from 'fs';
import inquirer from 'inquirer';
import svg2png from 'svg2png';

// Function to generate SVG based on user input
async function generateLogo() {
  try {
    // Prompt user for input
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
        validate: (input) => input.length <= 3,
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hex):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hex):',
      },
    ]);

    // Construct SVG string based on user input
    const svgString = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${userInput.shapeColor}" />
        <text x="50%" y="50%" font-size="40" fill="${userInput.textColor}" text-anchor="middle" dominant-baseline="middle">${userInput.text}</text>
      </svg>
    `;

    // Save SVG to file
    fs.writeFileSync('logo.svg', svgString, 'utf-8');
    
    console.log('Generated logo.svg');

    // Convert SVG to PNG for preview (optional)
    const pngBuffer = svg2png.sync(svgString);
    fs.writeFileSync('logo.png', pngBuffer);

    console.log('Generated logo.png for preview');
  } catch (error) {
    console.error('Error generating logo:', error);
  }
}

// Call the function to generate the logo
generateLogo();