var ac = new AudioContext();

var tempo = 100;

// music
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

  var bass_1 = [

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

var bass_2 = [

  'C2  1.5',
  'G2  0.5',
  'C3  1',

  'Ab2 1',
  'B2  1',
  'E3  1',

  'G2  1.5',
  'C3  0.5',
  'E3  1',

  'B2 1',
  'E3 1',
  'C3 1',

  'A2  1.5',
  'C#3 0.5',
  'E3  1',

  'A2  1',
  'C#3 1',
  'G3  1',

  'D2  1.5',
  'Bb2 0.5',
  'C#3 1',

  'D2  1',
  'D3  1',
  'A2  1',

  'G2  1.5',
  'B2  0.5',
  'F3  1',

  'G#2 1',
  'E3  1',
  'D3  1',

  'A2  1.5',
  'C3  0.5',
  'E3  1',

  'F#2 1',
  'Eb3  1',
  'C3 1',

  'G2  1.5',
  'C3  0.5',
  'F3  1',

  'G2  1',
  'F3  1',
  'B3  1',

  'G2  1.5',
  'C3  0.5',
  'E3  1',

  'G2  1',
  'C3  1',
  'E3  1',
  ]

var fanfare = [
  'C4  2',
  'B3  1.5',
  'F3  0.5',
  'A3  1',
  'G3  1',
  'F3  1',
  'D3  1',
  'C3  1',
  'B2  0.5',
  'C3  0.5',
  'D3  1',
  'G2  1',
  'C3  1',
  ]

var seq_melody, seq_bass

seq_melody = new TinyMusic.Sequence( ac, tempo, melody);
seq_melody.gain.gain.value = 0.05;
seq_melody.staccato = 0.1;
seq_melody.smoothing = 0.1;
seq_melody.waveType = "sine"
seq_bass = new TinyMusic.Sequence( ac, tempo, bass_1);
seq_bass.gain.gain.value = 0.4;
seq_bass.smoothing = 0.1;
seq_bass.waveType = "sine";
seq_bass.smoothing = 0.1;
seq_bass.staccato = 0;
var seq_fanfare = new TinyMusic.Sequence( ac, 160, fanfare);
seq_fanfare.waveType = "triangle";
seq_fanfare.staccato = 0.1;
seq_fanfare.loop = false;
// sfx
var wifi_down = [
  'G4  0.3',
  'E4  0.3',
  'C4  0.3',
  'G2  0.1',
  '-  0.5',
  ]

var wifi_up = [
  'G2  0.3',
  'C4  0.3',
  'E4  0.3',
  'G4  0.1',
  '-  0.5',
  ]

var match = ['G3 0.25', 'G4 0.1']
var seq_wifidown = new TinyMusic.Sequence( ac, 180, wifi_down);
seq_wifidown.gain.gain.value = 0.1;
seq_wifidown.smoothing = 0.2;
seq_wifidown.loop = false;

var seq_wifiup = new TinyMusic.Sequence( ac, 180, wifi_up);
seq_wifiup.gain.gain.value = 0.1;
seq_wifiup.smoothing = 0.2;
seq_wifiup.loop = false;

var seq_match = new TinyMusic.Sequence( ac, 180, match);
seq_match.waveType="sine"
seq_match.gain.gain.value = 0.1;
seq_match.loop = false

document.querySelector('#play').addEventListener('click', function() {
  when = ac.currentTime;
  seq_melody.play(when);
  seq_bass.play(when + ( 60 / tempo ) * 1 );
}, false );

document.querySelector('#win').addEventListener('click', function() {
  when = ac.currentTime;
  seq_fanfare.play(when);
}, false );

// pause
document.querySelector('#stop').addEventListener('click', function() {
  seq_melody.stop();
  seq_bass.stop();
}, false );

document.querySelector('#v1').addEventListener('click', function() {
  seq_melody.stop();
  seq_bass.stop();
  tempo = 100
  seq_melody = new TinyMusic.Sequence( ac, tempo, melody);
  seq_melody.gain.gain.value = 0.05;
  seq_melody.staccato = 0.1;
  seq_melody.smoothing = 0.1;
  seq_melody.waveType = "sine"
  seq_bass = new TinyMusic.Sequence( ac, tempo, bass_1);
  seq_bass.gain.gain.value = 0.4;
  seq_bass.smoothing = 0.1;
  seq_bass.waveType = "sine";
  seq_bass.smoothing = 0.1;
  seq_bass.staccato = 0;
  when = ac.currentTime;
  seq_melody.play(when);
  seq_bass.play(when + ( 60 / tempo ) * 1 );
}, false );

// pause
document.querySelector('#v2').addEventListener('click', function() {
  seq_melody.stop();
  seq_bass.stop();
  tempo = 160
  seq_melody = new TinyMusic.Sequence( ac, tempo, melody);
  seq_melody.gain.gain.value = 0.05;
  seq_melody.staccato = 0.1;
  seq_melody.smoothing = 0.1;
  seq_melody.waveType = "triangle"
  seq_bass = new TinyMusic.Sequence( ac, tempo, bass_2);
  seq_bass.gain.gain.value = 0.2;
  seq_bass.waveType = "triangle";
  seq_bass.smoothing = 0;
  seq_bass.staccato = 0.1;
  when = ac.currentTime;
  seq_melody.play(when);
  seq_bass.play(when + ( 60 / tempo ) * 1 );
}, false );

document.querySelector('#wifidown').addEventListener('click', function() {
  seq_wifidown.play();
}, false );

document.querySelector('#wifiup').addEventListener('click', function() {
  seq_wifiup.play();
}, false );

document.querySelector('#match').addEventListener('click', function() {
  seq_match.play();
}, false );

// volume
var slider = document.getElementById("volume");
slider.oninput = function() {
    seq_melody.gain.gain.value = this.value / 10;
}