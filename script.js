'use strict';

const colorPicker = document.querySelector('#colorPicker');
const grid = document.querySelector('.grid');
const range = document.querySelector('#range');
const rangeLabel = document.querySelector('.label');
const colorModeButton = document.querySelector('.colorMode');
const rainbowModeButton = document.querySelector('.rainbowMode');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
let currentMode = 'color';
let eraseOn = false;

updateGrid(); //Updates grid based on base value (16)

eraserButton.addEventListener('click', erase);
rainbowModeButton.addEventListener('click', rainbowMode);
colorModeButton.addEventListener('click', colorMode);

clearButton.addEventListener('click', () => {
	const children = document.querySelectorAll('.child');
	children.forEach((child) => {
		child.style.backgroundColor = '#fff';
	});
});

//changes grid on slider change
range.addEventListener('change', (e) => {
	rangeLabel.textContent = `${range.value} x ${range.value}`;
	updateGrid();
});

function updateGrid() {
	grid.replaceChildren();
	for (let i = 1; i <= range.value ** 2; i++) {
		const div = document.createElement('div');
		div.classList.toggle('child');
		div.style.width = `${500 / range.value}px`;
		div.style.height = `${500 / range.value}px`;
		grid.appendChild(div);
		grid.addEventListener('mouseover', myHover);
	}

	function myHover(e) {
		if (currentMode === 'color') {
			e.target.style.backgroundColor = colorPicker.value;
		} else if (currentMode === 'rainbow') {
			e.target.style.backgroundColor = randomColor();
		} else if (currentMode === 'erase') {
			e.target.style.backgroundColor = '#fff';
		}
	}
}

function randomColor() {
	let color = '';
	for (let i = 1; i <= 3; i++) {
		let num = Math.floor(Math.random() * 255) + 1;
		color += num.toString(16);
	}
	return `#${color}`;
}

function colorMode() {
	if (currentMode === 'color') return;
	currentMode = 'color';
	colorModeButton.style.backgroundColor = '#363538';
	colorModeButton.style.color = '#ddd4d4';
	rainbowModeButton.style.color = '#363538';
	rainbowModeButton.style.backgroundColor = '#ddd4d4';
	eraserButton.style.color = '#363538';
	eraserButton.style.backgroundColor = '#ddd4d4';
}

function rainbowMode() {
	if (currentMode === 'rainbow') return;
	currentMode = 'rainbow';
	colorModeButton.style.color = '#363538';
	colorModeButton.style.backgroundColor = '#ddd4d4';
	rainbowModeButton.style.backgroundColor = '#363538';
	rainbowModeButton.style.color = '#ddd4d4';
	eraserButton.style.color = '#363538';
	eraserButton.style.backgroundColor = '#ddd4d4';
}

function erase(e) {
	if (currentMode === 'erase') return;
	currentMode = 'erase';
	eraserButton.style.color = '#ddd4d4';
	eraserButton.style.backgroundColor = '#363538';
	colorModeButton.style.color = '#363538';
	colorModeButton.style.backgroundColor = '#ddd4d4';
	rainbowModeButton.style.color = '#363538';
	rainbowModeButton.style.backgroundColor = '#ddd4d4';
}
