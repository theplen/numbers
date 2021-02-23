var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var numbers = [];
for(var i=0;i<=20;i++){
	numbers.push(String(i));
}
// var grammar = '#JSGF V1.0; grammar numbers; public <number> = ' + numbers.join(' | ') + ' ;'
var grammar = '#JSGF V1.0; grammar numbers; public <number> = dog | cat ;'

console.log(grammar);

var diagnostic = document.querySelector('.output');
var finalTranscript = '';
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
	var number = event.results[0][0].transcript;
	finalTranscript = number;
	diagnostic.textContent = 'Result received: ' + number + '.';	
	console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
	recognition.stop();
}

recognition.onnomatch = function(event) {
	diagnostic.textContent = "I didn't recognise that number.";
}

recognition.onerror = function(event) {
	diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}