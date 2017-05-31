var initialWordList = ["test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox","test", "fox",];

for (var i = 0; i < initialWordList.length; i++) {
	var newButton = $("<button>")
		.addClass("gifButton")
		.text(initialWordList[i]);
	$("#buttonsRow").append(newButton);
}





// $(document).ready(function() {
	
// });