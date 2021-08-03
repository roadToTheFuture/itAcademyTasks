// # Task 1:   outpute to console letters from "A" to "F", one letter per second;

const letters = "ABCDEFG";
const startButton = document.querySelector(".first__task button");

function outputLettersPerSecond(letters) {
	const lettersArray = letters.split('');
	let counter = 0;

	startButton.disabled = true;
	console.log("start");

	const result = setInterval(() => {

		if (lettersArray[counter]) {
			console.log(lettersArray[counter++])
		} else {
			clearInterval(result)
			console.log("end")
			startButton.disabled = false;
		}

	}, 1000);
}

startButton.onclick = () => outputLettersPerSecond(letters);

// =====

// # Task 2: discribe class PoemButton in ES5-style

function PoemButtonES5(buttonCaption, alertText) {
	this.buttonCaption = buttonCaption;
	this.alertText = alertText;
	this.nodeArea = document.querySelector(".second__task");
}

PoemButtonES5.prototype.buttonPressed = function() {
	const text = this.alertText || "no text";
	alert(text);
}

PoemButtonES5.prototype.createButton = function() {
	const buttonCaption = this.buttonCaption || "no name";
	const button = document.createElement("button");

	button.innerText = buttonCaption;
	button.onclick = () => this.buttonPressed();
	this.nodeArea.appendChild(button);
}

PoemButtonES5.prototype.getNewButtonsFromLink = async function(link) {
	const httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = async function () {
		const doneState = 4;
		const successRequestAnswer = 200;
		const isRequestReady = this.readyState === doneState;
		const isStatusSuccess = this.status === successRequestAnswer;

		if(isRequestReady && isStatusSuccess) {
			const promise = new Promise(resolve => resolve(this.responseText)); 
			const jsonString = await promise; 
			const data = JSON.parse(jsonString);

			createButtons(data);
		}
	}

	httpRequest.open("GET", `${link}`);
	httpRequest.send();

	function createButtons(data) {
		data.forEach(item => {
			const button = new PoemButtonES5(`${item.buttonCaption}`, `${item.alertText}`);
			button.createButton();
		});
	}
}

const linkToButtonsJSON = "https://fe.it-academy.by/Examples/test_JSE.json";
const helloButton = new PoemButtonES5("Say Hello", "Hello, IT-Academy!");

helloButton.createButton();
helloButton.getNewButtonsFromLink(linkToButtonsJSON);

// =====

// # Task 3: discribe class PoemButton in ES6-style

class PoemButtonES6 {
	constructor(buttonCaption, alertText) {
		this.buttonCaption = buttonCaption;
		this.alertText = alertText;
		this.nodeArea = document.querySelector(".third__task");
		this.data = null;
	}

	buttonPressed() {
		const text = this.alertText || "no text";
		alert(text);
	}
	
	createButton() {
		const buttonCaption = this.buttonCaption || "no name";
		const button = document.createElement("button");
	
		button.innerText = buttonCaption;
		button.onclick = () => this.buttonPressed();
		this.nodeArea.appendChild(button);
	}

	 static async getNewButtonsFromLink(link) {
		const httpRequest = new XMLHttpRequest();
	
		httpRequest.onreadystatechange = async function () {
			const doneState = 4;
			const successRequestAnswer = 200;
			const isRequestReady = this.readyState === doneState;
			const isStatusSuccess = this.status === successRequestAnswer;
	
			if(isRequestReady && isStatusSuccess) {
				const promise = new Promise(resolve => resolve(this.responseText)); 
				const jsonString = await promise; 
				const data = JSON.parse(jsonString);
	
				createButtons(data);
			}
		}
	
		httpRequest.open("GET", `${link}`);
		httpRequest.send();
	
		function createButtons(data) {
			data.forEach(item => {
				const button = new PoemButtonES6(`${item.buttonCaption}`, `${item.alertText}`);
				button.createButton();
			});
		}
	}
}

const morningButton = new PoemButtonES6("Good Morning", "Good morning, IT-Academy!");

morningButton.createButton();
PoemButtonES6.getNewButtonsFromLink(linkToButtonsJSON);

// =====

// Task 4: output in console valid string constant from json

const outputButton = document.querySelector(".fourth__task button");
const linkToText = "https://fe.it-academy.by/Examples/test_JSE.txt";

outputButton.onclick = () => getJSON(linkToText);


async function getJSON(link) {
	const httpRequest = new XMLHttpRequest();
	
	httpRequest.onreadystatechange = async function () {
		const doneState = 4;
		const successRequestAnswer = 200;
		const isRequestReady = this.readyState === doneState;
		const isStatusSuccess = this.status === successRequestAnswer;

		if(isRequestReady && isStatusSuccess) {
			const promise = new Promise(resolve => resolve(this.responseText)); 
			const jsonString = await promise;

			serchValidText(jsonString);
		}
	}

	httpRequest.open("GET", `${link}`);
	httpRequest.send();
}


function serchValidText(json) {
	
	const regexp = /("|').*?("|')\B/g;
	const string = json;
	
	let matchAll = string.matchAll(regexp);
	matchAll = Array.from(matchAll);

	matchAll.forEach(item => {
		console.log(item[0])
	});
}

// ==== 