# WebAudioAPI

## Key concepts

Taken from [MiddleEar](https://middleearmedia.com/web-audio-api-basics/)

With the Web Audio API, audio files can be played only after they’ve been loaded into a buffer. We use an XMLHttpRequest to load data into a buffer from an audio file. Next, we make an asynchronous callback and send the actual request to load. Once a sound has been buffered and decoded, it can be triggered instantly. Each time it is triggered, a different instance of the buffered sound is created.

### AudioContext 

In order to use the WebAudioAPI, we must create a container. This container is called AudioContext. Here is where the audio signal graph exists. 

Only one AudioContext is usually needed, as any number of sounds can be loaded in a single AudioContext.

```javascript
var context = new AudioContext(); // Create audio container
```

### AudioNodes

Audio signal is made up of nodes dynamically connected in a modular fashion

#### AudioSourceNode

Interface representing an audio source. It has no input and a single output. There are two types of AudioSourceNodes:

  - **Oscillators**: to generate a sound, create an oscillator and connect it to a destination.

```javascript
oscillator = context.createOscillator(); // Create sound source

oscillator.connect(context.destination); // Connect sound to speakers
oscillator.start() // Generate sound instantly
```

  - **Audio files**:We can play audio files with the help of a buffer and XMLHttpRequest. [See tutorial here](https://middleearmedia.com/web-audio-api-audio-buffer/)

  The play audio files in an `AudioSourceNode`, the audio source must first be loaded into a buffer (a region of physical memory to temporarily store data). Therefore, An `XMLHttpRequest` is used to load data into a buffer from the audio file. 

  [Tutorial on many ways of playing a sound with the WebAudioAPI](https://middleearmedia.com/play-sound-web-audio-api/)

```javascript
var getSound = new XMLHttpRequest();
getSound.open("GET", "sounds/electro2.wav", true); // `true` for asynchronous load
getSound.responseType = "arraybuffer"; // arraybuffer since we want the audio to be read in as binary data
getSound.onload = function() {
context.decodeAudioData(getSound.response, function(buffer){
electro = buffer;
});
}
getSound.send();

```




#### AudioDestinationNode

`AudioDestinationNode` is an `AudioNode` representing the final audio destination. An audio source must be connected to a destination to be audible.

There should be only `AudioDestinationNode` per `AudioContext`

```javascript
oscillator.connect(context.destination); // Connect sound to speakers
```

#### Intermediate Audio Nodes

These are intermediate processing modules we can route our signal through.


  - `GainNode` multiplies the input audio signal
  - `DelayNode` delays the incoming audio signal
  - `AudioBufferNode` is a memory-resident audio asset for short audio clips
  - `PannerNode` positions an incoming audio stream in three-dimensional space
  - `ConvolverNode` applies a linear convolution effect given an impulse response
  - `DynamicsCompressorNode` implements a dynamics compression effect
  - `BiQuadFilterNode` implements very common low-order filters
  - `WaveshaperNode` implements non-linear distortion effects


### Demos

