// import errorImg from 'InitialContent.js';

var requests = [];
var residue = [];
var temp = [];
var temp2 = [];
var j, word;
var p1, pp1;
var keys;
var mdbtn;

$("#inputname").on('keypress',function(e) {
  if(e.which == 13) {
    SearchforResult(1);
  }
});

// function for fetching the details
function SearchforResult(page) {
	word = document.getElementById("inputname").value;
	if (word.length > 0) {
		pp1 = document.getElementById("searchParameter")
		p1 = pp1.options[pp1.selectedIndex].value;
		parameterRequests = '';
		requests = [];
		residue = [];
		if (p1 != 1) {
			if (p1 == 2) {
				parameterRequests = '&type=movie';
			}
			else if (p1 == 3) {
				parameterRequests = '&type=series';
			}
			else {
				parameterRequests = '&type=episode';
			}
		}
		keys = 0;

		jQuery.ajax({
			url: 'https://www.omdbapi.com/?apikey=bf86a20c&s=' + word + '&page=' + page + parameterRequests, 
			dataType: 'json',
			cache: true,
			jsonp: false,
		}).then(function (results) {
			if (results.hasOwnProperty('Search')) {
				for (i = 0; i < results.Search.length; i++) {
					requests.push($.get('http://www.omdbapi.com/?apikey=bf86a20c&i=' + results.Search[i].imdbID));
				}
				$.when.apply($, requests).done(function() {
					console.log(arguments);
					temp2 = arguments;
					var len = arguments.length;
					var movieLength;
					var WritersParadise;
					var castCrew;
					if (arguments.length == 3 && arguments[1] == 'success') {
						temp = arguments[0];
						arguments[0] = [];
						arguments[0][0] = temp;
						len = 1;
					}
					document.getElementById("header").style.boxShadow = "0px 1px 10px 12px #191c1f";
					for (k = 0; k < len; k++) {
						try {
							j = arguments[k][0].Ratings[1].Value;
						}
						catch (err) {
							j = "N/A";
						}
						//var Poster = errorImg(arguments[k][0].Poster);
						movieLength = arguments[k][0].Runtime.split(" ")[0];
						movieLength = Math.floor(movieLength / 60) + "h " + (movieLength % 60) + "min"
						WritersParadise = arguments[k][0].Writer.split(",");
						castCrew = arguments[k][0].Actors.split(",");
						if (WritersParadise.length > 4) {
							WritersParadise = WritersParadise[0] + ", " + WritersParadise[1] + ", " + WritersParadise[2] + ", " + WritersParadise[3];
						}
						else {
							WritersParadise = arguments[k][0].Writer;
						}
						if (castCrew.length > 4) {
							castCrew = castCrew[0] + ", " + castCrew[1] + ", " + castCrew[2] + ", " + castCrew[3];
						}
						else {
							castCrew = arguments[k][0].Actors;
						}

						residue.push(
							React.createElement("div", {
									className: "container-fluid bg-dark text-white",
									key: keys.toString(),
									style: {margin: "10px 0px", padding: "0% 5%"}
								},
								React.createElement("div", {className: "row each-item-capsule"}, 
									React.createElement("div", {
											className: "col-3 item-img-container",
											style: {minWidth: "260px"}
										},
										// React.createElement("div", {
										// 		className: "badge bg-dark",
										// 		style: {height: "40px", width: "50px"}
										// 	},
										// 	React.createElement("h2", null, (k + 1).toString())
										// ), 
										React.createElement("div", {className: "item-poster-container"}, 
											React.createElement("img", {
													className: "item-poster",
													src: arguments[k][0].Poster != "N/A" ? arguments[k][0].Poster : "static/noposter.jpg"
												}
											)
										)
									), 
									React.createElement("div", {className: "col-8 item-details", style: {flexGrow: "1"}}, 
										React.createElement("div", {className: "item-title"}, 
											React.createElement("span", {className: "item-title-name"}, arguments[k][0].Title + " "), 
											React.createElement("span", {className: "item-release-year"}, "(" + arguments[k][0].Year + ")")
										),
										React.createElement("div", {className: "item-short-info"}, 
											React.createElement("span", null, arguments[k][0].Rated != "N/A" ? arguments[k][0].Rated : "NR"),
											React.createElement("span", null, " | "), 
											React.createElement("span", null, movieLength),
											 React.createElement("span", null, " | "),
											React.createElement("span", null, arguments[k][0].Genre),
											React.createElement("span", null, " | "), 
											React.createElement("span", null, arguments[k][0].Released),
											React.createElement("span", null, " | "), 
											React.createElement("span", null, arguments[k][0].Language), 
											React.createElement("span", null, " | "), 
											React.createElement("span", null, arguments[k][0].Country), 
										), 
										arguments[k][0].Ratings != undefined || arguments[k][0].imdbRating != undefined ? 
										getAccEl(arguments[k][0].Ratings, arguments[k][0].imdbRating, k) : null,
										arguments[k][0].Plot != "N/A" ? React.createElement("div", {className: "item-plot"}, arguments[k][0].Plot) : null,
										React.createElement("div", {className: "item-directors", style: {margin: "1px 0px"}}, 
											React.createElement("span", {style: {fontWeight: "bold"}}, "Directors: "), 
											React.createElement("span", {style: {marginLeft: "2px"}}, arguments[k][0].Director)
										),
										React.createElement("div", {className: "item-writers", style: {margin: "1px 0px"}}, 
											React.createElement("span", {style: {fontWeight: "bold"}}, "Writers: "), 
											React.createElement("span", {style: {marginLeft: "2px"}},
												arguments[k][0].Writer.length <= 100 ? arguments[k][0].Writer : WritersParadise + "... etc.")
										),
										React.createElement("div", {className: "item-cast", style: {margin: "1px 0px"}}, 
											React.createElement("span", {style: {fontWeight: "bold"}}, "Cast: "), 
											React.createElement("span", {style: {marginLeft: "2px"}},
												arguments[k][0].Actors.length <= 100 ? arguments[k][0].Actors : castCrew + "... etc.")
										), arguments[k][0].BoxOffice != undefined ? React.createElement("div", {className: "item-box-office", style: {margin: "1px 0px"}}, 
											React.createElement("span", {style: {fontWeight: "bold"}}, "Box Office: "), 
											React.createElement("span", {style: {marginLeft: "2px"}}, arguments[k][0].BoxOffice)
										) : null,
										arguments[k][0].Production != undefined ? React.createElement("div", {className: "item-production", style: {margin: "1px 0px"}}, 
											React.createElement("span", {style: {fontWeight: "bold"}}, "Production: "), 
											React.createElement("span", {style: {marginLeft: "2px"}}, arguments[k][0].Production)
										) : null,
										React.createElement("div", {className: "item-awards badge bg-info", style: {margin: "10px 0px"}}, arguments[k][0].Awards != "N/A" ?
											React.createElement("span", {style: {fontSize: "1.1rem", color: "blanchedalmond"}}, arguments[k][0].Awards) : null
										)
									)
								)
							)
						)
						keys++;
					}

					document.body.style.backgroundColor = "#212529";
					residue.push(
						React.createElement("nav", {
							'aria-label': "Page navigation", 
							key: keys.toString(),
							style: {display: "flex", justifyContent: "center"}
						}, 
							React.createElement("ul", {className: "pagination"},
								React.createElement("li", {
									className: "page-item", 
									onClick: () => SearchforResult(page <= 1 ? 1 : page - 1)
								}, 
									React.createElement("a", {className: "page-link bg-dark", href: "#"}, 
										React.createElement("span", {
											"dangerouslySetInnerHTML" : {__html: "&laquo;"}
										}, null)
									)
								), 
								page == 1 ? null : React.createElement("li", {
									className: "page-item", 
									onClick: () => SearchforResult(1)
								}, 
									React.createElement("a", {className: "page-link disabled bg-dark", href: "#"}, 1)
								),
								React.createElement("li", {className: "page-item"}, 
									React.createElement("a", {className: "page-link disabled bg-dark", href: "#"}, page.toString())
								),
								React.createElement("li", {
									className: "page-item", 
									onClick: () => SearchforResult(arguments.length != 10 ? page : page + 1)
								}, 
									React.createElement("a", {className: "page-link bg-dark", href: "#"}, 
										React.createElement("span", {
											"dangerouslySetInnerHTML" : {__html: "&raquo;"}
										}, null)
									)
								)
							)
						)
					)

					ReactDOM.render(residue, document.getElementById('root'));
				
				})
			}
			else {
				document.body.style.backgroundColor = "#fff";
				ReactDOM.render(
					React.createElement("div", {className: "errorInput", key: "0"}, 
						React.createElement("div", {
							className: "alert alert-warning d-flex align-items-center", 
							role: "alert", 
							style: {borderRadius: "0px", justifyContent: "center", overflow: "hidden", margin: "0px"}, 
							key: "1"}, 
							React.createElement("img", {
									style : {objectFit: 'contain'},
									src: 'static/errorinput.png'
								}
							)
						)
					),
					document.getElementById('root')
				);
			}
		});
	}
	else {
		document.body.style.backgroundColor = "#212529";
		ReactDOM.render(
			React.createElement("div", {className: "errorInput", key: "0"}, 
				React.createElement("div", {
					className: "container-fluid d-flex align-items-center", 
					role: "alert", 
					style: {borderRadius: "0px", justifyContent: "center", overflow: "hidden", margin: "0px"}, 
					key: "1"}, //Sorry but you gave wrong input, please try again.
					React.createElement("img", {
							style : {objectFit: 'contain'},
							src: 'static/errorinput.png'
						}
					)
				)
			),
			document.getElementById('root')
		);
	}
}

/*React.createElement("img", {
		src: "static/warning.png",
		style: {height: "50px"},
		key: "2"
	}), 
	React.createElement("div", {key: "3"}, "Sorry but no result found for your query.")*/
