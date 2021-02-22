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

	console.log(results);
	next();
	
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
});



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

	numbers_remaining = [...new Set(items)].length;

	let new_number = null;
	while(true){
		new_number = items[Math.floor(Math.random() * items.length)];
		if(numbers_remaining == 1 || new_number != current){
			break;
		}
	}
	current = new_number;
	$("#the_number").html(current);
	console.log(current);

	// $("#buttons").hide();
	timer1 = window.setTimeout(function(){
		sayit(current);
		// window.setTimeout(function(){
		// 	$("#buttons").show();
		// }, 500);
	}, 2000);
}


function sayit(msg_text) {
	var msg = new SpeechSynthesisUtterance();
	msg.text = msg_text;
	window.speechSynthesis.speak(msg);
}

function bad() {
	results[current] = Math.min(2, results[current] + 0.1);
	window.clearTimeout(timer1);
	next();
}

function good() {
	results[current] = Math.max(0, results[current] - 0.5);
	window.clearTimeout(timer1);
	next();
}