console.log('test');

// -> HELLO?

// -> IS ANYONE READING THIS?

// -> IF YOU'RE THERE, TYPE YES . . . . 

// -> GREAT! THIS IS DR. HIROSHI BENSON. I'M BEING HELD CAPTIVE.
//    I'M BEING	FORCED TO DIVULGE THE SECRETS TO MY ADVANCED SHAVE
//    TECHNOLOGY! MY GREATEST CREATION, HYDROBOT COULD SAVE ME BUT
//    HE'S INCOMPLETE. YOU NEED TO ENTER THE SECRET HYRDO LAIR,
//    FINISH HYDROBOT AND SAVE THE DAY. THERE'S AN ENTRANCE TO THE
//    LAIR THROUGH THIS ROOM. TO OPEN IT YOU MUST PUT THE HEADS IN
//    THE CORRECT ORDER ON THE TOP SHELF. THE ORDER IS... OH NO!
//    THEY'RE COMING.

// -> - - SIGNAL DISCONNECTED - -


var data = [
	"+HELLO?",
	"+\n",
	"+IS ANYONE READING THIS?",
	"+\n",
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
]



//state machine
// is doing one of the following:
// detect when to start printing characters ( + )
// provide options ( * )
// detect whent to accept user input ( > )
// detect when to stop printing characters ( - )

var Interpreter = (() => {

	var module = {},
	initialState = data[0],
	currentState = 0,
	currentLine = null

	module.blinkrate = 500; 
	// Read the first character to determine which action to take
	//
	// Possible actions:
	// -detect when to start printing characters ( + )
	// -detect whent to accept user input ( > )
	// -detect when to stop printing characters ( - )
	//
	// Wait until the current action has finished to move onto the next action.
	
	var initialState = data[0]

	module.initialize = () => {
		//read the first line
		//determine action

	}

	module.nextLine = () => {
		//change state to next line

	}

	module.cursor = () => {
		//cursor behavior here
		var cursor = document.getElementById('cursor')
		var intervalID = window.setInterval( () => {
			cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible'
		}, module.blinkrate
	}

	module.printline = () => {
		//print the current line out on screen
	}

	module.acceptInput = () => {
		//prompt user for input
	}

	module.exit = () => {
		//terminal the console
	}
	
	

}())


var interpreter = {
	'cursor': (blinkrate) => {
		var _blinkrate = blinkrate || 500
	}
}


var printText = () => {
	var time = 0
	var parent = document.getElementById('terminal')
	for (let i = 0; i < data.length; i++) {
		console.log('---------')
		let strarr = data[i].split('')
		// switch (strarr[0]){
		// 	case 
		// }
		for (let j = 0; j < strarr.length; j++){
			console.log(j)
			time += 33
			setTimeout( () => {
				parent.childNodes[0].data += strarr[j]
			}, time)
		}
	}
}

var cursorBlink = () => {
	var cursor = document.getElementById('cursor')
	var intervalID = window.setInterval( () => {
		cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible'
	},500)
}

printText();
cursorBlink()
