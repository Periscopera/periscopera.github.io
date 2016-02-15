function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Settings
function sheetLoaded(data) {
	data = data.feed.entry.map(function (entry) {
		return {
			tags: entry['gsx$tags']['$t'],
			city: entry['gsx$city']['$t'],
			country: entry['gsx$country']['$t'],
			video: entry['gsx$video']['$t']
		}
	})

    var randomData = data[getRandomArbitrary(0, data.length - 1)]

	d3.select(".video")
		.style("background-image", "url(" + randomData.video + ")")

	d3.select(".tags")
		.text(randomData.tags)

	d3.select(".location span")
		.text(randomData.city)

	d3.select(".location small")
		.text(randomData.country)

	d3.select(".video").on("click", function(){
		window.location.reload();
	})
}