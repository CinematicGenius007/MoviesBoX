$(document).ready(function() {
	console.log("ready!");
	$("#main-body").css("display", "block");
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

function getAccEl(cr, im, k) {
	return React.createElement("div", {
			className: "item-rating btn-group",
			role: "group",
			style: {margin: "6px 0px"}
		},
		im != undefined && im != "N/A" ? React.createElement("button", {
				className: "btn btn-outline-light",
				type: "button"
			},
			"IMDbRating: ",
			React.createElement("span", {style: {fontSize: "1.2rem"}}, im), 
			"/10"
		) : null,
		cr != undefined ? (cr[1] != undefined ? React.createElement("button", {
				className: "btn btn-outline-danger",
				style: {color: "red", borderColor: "red"},
				type: "button"
			},
			cr[1].Source + ": ",
			React.createElement("span", {style: {fontSize: "1.2rem"}}, cr[1].Value)
		) : null) : null,
		cr != undefined ? (cr[2] != undefined ? React.createElement("button", {
				className: "btn btn-outline-warning",
				type: "button"
			},
			cr[2].Source + ": ",
			React.createElement("span", {style: {fontSize: "1.2rem"}}, cr[2].Value.slice(0, 2)),
			cr[2].Value.slice(2, 6)
		) : null) : null
	);
}


// function errorImg(Imgurl) {
// 	if(Imgurl != "N/A") {
// 		const img = new Image();
// 		img.src = Imgurl;
// 		img.addEventListener('load', function() {
// 			if (img.width == 240) {
// 				console.log("200");
// 				return 1;
// 			} else {
// 				console.log("404");
// 				return -1;
// 			}
// 		}, false);
// 	}
// 	return 0;
// }
