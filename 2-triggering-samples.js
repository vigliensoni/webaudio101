const context = new AudioContext(); // Create and initialize audio contexy
const url = './samples/Snare-Mini-1.wav';
// const url = 'https://middleearmedia.com/demos/webaudio/sounds/iwasreborn.wav';
let source;

// Load the sound with XMLHttpRequest
function start() {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer'; // Read as binary data

  // Asynchronous callback
  request.onload = function() {
    let data = request.response;

    audioRouting(data);
  }
  request.send();
}

function stop() {
  source.stop(context.currentTime); // Stop the source immediately 
}

// Create buffered sound source
function audioRouting(data) {
  source = context.createBufferSource(); // Create sound source
  context.decodeAudioData(data, function(buffer) { // Create source buffer from binary
    source.buffer = buffer; // Add buffered data to object
    source.connect(context.destination); // Connect sound source to output
    playSound(source); // Pass the `source` object to the playSound function
  })
}

// Tell the source when to play
function playSound() {
  source.start(context.currentTime); // play the source immediately
}



document.getElementById('play').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);