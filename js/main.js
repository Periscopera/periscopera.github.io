var currentIndex = 0
var entries = []
var thread;

// Returns a random integer between 0 (inclusive) and `max` (exclusive).
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Shuffles `array`.
//
// Replaces the `i`th element with a random element of the array between 0 and
// `i`. It does that for in between [`length - 1`, 0].
function shuffle(array) {
  var randomIndex, temp
  for (var i = array.length - 1; i > -1; i--) {
    randomIndex = getRandomInt(i + 1)
    temp = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = temp
  }
}

function loadVideo(entry) {
  document.querySelector(".video").setAttribute("style", "background-image: url(" + entry.video + ")")
  document.querySelector(".tags").innerText = entry.tags
  document.querySelector(".location span").innerText = entry.city
  document.querySelector(".location small").innerText = entry.country
}

// Increases `currentIndex`'s value by one and loads the corresponding entry.
function playNextVideo() {
  currentIndex = (currentIndex + 1) % entries.length
  loadVideo(entries[currentIndex])
}

// Show controls and info
document.querySelector("html").addEventListener("mousemove", showControls); 
document.querySelector(".video").addEventListener("click", showControls); 

function showControls(){
  document.querySelector(".title").setAttribute("style", "top: 16px; transition: all 0.2s")
  document.querySelector(".next").setAttribute("style", "top: 16px; transition: all 0.2s")
  clearTimeout(thread);
  thread = setTimeout(mousestopped, 2000);
}

function mousestopped(){
  document.querySelector(".title").setAttribute("style", "top: -120px; transition: all 0.2s")
  document.querySelector(".next").setAttribute("style", "top: -120px; transition: all 0.2s")
}

// Callback executed at soon as the sheet data gets loaded.
function sheetLoaded(data) {
  entries = data.feed.entry.map(function (entry) {
    return {
      tags: entry['gsx$tags']['$t'],
      city: entry['gsx$city']['$t'],
      country: entry['gsx$country']['$t'],
      video: entry['gsx$video']['$t']
    }
  })

  shuffle(entries)
  loadVideo(entries[currentIndex])

  document.querySelector("#next").addEventListener("click", playNextVideo)
  document.querySelector(".video").addEventListener("click", playNextVideo)
}
