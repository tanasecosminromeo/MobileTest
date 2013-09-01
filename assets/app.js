// jQuery Address Event handlers
$.address.externalChange(function(event) {
	var text = event.value.substr(1);

	if ( text.length > 0 ) {
		loadView( text );
		window.defaultView.find("a").each(function(i){
			var $this = $(this);
			if ($this.text() == text ) {
				$this.addClass( "listSelected" );
			}
		});
		$(this).addClass( "listSelected" );
	}
	else {
		resetList();
		window.viewNavigator.popView();
		$.address.value("");
	}
});

$(document).ready( function() {
	//Setup the default view
	var template = $("#defaultViewTemplate").html();
	window.defaultView = $(template);

	defaultViewDescriptor = { title: "TV Listings",
		view: window.defaultView
	};

	//Setup the ViewNavigator
	window.viewNavigator = new ViewNavigator( 'body', 'headerButton' );
	window.viewNavigator.pushView( defaultViewDescriptor );


});

function loadView( title ) {
	var html = "<div style='min-height:100%; background:#FFF; padding: 3px 15px;'><h1>" + title + "</h1><strong>Cable television</strong> is a system of providing television programs to consumers via radio frequency (RF) signals transmitted to televisions through coaxial cables or digital light pulses through fixed optical fibers located on the subscriber's property. This can be compared to over-the-air method used in traditional broadcast television (via radio waves) in which a television antenna is required. FM radio programming, high-speed Internet, telephony, and similar non-television services may also be provided through cable television. Source: <a href='http://en.wikipedia.org/wiki/Cable_tv'>http://en.wikipedia.org/wiki/Cable_tv</a></div>";

	var iframeView = { title: title,
		backLabel: "Home",
		view: $(html),
		backCallback: handleNavigateBack
	};
	window.viewNavigator.pushView( iframeView );
}

function handleNavigateBack() {
	resetList();
	history.back();
}

function resetList() {
	window.defaultView.find("a").each(function(i){
		$(this).removeClass( "listSelected" );
	});
}