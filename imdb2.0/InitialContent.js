$(document).ready(function() {
	console.log("ready!");
	$("#main-body").css("display", "block");

});

function getAccEl(cr, im, k) {
	return React.createElement("div", {
			className: "item-rating btn-group",
			role: "group",
			style: {margin: "6px 0px"}
		},
		im != undefined ? React.createElement("button", {
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
