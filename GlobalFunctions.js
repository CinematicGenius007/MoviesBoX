function getAccEl(cr, im, k) {
	return React.createElement("div", {
			className: "item-rating btn-group",
			role: "group",
			style: {margin: "6px 0px"}
		},
		im != undefined && im != "N/A" ? React.createElement("button", {
				className: "btn btn-outline-info",
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


function getErrorCaseForInput() {
	return React.createElement("div", {className: "errorInput", key: "0"}, 
		React.createElement("div", {
			className: "container-fluid d-flex align-items-center", 
			role: "alert", 
			style: {borderRadius: "0px", justifyContent: "center", overflow: "hidden", margin: "0px"}, 
			key: "1"}, //Sorry but you gave wrong input, please try again.
			React.createElement("img", {
					style : {objectFit: 'contain'},
					src: 'errorinput.png'
				}
			)
		)
	)
}


function getErrorCaseForInputResult() {
	return React.createElement("div", {className: "errorInput", key: "0"}, 
		React.createElement("div", {
			className: "alert alert-warning d-flex align-items-center", 
			role: "alert", 
			style: {borderRadius: "0px", justifyContent: "center", overflow: "hidden", margin: "0px"}, 
			key: "1"}, 
			React.createElement("img", {
					style : {objectFit: 'contain'},
					src: 'errorinput.png'
				}
			)
		)
	)
}

function getTopPicks(argument) {
		var movieLength;
		var WritersParadise;
		var castCrew;
		document.getElementById("header").style.boxShadow = "0px 1px 10px 12px #191c1f";
			try {
				j = argument.Ratings[1].Value;
			}
			catch (err) {
				j = "N/A";
			}
			//var Poster = errorImg(arguments[k][0].Poster);
			movieLength = argument.Runtime != "N/A" ? argument.Runtime.split(" ")[0] : "0hr 0min";
			movieLength = Math.floor(movieLength / 60) + "h " + (movieLength % 60) + "min"
			WritersParadise = argument.Writer.split(",");
			castCrew = argument.Actors.split(",");
			if (WritersParadise.length > 4) {
				WritersParadise = WritersParadise[0] + ", " + WritersParadise[1] + ", " + WritersParadise[2] + ", " + WritersParadise[3];
			}
			else {
				WritersParadise = argument.Writer;
			}
			if (castCrew.length > 4) {
				castCrew = castCrew[0] + ", " + castCrew[1] + ", " + castCrew[2] + ", " + castCrew[3];
			}
			else {
				castCrew = argument.Actors;
			}

			return React.createElement("div", {
				className: "container-fluid bg-dark text-white",
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
								src: argument.Poster != "N/A" ? argument.Poster : "noposter.jpg"
							}
						)
					)
				), 
				React.createElement("div", {className: "col-8 item-details", style: {flexGrow: "1"}}, 
					React.createElement("div", {className: "item-title"}, 
						React.createElement("span", {className: "item-title-name"}, argument.Title + " "), 
						React.createElement("span", {className: "item-release-year"}, "(" + argument.Year + ")")
					),
					React.createElement("div", {className: "item-short-info"}, 
						React.createElement("span", null, argument.Rated != "N/A" ? argument.Rated : "NR"),
						React.createElement("span", null, " | "), 
						React.createElement("span", null, movieLength),
						 React.createElement("span", null, " | "),
						React.createElement("span", null, argument.Genre),
						React.createElement("span", null, " | "), 
						React.createElement("span", null, argument.Released),
						React.createElement("span", null, " | "), 
						React.createElement("span", null, argument.Language), 
						React.createElement("span", null, " | "), 
						React.createElement("span", null, argument.Country), 
					), 
					argument.Ratings != undefined || argument.imdbRating != undefined ? 
					getAccEl(argument.Ratings, argument.imdbRating, 0) : null,
					argument.Plot != "N/A" ? React.createElement("div", {className: "item-plot"}, argument.Plot) : null,
					React.createElement("div", {className: "item-directors", style: {margin: "1px 0px"}}, 
						React.createElement("span", {style: {fontWeight: "bold"}}, "Directors: "), 
						React.createElement("span", {style: {marginLeft: "2px"}}, argument.Director)
					),
					React.createElement("div", {className: "item-writers", style: {margin: "1px 0px"}}, 
						React.createElement("span", {style: {fontWeight: "bold"}}, "Writers: "), 
						React.createElement("span", {style: {marginLeft: "2px"}},
							argument.Writer.length <= 100 ? argument.Writer : WritersParadise + "... etc.")
					),
					React.createElement("div", {className: "item-cast", style: {margin: "1px 0px"}}, 
						React.createElement("span", {style: {fontWeight: "bold"}}, "Cast: "), 
						React.createElement("span", {style: {marginLeft: "2px"}},
							argument.Actors.length <= 100 ? argument.Actors : castCrew + "... etc.")
					), argument.BoxOffice != undefined && argument.BoxOffice != "N/A" ? React.createElement("div", {className: "item-box-office", style: {margin: "1px 0px"}}, 
						React.createElement("span", {style: {fontWeight: "bold"}}, "Box Office: "), 
						React.createElement("span", {style: {marginLeft: "2px"}}, argument.BoxOffice)
					) : null,
					argument.Production != undefined && argument.Production != "N/A" ? React.createElement("div", {className: "item-production", style: {margin: "1px 0px"}}, 
						React.createElement("span", {style: {fontWeight: "bold"}}, "Production: "), 
						React.createElement("span", {style: {marginLeft: "2px"}}, argument.Production)
					) : null,
					React.createElement("div", {className: "item-awards badge bg-info", style: {margin: "10px 0px"}}, argument.Awards != "N/A" ?
						React.createElement("span", {style: {fontSize: "1.1rem", color: "blanchedalmond"}}, argument.Awards) : null
					)
				)
			)
		)
	}
