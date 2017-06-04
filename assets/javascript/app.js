$(document).ready(function() {	

	// Declaring Variables
	var topics = [ "fox","dinosaur","rabbit","dragon","snake","dog","cat","hedgehog","hawk","crocodile",
					"bat","squirrel","rooster","racoon","turtle","owl","giraffe","horse","camel","panther",
					"lion","kangaroo","bear","sheep","otter","mouse","alligator","kaiju"];
	var colorList = ["red","blue","green","yellow","brown","grey","cyan","purple","orange","pink"];
	var gifsPerButton = 10;

	var queryURL = "https://api.giphy.com/v1/gifs/search?" + 
				"limit=" + gifsPerButton + 
				"&rating=pg" +
				"&api_key=dc6zaTOxFJmzC" + 
				"&q=";
				
	var gifArr = [];

	// Creates initial word list
	for (var i = 0; i < topics.length; i++) {
		addButton(topics[i]);
	}

	// Clicking the submit button adds the current text input to the button list
	$("#addSubject").on("click",function(event){
		event.preventDefault()
		var newText = $("#subjectInput").val().trim();
		$("#subjectInput").val("");

		// Checks for repeat buttons
		if (topics.indexOf(newText) === -1 && newText !== "") {
			topics.push(newText);
			addButton(newText);
		}
	});

	// Adds button to the button row based on the text value s
	function addButton(subj) {
		var buttonColor = colorList[(topics.indexOf(subj))%10];
		var newButton = $("<button>")
			.addClass("gifButton")
			.addClass( buttonColor + "Button")
			.text(subj);
		$("#buttonsRow").append(newButton);
	}

	// Clicking a gif button displays the all the gifs obtained
	$(document).on("click", ".gifButton", function() {
		$("#gifContainer").empty();
		$(".gifButton").removeClass("selectedButton");
		$(this).addClass("selectedButton");
		var subject = $(this).text();
		displayGifs(subject);
	});

	// Retrieves gifs from api and displays it to the user
	function displayGifs(subj) {
		gifArr = [];
		var borderColor = colorList[(topics.indexOf(subj))%10];

		$.ajax({
			url: queryURL + subj,
			method: 'GET'
			}).done(function(response) {
			for (var i = 0; i < response.data.length; i++) {
				var newDiv = $("<div>");
				newDiv.addClass("gifDiv");
				newDiv.css("border","7px groove " + borderColor);

				var newP = $("<p>");
				newP.text("rating: " + response.data[i].rating);

				var newImg = $("<img>")
					.addClass("gifImg")
					.attr("src",response.data[i].images.fixed_height_still.url);
				
				newDiv.append(newP);
				newDiv.append(newImg);
				$("#gifContainer").append(newDiv);

				gifArr.push({
					gif:response.data[i].images.fixed_height.url,
					gifStill: response.data[i].images.fixed_height_still.url
				});
			}
		});
	}

	// Clicking a gif switches between stills and playing
	$(document).on("click", ".gifImg", function() {
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
	
});