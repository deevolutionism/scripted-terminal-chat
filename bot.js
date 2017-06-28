
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
			targetId: null,
			cursorInterval: null
		},
		userInputValue: '',
		typeSpeed: 33
	}

	//private functions

	var changeState = () => {
		// determine which action to take 
		// based on the first char in the current line

		switch (state.char) {
			case '+':
				//start printing the current line
				printLine()
				// nextLine()
				break;
			case '>':
				// prompt for user input
				promptInput()
				break;
			case '-':
				// disconnect the terminal
				exit()
				break;
		}
	}

	var printLine = () => {
		//append new li element
		//print the chars to the new li element
		let time = 0;
		state.currentLineChars = state.script[state.currentLineInumerator].split('')
		let terminal_window = document.getElementById(state.terminalId)
		let newline = document.createElement('li')
		let p = document.createElement('p')
		newline.appendChild(p)
		terminal_window.appendChild(newline)
		
		console.log(state.currentLineChars)

		for (let j = 0; j < state.currentLineChars.length; j++){
			time += state.typeSpeed
			console.log(state.currentLineChars[j])
			setTimeout( () => {

				if(state.currentLineChars[j] == ' '){ 
					//add a space between each word
					//for some reason, str += ' ' doesnt add a space...
					p.innerText += '\xa0'
				} if (state.currentLineChars[j] == '+'){
					//dont print it out
				} else {
					p.innerText += state.currentLineChars[j]
				}

			}, time)
		}

		setTimeout( () => {
			console.log('next line')
			// newline.childNodes[state.currentLineInumerator].data += '\n'
			nextLine()
		}, time)

	}

	var nextLine = () => {
		//go to next line + update state
		state.currentLineInumerator++
		state.char = getChar()
		console.log('next state')
		//change to next state
		changeState()
	}

	var cursor = (status) => {
		var cursor = document.getElementById(state.cursor.targetId)
		if(status == 'on'){
		 	state.cursorInterval = window.setInterval( () => {
				cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible'
			}, state.cursor.blinkRate)
		} else if (status == 'off') {
			clearInterval(state.cursorInterval)
			cursor.style.visibility = 'hidden'
		}
	}

	var getChar = () => {
		var arr = state.script[state.currentLineInumerator].split('')
		return arr[0]
	}

	var promptInput = () => {

		var input = document.getElementById('input')
		var terminal_window = document.getElementById(state.terminalId)
		var inputline = document.createElement('li')
		var p = document.createElement('p')
		var caret = document.createElement('span')
		caret.innerText = '>>'
		inputline.appendChild(caret)
		inputline.appendChild(p)
		inputline.appendChild(document.getElementById(state.cursor.targetId))
		terminal_window.appendChild(inputline)
		cursor('on')

		input.focus()
		input.onkeydown = (e) => {
			console.log(e)
			state.userInputValue = input.value.toLowerCase().split(' ').join()
			p.innerText = input.value
			if(e.keyCode == 13) {
				//evaluate user input
				//get input value from target
				//did the user say yes?
				//if not, prompt for a new response
				console.log(p.innerText)
				
				determineResponse()
			}
		}
		input.onkeyup = (e) => {
			console.log(inputline.innerText)
			state.userInputValue = input.value.toLowerCase().split(' ').join()
			p.innerText = input.value;
		}
		
	}

	var determineResponse = () => {
		//temporary accept values
		var acceptedResponses = ['ya','yes','yeah','ok']
		console.log('response here!')
		//if correct input, move to next line.
		//otherwise, 
		if (acceptedResponses.indexOf(state.userInputValue) > -1) {
			cursor('off')
			nextLine()
		} else {
			clearInput()
			promptInput()
			console.log('unexpected input')
		}
	}

	var clearInput = () => {
		console.log('clear')
		document.getElementById('input').value = ''
		state.userInputValue = ''
	}

	var exit = () => {

	}

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
			state.currentLineChars = obj.script[0].split(' ')
			state.typeSpeed = obj.typeSpeed
			state.cursor.blinkRate = obj.cursor.blinkRate
		
			changeState()

		},

		getState: () => {
			return state
		}

	}
	

})()


Interpreter.initializeState({
	script: [
		"+HELLO?",
		"+IS ANYONE READING THIS?",
		"+IF YOU'RE THERE, TYPE YES . . . .",
		">",
		"+GREAT! THIS IS DR. HIROSHI BENSON.", 
		"+I'M BEING HELD CAPTIVE.",
	    "+I'M BEING	FORCED TO DIVULGE THE SECRETS TO MY ADVANCED SHAVE TECHNOLOGY!",
	    "+MY GREATEST CREATION, HYDROBOT COULD SAVE ME BUT HE'S INCOMPLETE.",
	    "+YOU NEED TO ENTER THE SECRET HYRDO LAIR,",
	    "+FINISH HYDROBOT AND SAVE THE DAY.", 
	    "+THERE'S AN ENTRANCE TO THE LAIR THROUGH THIS ROOM.",
	    "+TO OPEN IT YOU MUST PUT THE HEADS IN THE CORRECT ORDER ON THE TOP SHELF.",
	    "+THE ORDER IS... OH NO!",
	   	"+THEY'RE COMING.",
	    "+- - SIGNAL DISCONNECTED - -",
	    "-"
	],
	terminalId: 'terminal',
	inputTarget: 'input',
	cursor: {
		targetId: 'cursor',
		blinkRate: 500
	},
	typeSpeed: 33
})
