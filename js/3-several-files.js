let context;
let bufferLoader;

function loadAndPlayStaggered() {
  try {
    context = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser");
  }

  bufferLoader = new BufferLoader(
    context, [
      '../samples/Kick-LinnDrum-2.wav',
      '../samples/Snare-Mini-1.wav',
      '../samples/ClosedHH TheTrunk 3.wav'
    ],
    finishedLoadingStaggered
  );
  bufferLoader.load();
}

function finishedLoadingStaggered(bufferList) {
  // Create three sources and buffers
  let kick = context.createBufferSource();
  let snare = context.createBufferSource();
  let hihat = context.createBufferSource();
  kick.buffer = bufferList[0];
  snare.buffer = bufferList[1];
  hihat.buffer = bufferList[2];

  kick.connect(context.destination);
  snare.connect(context.destination);
  hihat.connect(context.destination);

  // Play them staggered
  kick.start(0);
  hihat.start(0.250);
  snare.start(0.500);
}