var min_number = 0;
var max_number = 20;
var current = null;
var results = {};
var random_multipler = 3;
var timer1 = null;


$(document).ready(function () {
	for (var i = min_number; i <= max_number; i++) {
		results[i] = 1;
	}
	
	$("#start").on("click", function () {
		$("#header").hide();
		$("#game").show();
	});
	$("#good").on("click", function () {
		good();
	});
	$("#bad").on("click", function () {
		bad();
	});
	
	console.log(results);
	next();
});

recognition.onend = (event) => {
	if(finalTranscript.trim() == String(current)){
		sayit("correct");
		good();
	}else{
		sayit(current);
		bad();
	}
	finalTranscript = "";
}

function next() {
	let items = [];
	for (var i = min_number; i <= max_number; i++) {
		for (var ii = 0; ii < Math.ceil(results[i] * random_multipler); ii++) {
			items.push(i);
		}
	}

	console.log(items);
	if(items.length == 0){
		$("#game").html("<h1 style='text-align:center; margin-top: 50px;'>YOU WIN!!!</h1>")
		sayit("You win");
		return;
	}


	// Get new number but different then last number
	let new_number = null;
	numbers_remaining = [...new Set(items)].length;
	while(true){
		new_number = items[Math.floor(Math.random() * items.length)];
		if(numbers_remaining == 1 || new_number != current){
			break;
		}
	}

	current = new_number;
	console.log(current);
	$("#the_number").fadeTo("fast", 0, function(){
		console.log("done fading out");
		$("#the_number").html(current);
		$("#the_number").fadeTo("fast", 1, function(){
			console.log("done fading back in");
			recognition.start();
			timer1 = window.setTimeout(function(){
				recognition.stop();
			}, 6000);
		});
	});
}


function sayit(msg_text) {
	var msg = new SpeechSynthesisUtterance();
	msg.text = msg_text;
	window.speechSynthesis.speak(msg);
}

function bad() {
	results[current] = Math.min(2, results[current] + 1);
	window.clearTimeout(timer1);
	window.setTimeout(function(){
		next();
	}, 500);
}

function good() {
	results[current] = Math.max(0, results[current] - 1);
	window.clearTimeout(timer1);
	next();
}