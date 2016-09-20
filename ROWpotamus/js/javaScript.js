var saveVal = 0;
var angerArray = [];
var disgustArray = [];
var fearArray = [];
var joyArray = [];
var sadnessArray = [];
var angerRev = 0;
var disgustRev = 0;
var fearRev = 0;
var joyRev = 0;
var sadnessRev = 0;
var theAverages = [];
var sentences= [];

var setCharAt = function(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
    console.log("hit");
}

var enterData = function() {

	var input = $("#comment").val();
	input = input.replace(/(\r\n|\n|\r)/gm," ");
	for(var i = 0; i<input.length; i++){
		var temp = input.substring(i, i+2);
		if (temp == ". " ||temp == "! " ||temp == "? " ){
			input = setCharAt(input, i+1, '%');
			
		}
		else if(temp == '."' ||temp == '!"' ||temp == '?"'){
			input = setCharAt(input, i+2, '%');
		}
	}

	
	
	sentences = input.split("%");

	for(var i = 0; i < sentences.length; i++){
		comeback = false;
		var theURL = "http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?";
		var apiKey = "577ed37d1c0f4d37e5e0ac9fe23871e6868d98ce";
		theURL = theURL+"apikey="+apiKey;
		enterText = sentences[i];
		//console.log(enterText);
		theURL = theURL+"&text="+encodeURIComponent(enterText);
		theURL = theURL+"&outputMode=json";
	
		$.ajax({
			url: theURL,
			type: 'POST',
			async: false,

			success: function(data){
				saveVal = data.docEmotions["anger"];
				angerArray.push(saveVal);
				saveVal = data.docEmotions["disgust"];
				disgustArray.push(saveVal);
				saveVal = data.docEmotions["fear"];
				fearArray.push(saveVal);
				saveVal = data.docEmotions["joy"];
				joyArray.push(saveVal);
				saveVal = data.docEmotions["sadness"];
				sadnessArray.push(saveVal);
			}
		});

	}
	angerRev = averages(angerArray);
	theAverages.push(angerRev);
	disgustRev = averages(disgustArray);
	theAverages.push(disgustRev);
	fearRev = averages(fearArray);
	theAverages.push(fearRev);
	joyRev = averages(joyArray);
	theAverages.push(joyRev);
	sadnessRev = averages(sadnessArray);
	theAverages.push(sadnessRev);
	topEmotion();
	
}

var averages = function(someValues){
	var total = 0;
	for (var i = 0; i < someValues.length; i++){
		var temp = parseFloat(someValues[i]);
		total = total + temp;
	}

	total = total/someValues.length;
	return total;
}

var getValues = function(main, num){
	var values = [];
	var save = 0;
	for (var k = 0; k < num; k++){
		var max = main[0];
		save = 0;
		for (var i = 1; i < main.length; i++){
			if (main[i] > max) {
				max = main[i];
				save = i;
			}
			
		}	
		values.push(save);
		main[save] = 0;
		return values;
	}
} 

var topEmotion = function(){
	var values = getValues(theAverages, 2);
	
	if (values[0] == 0){
		document.getElementById("outputSpace").innerHTML = "0";
		printTheTopEmotion(angerArray, angerRev);
	}
	else if (values[0] == 1){
		document.getElementById("outputSpace").innerHTML = "1";
		printTheTopEmotion(disgustArray, disgustRev);
	}
	else if (values[0] == 2){
		document.getElementById("outputSpace").innerHTML = "2";
		printTheTopEmotion(fearArray, fearRev);
	}
	else if (values[0] == 3){
		document.getElementById("outputSpace").innerHTML = "3";
		printTheTopEmotion(joyArray, joyRev);
	}
	else if (values[0] == 4){
		document.getElementById("outputSpace").innerHTML = "4";
		printTheTopEmotion(sadnessArray, sadnessRev);
	}

}

var printTheTopEmotion = function(emotionValues, emotionRev){
	var values = getValues(emotionValues, 5);
	for (var i = 0; i<values.length; i++){
		console.log(values);
		var index = values[i];
		var someNum =  parseFloat(emotionValues[index]);
		console.log(someNum);
		if ( someNum >= emotionRev){
			console.log("hit");
			console.log(sentences[index]);
		}	
	}
}
