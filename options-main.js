$(document).ready(function() {
	// Get their one they already entered if they have one
	if(localStorage['username'] !== undefined) {
		$('input').val(localStorage['username']);
	}
	
	// Listen for the keypress event in the input
	$('input').keypress(function(e) {
		var inputSelected = $(this);
		// If it was enter
		if(e.keyCode == 13) {
			// Check that they actually choose a name
			if (inputSelected.val() !== "") {	
				// Set their name
				localStorage['username'] = inputSelected.val();
				// Show that it was set
				$('#status').html('Username set to ' + inputSelected.val());
			} else {
				$('#status').html('Could not set username');
			}
		}
	});
});