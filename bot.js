console.log('test');

var Interpreter = (() => {

	// Read the first character to determine which action to take
	//
	// Possible actions:
	// -detect when to start printing characters ( + )
	// -detect whent to accept user input ( > )
	// -detect when to stop printing characters ( - )
	//
	// Wait until the current action has finished to move onto the next action

	//private default state
	var state = {
		script: ["-- - SIGNAL DISCONNECTED - -"],
		currentLineInumerator: 0,
		currentLineChars: null,
		char: '-',
		terminalId: null,
		cursor: {
			blinkRate: 500,
			targetId: null
		},
		typeSpeed: 33
	}

	//private functions

	var changeState = () => {

		switch (state.char) {
			case '+':
				//start printing the current line
				printLine()
				// nextLine()
			case '>':
				// prompt for user input
				acceptInput()
			case '-':
				// disconnect the terminal
				exit()
		}
	}

	var printLine = () => {
		var time = 0;
		var parent = document.getElementById(state.terminalId)
		console.log(state.terminalId)
		for (let j = 0; j < state.currentLineChars.length; j++){
			// console.log(j)
			time += state.typeSpeed
			setTimeout( () => {
				parent.childNodes[0].data += state.currentLineChars[j]
			}, time)
		}
		setTimeout( () => {
			nextLine()
		}, time)
	}

	var nextLine = () => {
		//go to next line + update state
		state.currentLineInumerator++
		state.currentLineChars = state.script[state.currentLineInumerator].split('')
		state.char = getChar()
		//change to next state
		// changeState()
	}

	var cursor = () => {
		var cursor = document.getElementById(state.cursor.targetId)
			var intervalID = window.setInterval( () => {
				cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible'
		}, state.cursor.blinkrate)
	}

	var getChar = () => {
		var arr = state.script[state.currentLineInumerator].split('')
		return arr[0]
	}

	var acceptInput = () => {}

	var exit = () => {}

	return {
		//public functions

		initializeState: (obj) => {
			//read the first line
			// console.log(obj)
			//determine action
			state.script = obj.script
			state.terminalId = obj.terminalId
			state.cursor = obj.cursor
			state.char = getChar()
			state.currentLineChars = obj.script[0].split('')
			state.typeSpeed = obj.typeSpeed
			console.log(state)
			// state.currentLine = _state[0]
			// state.numIteration = 0
			// state.cursor.blinkrate = 
			// state.target = _state.target
			changeState()
			cursor()
		}

	}
	

})()


Interpreter.initializeState({
	script: [
		"+HELLO?",
		"+IS ANYONE READING THIS?",
		"+IF YOU'RE THERE, TYPE YES . . . .",
		">",
		"+GREAT! THIS IS DR. HIROSHI BENSON. I'M BEING HELD CAPTIVE." +
	    	"I'M BEING	FORCED TO DIVULGE THE SECRETS TO MY ADVANCED SHAVE" +
	    	"TECHNOLOGY! MY GREATEST CREATION, HYDROBOT COULD SAVE ME BUT" +
	    	"HE'S INCOMPLETE. YOU NEED TO ENTER THE SECRET HYRDO LAIR," +
	    	"FINISH HYDROBOT AND SAVE THE DAY. THERE'S AN ENTRANCE TO THE" +
	    	"LAIR THROUGH THIS ROOM. TO OPEN IT YOU MUST PUT THE HEADS IN" +
	    	"THE CORRECT ORDER ON THE TOP SHELF. THE ORDER IS... OH NO!" +
	    	"THEY'RE COMING.",
	    "+ - - SIGNAL DISCONNECTED - -",
	    "-"
	],
	terminalId: 'terminal',
	cursor: {
		targetId: 'cursor',
		blinkRate: 33
	},
	typeSpeed: 33
})
