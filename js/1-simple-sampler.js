const context = new AudioContext(); // Create and initialize audio contexy
const getSound = new XMLHttpRequest(); // Load the sound with XMLHttpRequest
let electro; // Create the variable for the audio data
let playSound; // Create the variable for the sound

getSound.open('GET', '../samples/Snare-Mini-1.wav', true);
getSound.responseType = 'arraybuffer'; // Read as binary data
getSound.onload = function() {
  context.decodeAudioData(getSound.response, function(buffer){
    electro = buffer; // Decode the audio data and store it in a variable
  });
}

getSound.send(); // Send the request and load the file

window.addEventListener("keydown", onKeyDown); // Create Event Listener for key down


function onKeyDown(e){
  switch (e.keyCode){
    case 88: // X
      playSound = context.createBufferSource(); // Declare a new sound
      playSound.buffer = electro; // Attach our audio data as the sound buffer
      playSound.connect(context.destination); // Link the sound to the output
      playSound.start(0); // Play the sound now
      break;
  }
}






