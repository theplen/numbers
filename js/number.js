var minNumber = 0;
var maxNumber = 20;
var current = null;
var results = {};
var randomMultipler = 3;
var timer1 = null;
var timeout = 6;


$(document).ready(function () {
	$("#header").hide();

	minNumber = parseInt(getParam('start'));
	maxNumber = parseInt(getParam('end'));
	timeout = parseFloat(getParam('timeout'));

	// Init results
	let skip = [];
	for (var i = minNumber; i <= maxNumber; i++) {
		if (!skip.includes(i)) {
			results[i] = 1;
		}
	}	

	// Button click functions
	$("#home").on('click', function(){
		window.location = "./?start=" + minNumber + "&end=" + maxNumber + "&timeout=" + timeout;
	})
	$("#start").on('click', function(){
		$(".start").hide();
		$("#game").show();
		$("#header").show();
		next();
	});
});

recognition.onend = (event) => {
	isValid = false;
	recognition.finalTranscript.forEach(function (t) {
		if (t.trim() == String(current)) {
			isValid = true;
		}
	});
	if (isValid) {
		sayit("correct");
		good();
	} else {
		sayit(current);
		bad();
	}
}

function next() {
	let items = [];
	Object.keys(results).forEach(function (i) {
		for (var ii = 0; ii < Math.ceil(results[i] * randomMultipler); ii++) {
			items.push(i);
		}
	});

	console.log(items);
	if (items.length == 0) {
		$(".output").hide();
		$("#game").html("<h1 style='text-align:center; margin-top: 50px;'>YOU WIN!!!</h1>")
		sayit("You win");
		return;
	}


	// Get new number but different then last number
	let newNumber = null;
	numbersRemaining = [...new Set(items)].length;
	while (true) {
		newNumber = items[Math.floor(Math.random() * items.length)];
		if (numbersRemaining == 1 || newNumber != current) {
			break;
		}
	}

	current = newNumber;
	console.log(current);
	$("#the_number").fadeTo("fast", 0, function () {
		console.log("done fading out");
		$("#the_number").html(current);
		$("#the_number").fadeTo("fast", 1, function () {
			console.log("done fading back in");
			recognition.start();
			timer1 = window.setTimeout(function () {
				recognition.stop();
			}, timeout * 1000);
		});
	});
}


function sayit(msgText) {
	var msg = new SpeechSynthesisUtterance();
	msg.text = msgText;
	window.speechSynthesis.speak(msg);
}

function bad() {
	results[current] = Math.min(2, results[current] + 1);
	window.clearTimeout(timer1);
	window.setTimeout(function () {
		next();
	}, 500);
}

function good() {
	results[current] = Math.max(0, results[current] - 1);
	window.clearTimeout(timer1);
	next();
}