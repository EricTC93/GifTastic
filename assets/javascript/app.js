var initialWordList = ["test", "fox", "dinosaur"];

for (var i = 0; i < initialWordList.length; i++) {
	addButton(initialWordList[i]);
}


var queryURL = "http://api.giphy.com/v1/gifs/search?" + 
			"limit=10" + 
			"&rating=g" +
			"&api_key=dc6zaTOxFJmzC";
			
var subjectParam = "&q=" + initialWordList[0];

// $.ajax({
// 	url: queryURL + subjectParam,
// 	method: 'GET'
// 	}).done(function(response) {
// 	console.log(response.data);
// 	for (var i = 0; i < response.data.length; i++) {
// 		var newDiv = $("<div>");

// 		var newP = $("<p>");
// 		newP.text("rating: " + response.data[i].rating);

// 		var newImg = new Image();
// 		newImg.src = response.data[i].images.fixed_height_small.url;
		
// 		newDiv.append(newP);
// 		newDiv.append(newImg);
// 		$("#gifContainer").append(newDiv);
// 	}
// });

// $("#gifContainer").empty();

$("#addSubject").on("click",function(event){
	event.preventDefault();
	var newText = $("#subjectInput").val().trim();
	addButton(newText);
});

function addButton(s) {
	var newButton = $("<button>")
		.addClass("gifButton")
		.text(s);
	$("#buttonsRow").append(newButton);
}

$(document).on("click", ".gifButton", function() {
	$("#gifContainer").empty();
	// var subject = $(this).text();
	subjectParam = "&q=" + $(this).text();
	displayGifs(subjectParam);
});

function displayGifs(subj) {
	$.ajax({
		url: queryURL + subj,
		method: 'GET'
		}).done(function(response) {
		console.log(response.data);
		for (var i = 0; i < response.data.length; i++) {
			var newDiv = $("<div>");

			var newP = $("<p>");
			newP.text("rating: " + response.data[i].rating);

			var newImg = new Image();
			newImg.src = response.data[i].images.fixed_height_small.url;
			
			newDiv.append(newP);
			newDiv.append(newImg);
			$("#gifContainer").append(newDiv);
		}
	});
}

// $(document).ready(function() {
	
// });