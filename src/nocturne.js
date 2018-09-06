// create a new Web Audio API context
var ac = new AudioContext();

// set the playback tempo
var tempo = 110;

var melody = [
  'G3  1',

  'E4  4',

  'D4  1',
  'E4  1',

  'D4  3',
  
  'C4  2',
  'G3  1',
  
  'E4  2',
  'A3  0.5',
  'Bb3  0.125',
  'A3  0.125',
  'G#3  0.125',
  'A3  0.125',
  'A4  2',
  'E4  1',
  'G4  3',
  'F4  2',

  'E4  1',
  'D4  3',
  'E4  2',
  'B3  1',
  'C4  3',
  'A3  3',

  'G3  1',
  'B4  1',
  'A4  1',
  'G4  0.5',
  'F4  0.5',
  'E4  0.5',
  'F4  0.5',
  'A3  0.5',
  'B3  0.5',
  'C4  3',
  '-  2',
  ]

  var bass = [

  'C2  1',
  'G2  1',
  'C3  1',

  'Ab2  1',
  'B2  1',
  'E3  1',

  'G2  1',
  'C3  1',
  'E3  1',

  'B2  1',
  'C3  1',
  'E3  1',

  'A2  1',
  'C#3  1',
  'E3  1',

  'A2  1',
  'C#3  1',
  'G3  1',

  'D2  1',
  'Bb2  1',
  'C#3  1',

  'D2  1',
  'A2  1',
  'D3  1',

  'G2  1',
  'B2  1',
  'F3  1',

  'G#2  1',
  'E3  1',
  'D3  1',

  'A2  1',
  'C3  1',
  'E3  1',

  'F#2  1',
  'C3  1',
  'Eb3  1',

  'G2  1',
  'C3  1',
  'F3  1',

  'G2  1',
  'B3  1',
  'F3  1',

  'G2  1',
  'C3  1',
  'E3  1',

  'G2  1',
  'C3  1',
  'E3  1',
  ]

// create a new sequence
var seq_melody = new TinyMusic.Sequence( ac, tempo, melody);
seq_melody.gain.gain.value = 0.2;
seq_melody.staccato = 0.1;
seq_melody.smoothing = 0.1;
seq_melody.waveType = "sine"

var seq_bass = new TinyMusic.Sequence( ac, tempo, bass);
seq_bass.gain.gain.value = 0.4;
seq_bass.smoothing = 0.1;
seq_bass.waveType = "sine"

document.querySelector('#play').addEventListener('click', function() {
  when = ac.currentTime;
  seq_melody.play(when);
  seq_bass.play(when + ( 60 / tempo ) * 1 );
}, false );

// pause
document.querySelector('#stop').addEventListener('click', function() {
  seq_melody.stop();
  seq_bass.stop();
}, false );

document.querySelector('#smooth').addEventListener('click', function() {
  seq_bass.smoothing = 0.1;
  seq_bass.staccato = 0;
}, false );

// pause
document.querySelector('#staccato').addEventListener('click', function() {
  seq_bass.smoothing = 0;
  seq_bass.staccato = 0.75;
}, false );

// volume
var slider = document.getElementById("volume");
slider.oninput = function() {
    seq_melody.gain.gain.value = this.value / 10;
}