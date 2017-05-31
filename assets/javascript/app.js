var initialWordList = ["test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox",];

for (var i = 0; i < initialWordList.length; i++) {
	var newButton = $("<button>")
		.addClass("gifButton")
		.text(initialWordList[i]);
	$("#buttonsRow").append(newButton);
}


var queryURL = "http://api.giphy.com/v1/gifs/search?" + 
			"q=" + initialWordList[0] +
			"&limit=10" + 
			"&rating=g" +
			"&api_key=dc6zaTOxFJmzC";

$.ajax({
	url: queryURL,
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
		$("#gifRow").append(newDiv);
	}
});


// $(document).ready(function() {
	
// });