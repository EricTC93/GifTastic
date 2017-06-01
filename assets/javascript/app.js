var wordList = [ "fox","dinosaur","rabbit","dragon","snake","dog","cat","hedgehog","hawk","alligator","squirrel","bat","rooster","racoon"];
var buttonColors = ["red","blue","green","yellow","brown","grey","cyan","purple","orange","pink"];
var gifsPerButton = 10;

console.log();

for (var i = 0; i < wordList.length; i++) {
	addButton(wordList[i]);
}

var queryURL = "http://api.giphy.com/v1/gifs/search?" + 
			"limit=" + gifsPerButton + 
			"&rating=pg" +
			"&api_key=dc6zaTOxFJmzC";
			
var subjectParam;
var gifArr = [];

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
	event.preventDefault()
	var newText = $("#subjectInput").val().trim();
	if (wordList.indexOf(newText) === -1) {
		wordList.push(newText);
		addButton(newText);
	}
});

function addButton(s) {
	var newButton = $("<button>")
		.addClass("gifButton")
		.addClass(buttonColors[(wordList.indexOf(s))%10] + "Button")
		.text(s);
	$("#buttonsRow").append(newButton);
}

$(document).on("click", ".gifButton", function() {
	$("#gifContainer").empty();
	$(".gifButton").removeClass("selectedButton");
	$(this).addClass("selectedButton");
	// var subject = $(this).text();
	subjectParam = "&q=" + $(this).text();
	displayGifs(subjectParam);
});

function displayGifs(subj) {
	gifArr = [];

	$.ajax({
		url: queryURL + subj,
		method: 'GET'
		}).done(function(response) {
		// console.log(response.data);
		for (var i = 0; i < response.data.length; i++) {
			var newDiv = $("<div>");

			var newP = $("<p>");
			newP.text("rating: " + response.data[i].rating);

			var newImg = $("<img>")
				.addClass("gifImg")
				.attr("src",response.data[i].images.fixed_height_small_still.url);
			
			newDiv.append(newP);
			newDiv.append(newImg);
			$("#gifContainer").append(newDiv);

			gifArr.push({
				gif:response.data[i].images.fixed_height_small.url,
				gifStill: response.data[i].images.fixed_height_small_still.url
			});
		}
		// console.log(gifArr);
	});
}

$(document).on("click", ".gifImg", function() {
	// console.log(this.src);
	for(var i = 0; i < gifArr.length; i++) {
		if (this.src === gifArr[i].gifStill) {
			this.src = gifArr[i].gif;
			return;
		}

		else if (this.src === gifArr[i].gif) {
			this.src = gifArr[i].gifStill;
			return;
		}
	}
})

// $(document).ready(function() {
	
// });