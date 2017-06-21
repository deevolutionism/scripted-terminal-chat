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
	"HELLO?",
	"\n",
	"IS ANYONE READING THIS?",
	"\n",
	"IF YOU'RE THERE, TYPE YES . . . .",
	"+"
]

// terminal prints out text character-by-character
// detect when to accept user input


var printText = () => {
	var time = 0
	var parent = document.getElementById('terminal')
	for (let i = 0; i < data.length; i++) {
		console.log('---------')
		let strarr = data[i].split('')
		for (let j = 0; j < strarr.length; j++){
			console.log(j)
			time += 100
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
