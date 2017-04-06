
var provider = new firebase.auth.GoogleAuthProvider();
var user;
  // Get a reference to the database service
var database = firebase.database();
var wTable = document.getElementById("wOut");
var distance;
var time;
var split;
var numOfSplit;
var today;
var rowNum = 1;
var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	var today = month +  "/" + day + "/" + year;


$( document ).ready(function() {
	$("#welcome").hide();
});


function signIn(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user;
  setLogIn();
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

//last function. reads all data from database

function setLogIn() {
	$("#login").hide();
	$("#welcome"). show();
}



//takes 
function addWorkout() {
	//search reading
	//if user has no database create database using writeUserData
	distance = document.getElementById("distance").value;

	var hours = document.getElementById("hours").value;
	hours = parseInt(hours*360);
	var minutes = document.getElementById("minutes").value;
	minutes = parseInt(minutes*60);
	var seconds = document.getElementById("seconds").value;
	//seconds = parseInt(seconds);
	time = hours + minutes + seconds;
	
	var split = document.getElementById("splitLength").value;
	numOfSplit = distance/500;
	numOfSplit = time/numOfSplit;
	var i = parseInt(numOfSplit/60);
	var t = numOfSplit%60;
	t = Math.round(t * 10) / 10;

	if (t < 10) {
		t = "0" + t;
	}

	numOfSplit = i + ":" + t;


	
	//writeNewPost(date, distance, time, split);
	updateTable();
}
	
function updateTable() {
	var table = document.getElementById("wOuts");
	var row = table.insertRow(rowNum);
	rowNum++;
	var cellDate = row.insertCell(0);
	var cellDistance = row.insertCell(1);
	var cellTime = row.insertCell(2);
	var cellSplit = row.insertCell(3);

	cellDate.innerHTML = today;
	cellDistance.innerHTML = distance;
	cellTime.innerHTML = time;
	cellSplit.innerHTML = numOfSplit;
}

