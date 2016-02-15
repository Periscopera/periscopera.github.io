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

  var videoElement = document.querySelector(".video")
  videoElement.setAttribute("style", "background-image: url(" + randomData.video + ")")
  videoElement.addEventListener("click", function () {
    window.location.reload()
  })

  document.querySelector(".tags").innerText = randomData.tags

  document.querySelector(".location span").innerText = randomData.city

  document.querySelector(".location small").innerText = randomData.country
}
