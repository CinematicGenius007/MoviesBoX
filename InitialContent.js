	
$(document).ready(function() {
	var res = [];
	var keys = 0;
	$.when.apply($, res).done(function() {
		keys = 0;
		console.log("ready!");
		$("#main-body").css("display", "block");
		document.body.backgroundColor = "#212529";
		ReactDOM.render(React.createElement("div", {
					id: "home-page", 
					className: "container-fluid bg-dark text-white"
				},
				React.createElement("div", {
						className: "container-fluid sub-container text-white bg-dark"
					},
					React.createElement("h2", {
							className: "heading", 
						}, 
						"Upcoming Movies and Series"),
					getTopPicks(obj5),
					getTopPicks(obj6),
					getTopPicks(obj7)
				),
				React.createElement("div", {
						className: "container-fluid sub-container text-white bg-dark"
					},
					React.createElement("h2", {
							className: "heading", 
						}, 
						"Top Movies this week"),
					getTopPicks(obj1),
					getTopPicks(obj2),
					getTopPicks(obj3),
					getTopPicks(obj4)
				)
			),
			document.getElementById('root')
		)
	});

});

