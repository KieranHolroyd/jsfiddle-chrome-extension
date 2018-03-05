$(document).ready(function() {
	// Check if they need to configure the extension
	if(localStorage['username'] === undefined) {
		// Try to grab it automatically
		$.get('https://jsfiddle.net/user/get_username/', function(username) {
			if(username == '') {
				// Show the 'You need to configure' message
				$('#configure').fadeIn(200);
			}
			else {
				// Auto configure the username
				localStorage['username'] = username;
				
				// Load their fiddles
				setupFiddles();
			}
		});
	}
	// Otherwise, load their fiddles
	else {
		setupFiddles();
	}
	
	// Set up the transitions between editing and viewing fiddles
	$('#createFiddleToggle').click(function () {
		if ($(this).attr('isopen') == "closed") {
			$('#viewFiddle').fadeOut(200);
			$('#createFiddle').delay(200).fadeIn(200);
			$('#reloadFiddle').fadeOut(200);
			$(this).attr('isopen', "open");
			$(this).attr('title', "View My Fiddles")
			$(this).html('&times;');
		} else {
			$('#createFiddle').fadeOut(200);
			$('#viewFiddle').delay(200).fadeIn(200);
			$(this).attr('isopen', "closed");
			$(this).attr('title', "Create New Fiddle")
			$('#reloadFiddle').fadeIn(200);
			$(this).html('+');
		}
	})
});

// Grabs all of the fiddles, builds the html and displays it.
function setupFiddles() {
	// Make the asynchronous AJAX call
	$.ajax({
		url: 'https://jsfiddle.net/api/user/' + localStorage['username'] + '/demo/list.json',
		data: {limit: 100},
		success: function(json) {
			// Set up the variables
			var built = '';
			var revision = '';
			
			// Decode the JSON retrieved by the API
			var list = JSON.parse(json);
			
			// Loop through all of the fiddles in the list
			for(var l in list) {
				// Build the HTML string
				var latest = "";
				console.log(list[l]);
				if (list[l].latest_version > 0) {
					latest = list[l].latest_version;
				}
				built += '<a href="' + list[l].url + latest + '" target="_blank"><div class="project"><span style="font-size: 25px;">' + list[l].title + revision;
				built += '<br><span style="font-size: 14px; padding: 0;">' + ((list[l].description != '') ? list[l].description : '') + "</span></span></a></div>";
			}
			
			// Drop the built HTML into the UL
			$('.projectcontainer').html(built);
			
			// Fade the fiddles in
			$('#viewFiddle').fadeIn(200);
		}
	});
}
$('#reloadFiddle').click(function () {
	setupFiddles();
});
// This function is run when the framework or dependencies are changed, it appends the forms action
function changeAction(framework, dependencies) {
	// So here we are appending the selected framework
	// If dependencies is not empty we append that too
	$('form').attr('action', 'http://jsfiddle.net/api/post/' + framework + '/' + ((dependencies == '') ? '' : 'dependencies/' + dependencies + '/'));
}
// Make Links Work
$(document).ready(function () {
	$('body').on('click', 'a', function (e) {
		e.preventDefault();
		if ($(this).attr('href')!==undefined) {
			chrome.tabs.create({ url: "https:"+$(this).attr('href') });
		}
		return false;
	});
});