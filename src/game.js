kontra.init();

kontra.assets.imagePath = "assets/images";

// Music Stuff
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

var seq_melody = new TinyMusic.Sequence( ac, tempo, melody);
seq_melody.gain.gain.value = 0.05;
seq_melody.staccato = 0.1;
seq_melody.smoothing = 0.1;
seq_melody.waveType = "sine"

var seq_bass = new TinyMusic.Sequence( ac, tempo, bass);
seq_bass.gain.gain.value = 0.3;
seq_bass.smoothing = 0.1;
seq_bass.waveType = "sine";

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

var match = [
  'G3 0.25',
  'G4 0.1'
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
var seq_wifidown = new TinyMusic.Sequence( ac, 180, wifi_down);
seq_wifidown.gain.gain.value = 0.05;
seq_wifidown.smoothing = 0.2;
seq_wifidown.loop = false;

var seq_wifiup = new TinyMusic.Sequence( ac, 180, wifi_up);
seq_wifiup.gain.gain.value = 0.05;
seq_wifiup.smoothing = 0.2;
seq_wifiup.loop = false;

var seq_match = new TinyMusic.Sequence( ac, 180, match);
seq_match.gain.gain.value = 0.4;
seq_match.waveType="sine"
seq_match.loop = false

var seq_click = new TinyMusic.Sequence( ac, 180, ['G3 0.25']);
seq_click.gain.gain.value = 0.05;
seq_click.loop = false

var seq_fanfare = new TinyMusic.Sequence( ac, 180, fanfare);
seq_fanfare.gain.gain.value = 0.3;
seq_fanfare.waveType = "triangle";
seq_fanfare.staccato = 0.1;
seq_fanfare.loop = false;

var ROUTER_WIDTH = 20;
var PERSON_WIDTH = 15;
var PERSON_HEIGHT = 30;
var WIFI_COLOR = "mediumturquoise";

// The compatibility of two love types are relative to how close their IDs are (in a circular list's sense)
var LOVE_TYPES = [
  { // Aries
    id: 0,
    symbol: '\u2648',
    color: 'slateblue'
  },
  { // Taurus
    id: 1,
    symbol: '\u2649',
    color: 'blueviolet'
  },
  { // Gemini
    id: 2,
    symbol: '\u264A',
    color: 'magenta'
  },
  { // Cancer
    id: 3,
    symbol: '\u264B',
    color: 'violet'
  },
  { // Leo
    id: 4, 
    symbol: '\u264C',
    color: 'crimson'
  },
  { // Virgo
    id: 5,
    symbol: '\u264D',
    color: 'darkorange'
  },
  { // Libra
    id: 6,
    symbol: '\u264E',
    color: 'gold'
  },
  { // Scorpius
    id: 7,
    symbol: '\u264F',
    color: 'greenyellow'
  },
  { // Sagittarus
    id: 8,
    symbol: '\u2650',
    color: 'springgreen'
  },
  { // Capricornus
    id: 9,
    symbol: '\u2651',
    color: 'cyan'
  },
  { // Aquarius
    id: 10,
    symbol: '\u2652',
    color: 'dodgerblue'
  }, 
  { // Pisces
    id: 11,
    symbol: '\u2653',
    color: 'blue'
  }
]
var CURSOR_TYPE = -1;

var cursor = kontra.sprite({
  x: -100,
  y: -100,
  typeId: CURSOR_TYPE,
  color: 'pink',
  boldColor: 'magenta',
  radius: 3,
  wifiDrain: 20,
  isInCanvas: false,
  wingSpanX: 7,
  wingSpanY: 2,
  wingTipX: 12,
  wingTipY: 10,
  cx: function() {
    return this.x + this.radius
  },
  cy: function() {
    return this.y + this.radius
  },
  isLinking: function() {
    return this.link != null;
  },
  showCursor: function() {
    cursor.isInCanvas = true;
  },
  hideCursor: function() {
    cursor.isInCanvas = false;
  },
  render: function() {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill()
    ctx.lineWidth = 1
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.wingSpanX, this.y - this.wingSpanY);
    ctx.lineTo(this.x - this.wingTipX, this.y - this.wingTipY);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x + this.wingSpanX, this.y - this.wingSpanY);
    ctx.lineTo(this.x + this.wingTipX, this.y - this.wingTipY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke()
  }
});

var link = function(entity1, entity2) {
  return kontra.sprite({
    entity1: entity1,
    entity2: entity2,
    linkColor: cursor.color,
    lovePower: 0,
    maxLovePower: 100,
    hSize: 60,
    hx: function() {
      return Math.floor(this.entity1.cx() - (this.entity1.cx()-this.entity2.cx())/2)
    },
    hy: function() {
      return Math.floor(this.entity1.cy() - (this.entity1.cy()-this.entity2.cy())/2);
    },
    isMatch: function() {
      return entity1.typeId != CURSOR_TYPE;
    },
    isPerfectMatch: function() {
      return entity1.typeId == entity2.typeId;
    },
    collidesWithCursor: function() {
      let dx = cursor.cx() - this.hx();
      let dy = cursor.cy() - this.hy();
      return Math.abs(dx) <= this.hSize/2 && Math.abs(dy) <= this.hSize/2;
    },
    boostLove: {
      timer: null,
      boostInterval: 150,
      boostAmount: 10,
      start: function() {
        if (this.timer == null) {
          var self = this;
          this.timer = window.setInterval(function(){ self.run(); }, this.boostInterval);
          this.parent.boostAnimation.start();
        }
      },
      run: function() {
        // Boost speed is reduced when hovering over multiple hearts at the same time
        this.parent.lovePower += this.boostAmount/cursor.numBoostLove;
        if (this.parent.lovePower >= this.parent.maxLovePower) {
          this.stop();
          this.parent.success();
        }
      },
      stop: function() {
        if (this.timer != null) {
          window.clearInterval(this.timer);
          this.timer = null;
          this.parent.boostAnimation.stop();
        }
      }
    },
    drainLove: {
      timer: null,
      drainInterval: 150,
      drainAmount: 10,
      start: function() {
        if (this.timer == null) {
          var self = this;
          this.timer = window.setInterval(function(){ self.run(); }, this.drainInterval);
        }
      },
      run: function() {
        if (this.parent.boostLove.timer == null) {
          this.parent.lovePower -= this.drainAmount;
          if (this.parent.lovePower <= 0) {
            this.stop();
            this.parent.destroy();
          }
        }
      },
      stop: function() {
        if (this.timer != null) {
          window.clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    boostAnimation: {
      timer: null,
      emitInterval: 40,
      dx: 0,
      dxMax: 16,
      dy: 0,
      dyMin: 3,
      dyMax: 24,
      dyStep: 3,
      color: cursor.boldColor,
      start: function() {
        if (this.timer == null) {
          var self = this;
          this.dy = this.dyMin;
          this.dx = Math.random() * 2*this.dxMax - this.dxMax;
          this.timer = window.setInterval(function(){ self.run(); }, this.emitInterval);
        }
      },
      run: function() {
        this.dy += this.dyStep;
        if (this.dy >= this.dyMax) {
          this.dy = this.dyMin;
          this.dx = Math.random() * 2*this.dxMax - this.dxMax; 
        }
      },
      stop: function() {
        if (this.timer != null) {
          window.clearInterval(this.timer);
          this.timer = null;
          this.dy = 0;
          this.dx = 0;
        }
      },
      render: function() {
        let hSize = this.parent.hSize/3;
        let x = this.x - hSize/3 + this.dx;
        let y = this.y + hSize/4 - this.dy;
        ctx.font = hSize+"px Courier";
        ctx.fillStyle = cursor.boldColor;
        ctx.fillText("\u2665", x, y);
      }
    },
    success: function() {
      var self = this;
      self.destroy();
      self.entity1.destroy();
      self.entity2.destroy();
      seq_match.play();
      if (people.length == 0) {
        window.setTimeout(function() {
          game.time.stop();
          game.endLevel();
        }, 1000)
      }
    },
    render: function() {
      ctx.strokeStyle = this.linkColor
      ctx.beginPath();
      ctx.moveTo(this.entity1.cx(), this.entity1.cy());
      ctx.lineTo(this.hx(), this.hy());
      ctx.stroke();
      if (this.isPerfectMatch()) {
        let x = this.hx() - this.hSize/3;
        let y = this.hy() + this.hSize/4;
        let gradient = ctx.createLinearGradient(x,y-this.hSize,x,y);
        let colorStop = (0.9 - 0.9/this.maxLovePower*this.lovePower).toFixed(2);
        gradient.addColorStop(0, cursor.color);
        gradient.addColorStop(colorStop, cursor.color);
        gradient.addColorStop(1.0, cursor.boldColor);
        ctx.font = this.hSize+"px Courier";
        ctx.fillStyle = gradient;
        ctx.fillText("\u2665", x, y);
      }
      ctx.beginPath();
      ctx.moveTo(this.hx(), this.hy());
      ctx.lineTo(this.entity2.cx(), this.entity2.cy());
      ctx.stroke();

      if (this.boostAnimation.timer != null) {
        this.boostAnimation.render();
      }
      if (this.isMatch()) {
        this.entity1.drawLoveType();
      }
      this.entity2.drawLoveType();
    },
    init: function() {
      this.entity1.link = this;
      this.entity2.link = this;
      this.boostLove.parent = this;
      this.drainLove.parent = this;
      this.boostAnimation.parent = this;
      this.boostAnimation.x = this.hx();
      this.boostAnimation.y = this.hy();
      if (this.isPerfectMatch()) {
        this.linkColor = cursor.boldColor;
      }
      return this;
    },
    destroy: function() {
      let linkIndex = links.indexOf(this);
      links.splice(linkIndex, 1);
      entity1.link = null;
      entity2.link = null;
    }
  }).init();
};
var links = [];

var router = function(x, y) {
  return kontra.sprite({
    x: x,
    y: y,
    color: 'dimgrey',
    wifiUpColor: WIFI_COLOR,
    wifiLossColor: 'lightgrey',
    wifiDownColor: 'orange',
    width: ROUTER_WIDTH,
    height: ROUTER_WIDTH,
    radius: 10,
    wifiPower: 100,
    maxWifiPower: 100,
    minWifiPower: -50,
    wifiRange: kontra.sprite({
      timer: null,
      emitInterval: 30,
      radius: 0,
      minRadius: 20,
      maxRadius: 200,
      radiusStep: 5,
      start: function() {
        if (this.timer == null) {
          var self = this;
          this.radius = this.minRadius;
          this.timer = window.setInterval(function(){ self.run(); }, this.emitInterval);
        }
      },
      run: function() {
        this.radius += this.radiusStep;
        if (this.radius >= this.maxRadius) {
          this.radius = this.minRadius;
        }
      },
      stop: function() {
        if (this.timer != null) {
          window.clearInterval(this.timer);
          this.timer = null;
          this.radius = 0;
        }
      },
      render: function() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }),
    cx: function() {
      return this.x + this.radius;
    },
    cy: function() {
      return this.y + this.radius;
    },
    isWifiDown: function() {
      return this.wifiPower < 0;
    },
    collidesWithCursor: function() {
      let dx = cursor.cx() - this.cx();
      let dy = cursor.cy() - this.cy();
      return Math.abs(dx) <= this.radius && Math.abs(dy) <= this.radius;
    },
    drawStats: function() {
      if (this.isWifiDown()) {
        ctx.font = "11px Arial";
        ctx.fillStyle = this.wifiDownColor;
      } else {
        ctx.font = "11px Arial";
        ctx.fillStyle = this.wifiUpColor;
      }
      let wifiPower = Math.ceil(this.wifiPower)
      //ctx.fillText(wifiPower, parseInt(this.x), parseInt(this.y-this.radius/3));

      let x = parseInt(this.x+this.radius);
      let y = parseInt(this.y+this.radius*0.75);
      ctx.lineWidth = 3;

      if (wifiPower > this.maxWifiPower*0.75) {
        ctx.strokeStyle = this.wifiUpColor;
      } else {
        ctx.strokeStyle = this.wifiLossColor;
      }
      ctx.beginPath();
      ctx.arc(x, parseInt(y+this.radius/3*2), parseInt(this.radius/3*8), 1.28*Math.PI, 1.72*Math.PI);
      ctx.stroke();
      if (wifiPower > this.maxWifiPower*0.5) {
        ctx.strokeStyle = this.wifiUpColor;
      } else {
        ctx.strokeStyle = this.wifiLossColor;
      }
      ctx.beginPath();
      ctx.arc(x, parseInt(y+this.radius/2), parseInt(this.radius/3*6), 1.28*Math.PI, 1.72*Math.PI);
      ctx.stroke();
      if (wifiPower > this.maxWifiPower*0.25) {
        ctx.strokeStyle = this.wifiUpColor;
      } else {
        ctx.strokeStyle = this.wifiLossColor;
      }
      ctx.beginPath();
      ctx.arc(x, parseInt(y+this.radius/3), parseInt(this.radius/3*4), 1.28*Math.PI, 1.72*Math.PI);
      ctx.stroke();

      if (wifiPower > 0) {
        ctx.fillStyle = this.wifiUpColor;
      } else {
        let gradient = ctx.createLinearGradient(x, y-this.radius/2, x, y+this.radius/2);
        let colorStop = (0.95/this.minWifiPower*wifiPower).toFixed(2);
        gradient.addColorStop(0, this.wifiLossColor);
        gradient.addColorStop(colorStop, this.wifiLossColor);
        gradient.addColorStop(colorStop, 'white');
        gradient.addColorStop(colorStop, this.wifiDownColor);
        gradient.addColorStop(1.0, this.wifiDownColor);
        ctx.font = this.hSize+"px Courier";
        ctx.fillStyle = gradient;
      }
      ctx.beginPath();
      ctx.arc(x, y, this.radius/2, 0, 2*Math.PI);
      ctx.fill();
    },
    drainWifi: {
      timer: null,
      drainInterval: 250,
      wifiDownDropToPower: -20,
      start: function() {
        if (this.timer == null) {
          var self = this;
          this.timer = window.setInterval(function(){ self.run(); }, this.drainInterval);
          this.parent.drainAnimation.start();
        }
      },
      run: function() {
        let oldWifiPower = this.parent.wifiPower;
        if (this.parent.wifiPower > 0) {
          this.parent.wifiPower -= cursor.wifiDrain;
        } else if (this.parent.wifiPower > this.parent.minWifiPower) {
          if (this.parent.wifiPower > this.wifiDownDropToPower) {
            this.parent.wifiPower = this.wifiDownDropToPower*1.1;
          } else {
            this.parent.wifiPower -= cursor.wifiDrain / 4;
            if (this.parent.wifiPower < this.parent.minWifiPower) {
              this.parent.wifiPower = this.parent.minWifiPower
            }
          }
        }
        if (oldWifiPower > 0 && this.parent.wifiPower <= 0) {
          this.parent.wifiRange.stop();
          seq_wifidown.play();
          this.parent.wifiPower = this.wifiDownDropToPower;
          for (var i = 0; i < people.length; i++) {
            let thisPerson = people[i];
            if (thisPerson.hasMatch() && !thisPerson.hasWifi()) {
              thisPerson.link.drainLove.stop();
            }
          };
        }
      },
      stop: function() {
        if (this.timer != null) {
          window.clearInterval(this.timer);
          this.timer = null;
          this.parent.drainAnimation.stop();
        }
      }
    },
    recoverWifi: {
      timer: null,
      recoverInterval: 100,
      start: function() {
        var self = this;
        this.timer = window.setInterval(function(){ self.run(); }, this.recoverInterval);
      },
      run: function() {
        let oldWifiPower = this.parent.wifiPower;
        if (this.parent.wifiPower < this.parent.maxWifiPower) {
          if (this.parent.wifiPower > 0) {
            this.parent.wifiPower += 1;
            if (this.parent.wifiPower > this.parent.maxWifiPower) {
              this.parent.wifiPower = this.parent.maxWifiPower;
            }
          } else {
            this.parent.wifiPower += 0.25;
          }
        }
        if (oldWifiPower <= 0 && this.parent.wifiPower > 0) {
          this.parent.wifiRange.start();
          seq_wifiup.play();
          for (var i = 0; i < people.length; i++) {
            let thisPerson = people[i];
            if (thisPerson.hasMatch() && thisPerson.hasWifi()) {
              thisPerson.link.drainLove.start();
            }
          };
        }
      },
      stop: function() {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    },
    drainAnimation: {
      timer: null,
      emitInterval: 40,
      radius: 0,
      minRadius: 3,
      maxRadius: 24,
      radiusStep: 3,
      color: 'crimson',
      start: function() {
        if (this.timer == null) {
          var self = this;
          this.radius = this.maxRadius;
          this.timer = window.setInterval(function(){ self.run(); }, this.emitInterval);
        }
      },
      run: function() {
        this.radius -= this.radiusStep;
        if (this.radius <= this.minRadius) {
          this.radius = this.maxRadius;
        }
      },
      stop: function() {
        if (this.timer != null) {
          window.clearInterval(this.timer);
          this.timer = null;
          this.radius = 0;
        }
      },
      render: function() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    },
    render: function() {
      this.draw();
      this.wifiRange.render();
      if (this.drainAnimation.timer != null) {
        this.drainAnimation.render();
      }
    },
    init: function() {
      this.drainWifi.parent = this;
      this.recoverWifi.parent = this;
      this.drainAnimation.parent = this;
      this.wifiRange.x = this.cx();
      this.wifiRange.y = this.cy();
      this.drainAnimation.x = this.cx();
      this.drainAnimation.y = this.cy();
      this.wifiRange.color = this.wifiUpColor;
      var self = this;
      window.setTimeout(function(){ self.wifiRange.start(); }, Math.random()*500)
      this.recoverWifi.start();
      return this;
    }
  }).init();
};
var routers = []

var person = function(x, y, typeId) {
  return kontra.sprite({
    x: x,
    y: y,
    typeId: typeId,
    color: 'antiquewhite',
    width: PERSON_WIDTH,
    height: PERSON_HEIGHT,
    radiusX: PERSON_WIDTH / 2,
    radiusY: PERSON_HEIGHT / 2,
    headRad: PERSON_WIDTH,
    phone: kontra.sprite({
      color:'black',
      width: 10,
      height: 18,
      render: function() {
        this.draw()
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(this.x+1, this.y+2, this.width-2, this.height-4);
        ctx.fillStyle = 'antiquewhite';
        ctx.beginPath();
        ctx.arc(this.x + 3, this.y + 7, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'lightgrey';
      }
    }),
    cx: function() {
      return this.x + this.radiusX;
    },
    cy: function() {
      return this.y + this.radiusY;
    },
    isHypnotized: function() {
      return this.link != null;
    },
    hasMatch: function() {
      return this.isHypnotized() && this.link.isMatch();
    },
    collidesWithCursor: function() {
      let dx = cursor.cx() - this.cx();
      let dy = cursor.cy() - this.cy();
      return Math.abs(dx) <= this.radiusX + 2 && Math.abs(dy) <= this.radiusY + this.headRad;
    },
    hasWifi: function() {
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].isWifiDown()) {
          continue;
        }
        let wifiRange = routers[i].wifiRange;
        let dx = wifiRange.x - this.cx();
        let dy = wifiRange.y - this.cy();
        let dist = Math.sqrt(dx * dx + dy * dy);        
        if (dist <= wifiRange.maxRadius) {
          return true;
        }
      }
      return false;
    },
    render: function() {
      this.draw();
      if (this.hasWifi() && !this.isHypnotized()) {
        this.phone.render();
      }
      if (this.isHypnotized()) {
        if (this.link.isPerfectMatch()) {
          ctx.strokeStyle = cursor.boldColor;
        } else {
          ctx.strokeStyle = cursor.color;
        }
        ctx.lineWidth = 3;
        // draw head outline
        ctx.beginPath();
        ctx.arc(this.x + this.radiusX, this.y, this.headRad, 0, 2 * Math.PI);
        ctx.stroke();
        //draw body outline
        ctx.strokeRect(this.x-1, this.y-1, this.width+2, this.height+2);
        ctx.strokeStyle = this.color;
      }
      // draw head
      ctx.beginPath();
      ctx.arc(this.x + this.radiusX, this.y, this.headRad, 0, 2 * Math.PI);
      ctx.fill();
      // draw eyes
      ctx.fillStyle = 'black';
      ctx.font = "12px Courier";
      if (this.hasWifi() && !this.isHypnotized()) {
        ctx.fillText("  ._.", this.x-this.radiusX, this.cy()-this.radiusX*2);
      }
      else if (this.isHypnotized() && this.link.isPerfectMatch()) {
        ctx.fillText(" ♥_♥", this.x-this.radiusX, this.cy()-this.radiusX*2);
      }
      else if (!this.hasWifi()) {
        ctx.fillText(" ._.", this.x-this.radiusX, this.cy()-this.radiusX*2);
      }
      
      
      if (DISPLAY_LOVE_TYPES) {
        this.drawLoveType();
      }
    },
    drawLoveType: function() {
      let loveType = LOVE_TYPES[this.typeId];
      ctx.font = "18px Courier";
      ctx.fillStyle = loveType.color;
      ctx.fillText(loveType.symbol, this.x-this.radiusX*0.15, this.cy()+this.radiusX*0.6);
    },
    init: function() {
      this.phone.parent = this;
      this.phone.x = this.x + this.width*0.75 + 5;
      this.phone.y = this.y + this.height*0.25;
      return this;
    },
    destroy: function() {
      let personIndex = people.indexOf(this);
      people.splice(personIndex, 1);
    }
  }).init();
};
var people = []

// Default settings. Change this to make the game easier/harder!
var NUM_ROUTERS = 3;
var NUM_PEOPLE = 16;
var START_MIN = 4;
var START_SEC = 0;
var START_LEVEL = 1;  // Set to 0 to use the settings above. 
var START_STATE = 0;

var game = {
  state: null,
  states: {
    TITLE: 0,
    STARTLEVEL: 1,
    INLEVEL: 2,
    ENDLEVEL: 3
  },
  time: {
    min: 0,
    sec: 0,
    startMin: 0,
    startSec: 0,
    timer: null,
    getTotalSecLeft: function() {
      return game.time.min*60 + game.time.sec;
    },
    start: function() {
      var self = this;
      this.min = this.startMin;
      this.sec = this.startSec;
      this.timer = window.setInterval(function(){
        if (self.sec == 0) {
          if (self.min == 0) {
            game.endLevel();
            self.stop();
          } else {
            self.min -= 1;
            self.sec = 59;
          }
        } else {
          self.sec -= 1;
        }
      }, 1000);
    },
    stop: function() {
      window.clearInterval(this.timer);
      this.timer = null;
    },
    render: function() {
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      let min = this.min;
      let sec = this.sec;
      if (min < 10) { 
        min = "0"+min; 
      }
      if (sec < 10) { 
        sec = "0"+sec; 
      }
      ctx.fillText(min+":"+sec, 490, 16);
    },
    reset: function() {
      this.stop();
      this.start();
    }
  },
  screen: {
    overlay: kontra.sprite({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      color: "black",
      render: function() {
        ctx.globalAlpha = 0.7;
        this.draw();
        ctx.globalAlpha = 1.0;
      }
    }),
    render: function() {
      if (game.state != game.states.INLEVEL) {
        this.overlay.render();
      }
      game.screens[game.state].render()
    }
  },
  btn: kontra.sprite({
    x: 195,
    y: 250,
    width: 135,
    height: 30,
    color: WIFI_COLOR,
    text: "",
    cx: function() {
      return this.x + this.width/2;
    },
    cy: function() {
      return this.y + this.height/2;
    },
    collidesWithCursor: function() {
      let dx = cursor.cx() - this.cx();
      let dy = cursor.cy() - this.cy();
      return Math.abs(dx) <= this.width/2 && Math.abs(dy) <= this.height/2;
    },
    render: function() {
      this.draw();
      ctx.fillStyle = cursor.boldColor;
      ctx.font = "bold 20px Arial";
      let x = this.x;
      if (this.text == "TRY AGAIN") {
        x += 14;
      } else if (this.text == "NEXT LEVEL") {
        x += 8;
      } else if (this.text == "PLAY") {
        x += 43;
      }
      ctx.fillText(this.text, x, this.y + 22);
      ctx.lineWidth = 1;
      ctx.strokeStyle = cursor.boldColor;
      ctx.strokeRect(this.x-1, this.y-1, this.width+2, this.height+2);
    } 
  }),
  nextState: function() {
    let state = game.state + 1;
    if (state >= game.states.ENDLEVEL) {
      state = game.states.STARTLEVEL;
    }
    game.load(game.level, state);
    game.screenTimer = null;
  },
  screens: [
    { // TITLE
      router: null,
      person1: null,
      person2: null,
      link: null,
      load: function() {
        game.btn.text = "PLAY";
        this.router = router(224, 145);
        this.person1 = person(-30, 250, 1);
        this.person2 = person(768, 10, 1);
        this.link = link(this.person1, this.person2);
        this.link.lovePower = this.link.maxLovePower;
        this.router.color = "#393939";
      },
      render: function() {
        this.router.render();
        this.router.drawStats();
        this.link.render();
        ctx.font = "48px Arial";
        ctx.fillStyle = cursor.boldColor;
        ctx.fillText("HOTSPOT", 48, 180);
        ctx.fillStyle = WIFI_COLOR;
        ctx.fillText("HOTSPOT", 51, 180);
        ctx.fillStyle = WIFI_COLOR;
        ctx.fillText("LOVERS", 296, 180);
        ctx.fillStyle = cursor.boldColor;
        ctx.fillText("LOVERS", 299, 180);
        game.btn.render();
      }
    },
    { // STARTLEVEL
      timer: null,
      isEndGame: false,
      load: function(isEndGame) {
        this.isEndGame = isEndGame;
        if (!isEndGame) {
          this.screenTimer = window.setTimeout(function() {
            game.state = game.states.INLEVEL;
            let level = game.levels[game.level-1];
            game.time.stop();
            game.time.start();
            game.screenTimer = null;
          }, 5000);
        }
      },
      render: function() {
        if (this.isEndGame) {
          ctx.font = "52px Arial";
          ctx.fillStyle = cursor.boldColor;
          ctx.fillText("YOU WIN!", 140, 180);
          ctx.font = "20px Arial";
          ctx.fillText("Now it's your turn to go OFFLINE and find your love!", 40, 240);
        } else {
          ctx.font = "60px Arial";
          ctx.fillStyle = cursor.boldColor;
          ctx.fillText("LEVEL "+game.level, 150, 180);
          ctx.font = "24px Arial";
          ctx.fillText("Get ready!", 210, 240);
        }
      }
    },
    { // INLEVEL
      render: function() {
        game.time.render();
      }
    },
    { // ENDLEVEL
      text: "",
      subText: "",
      textX: 0,
      subTextX: 0,
      timer: null,
      load: function() {
        let totalSecLeft = game.time.getTotalSecLeft();
        if (game.time.getTotalSecLeft() > 0) {
          let totalSecAtStart = game.time.startMin*60 + game.time.startSec;
          let totalSecTaken = totalSecAtStart - totalSecLeft;
          let minTaken = Math.floor(totalSecTaken/60);
          let secTaken = totalSecTaken%60;
          if (secTaken < 10) secTaken = "0"+secTaken;
          seq_fanfare.play()
          this.text = "LEVEL CLEARED!";
          this.subText = "Time taken: " + minTaken + ":" + secTaken;
          this.textX = 50;
          this.subTextX = 185;
          if (game.level > 0) {
            game.level += 1;
          }
          game.btn.text = "NEXT LEVEL";
        } else {
          this.text = "GAME OVER!";
          this.subText = "You ran out of time!";
          this.textX = 100;
          this.subTextX = 180;
          game.btn.text = "TRY AGAIN";
        }
      },
      render: function() {
        ctx.font = "52px Arial";
        ctx.fillStyle = cursor.boldColor;
        ctx.fillText(this.text, this.textX, 150);
        ctx.font = "20px Arial";
        ctx.fillText(this.subText, this.subTextX, 210);
        game.btn.render();
      }
    }
  ],
  reset: function() {
    this.time.reset();
    people.splice(0, people.length);
    routers.splice(0, routers.length);
    links.splice(0, links.length);
  },
  level: 0,
  levels: [
    { // LEVEL 1
      numRouters: 1,
      numPeople: 12,
      startMin: 1,
      startSec: 0
    },
    { // LEVEL 2
      numRouters: 2,
      numPeople: 14,
      startMin: 2,
      startSec: 0
    },
    { // LEVEL 3
      numRouters: 2,
      numPeople: 18,
      startMin: 3,
      startSec: 0
    },
    { // LEVEL 4
      numRouters: 3,
      numPeople: 20,
      startMin: 3,
      startSec: 45
    },
    { // LEVEL 5
      numRouters: 4,
      numPeople: 22,
      startMin: 4,
      startSec: 30
    },
    { // LEVEL 6 (BONUS???)
      numRouters: 5,
      numPeople: 24,
      startMin: 5,
      startSec: 0
    },
  ],
  load: function(level, state) {
    let routerSpawnFieldRatio = 0.5;
    let routerSpawnFieldRatioMin = 0.2;
    let routerSpawnFieldRatioMax = 0.7;
    let personSpawnFieldRatioMin = 0.05;
    let personSpawnFieldRatioMax = 0.85;
    let personalSpaceRatio = 2;
    
    this.state = state;
    if (state == this.states.TITLE) {
      this.level = level;
    }
    if (state != this.states.STARTLEVEL) {
      this.screens[state].load();
      return;
    }
    
    let isEndGame = level > this.levels.length;
    this.screens[state].load(isEndGame);
    if (!isEndGame) {
      let numRouters = 0;
      let numPeople = 0;
      let startMin = 0;
      let startSec = 0;
      if (level > 0) {
        game.level = level;
        numRouters = this.levels[level-1].numRouters;
        numPeople = this.levels[level-1].numPeople;
        startMin = this.levels[level-1].startMin;
        startSec = this.levels[level-1].startSec;
      } else {
        numRouters = NUM_ROUTERS;
        numPeople = NUM_PEOPLE;
        startMin = START_MIN;
        startSec = START_SEC;
      }
      game.time.startMin = startMin;
      game.time.startSec = startSec;
      
      while (routers.length < numRouters) {
        let x = Math.floor((Math.random() * (routerSpawnFieldRatioMax - routerSpawnFieldRatioMin) + routerSpawnFieldRatioMin) * canvasMaxWidth * canvasWidthRatio);
        let y = Math.floor((Math.random() * (routerSpawnFieldRatioMax - routerSpawnFieldRatioMin) + routerSpawnFieldRatioMin) * canvasMaxHeight * canvasWidthRatio);
        let isTooClose = false;    
        for (var i = 0; i < routers.length; i++) {
          if (Math.abs(routers[i].x - x) < canvasMaxWidth*canvasWidthRatio*routerSpawnFieldRatio/numRouters && Math.abs(routers[i].y - y) < canvasMaxHeight*canvasWidthRatio*routerSpawnFieldRatio/numRouters) {
            isTooClose = true;
            break;
          }
        }
        if (!isTooClose) {
          routers.push(router(x, y));
        }
      }

      let index = 0;
      if (numPeople % 2 == 1) { numPeople -= 1; }
      while (people.length < numPeople) {
        if (index >= LOVE_TYPES.length*2) { index = 0; }
        let loveTypeIndex = Math.floor(index / 2);
        let x = Math.floor((Math.random() * (personSpawnFieldRatioMax - personSpawnFieldRatioMin) + personSpawnFieldRatioMin) * canvasMaxWidth * canvasWidthRatio);
        let y = Math.floor((Math.random() * (personSpawnFieldRatioMax - personSpawnFieldRatioMin) + personSpawnFieldRatioMin) * canvasMaxHeight * canvasWidthRatio);
        let isTooClose = false;
        for (var i = 0; i < routers.length; i++) {
          if (Math.abs(routers[i].x - x) < PERSON_WIDTH*personalSpaceRatio && Math.abs(routers[i].y - y) < PERSON_HEIGHT*personalSpaceRatio) {
            isTooClose = true;
            break;
          }
        }
        if (isTooClose) continue;
        for (var i = 0; i < people.length; i++) {
          if (Math.abs(people[i].x - x) < PERSON_WIDTH*personalSpaceRatio && Math.abs(people[i].y - y) < PERSON_HEIGHT*personalSpaceRatio) {
            isTooClose = true;
            break;
          }
        }
        if (!isTooClose) {
          let newPerson = person(x, y, loveTypeIndex);
          if (newPerson.hasWifi()) {
            people.push(newPerson);
            index += 1;
          }
        }
      }
    }
  },
  endLevel: function() {
    window.clearTimeout(this.screens[this.state].screenTimer);
    this.screens[this.state].screenTimer = null;
    this.state = this.states.ENDLEVEL;
    this.screens[this.state].load();
    this.reset();
  }
};
game.load(START_LEVEL, START_STATE);

kontra.pointer.onDown(function(event, object) {
  //console.log(cursor.x + ' ' + cursor.y);
  if (game.state == game.states.INLEVEL) {
    for (var i = 0; i < people.length; i++) {
      if (people[i].collidesWithCursor()) {
        if (!people[i].hasWifi()) {
          seq_click.play()
          if (people[i].hasMatch() && !people[i].link.isPerfectMatch()) {
            people[i].link.destroy();
          }
          if (!cursor.isLinking()) {
            links.push(link(cursor, people[i]));
          } else {
            let entity = cursor.link.entity2;
            cursor.link.destroy(); // Destroy cursor-to-person link after person is matched
            if (people[i] != entity) {
              links.push(link(entity, people[i]));
            }
          }
        } else if (!cursor.isLinking()) {
          cursor.link.destroy();  // Destroy cursor-to-person link if person with phone is hit
        }
        return;
      }
    }
    if (cursor.isLinking()) {
      cursor.link.destroy();  // Destroy cursor-to-person link if no person is hit
    }
  } else {
    if (game.btn.collidesWithCursor()) {
      game.nextState();
    }
  }
});

// RESTART GAME
kontra.keys.bind('r', function() {
  game.reset();
  //game.screens[game.states.STARTLEVEL].load()
  game.load(game.level, game.states.STARTLEVEL);
})

// INSTANT WIN (for debugging)
kontra.keys.bind('z', function() {
  game.time.min = 0;
  game.time.sec = 0;
  game.endLevel();
})
kontra.keys.bind('x', function() {
  people.splice(0, people.length);
  window.setTimeout(function(){
    game.time.stop();
    if (game.time.getTotalSecLeft() == 0) {
      game.time.startMin = 999;
      game.time.min = 999;
    }
    game.endLevel();
  }, 1000);
})

// For debugging
DISPLAY_LOVE_TYPES = false;
kontra.keys.bind('t', function() {
  DISPLAY_LOVE_TYPES = !DISPLAY_LOVE_TYPES;
});

var loop = kontra.gameLoop({
  update: function() {
    if (cursor.isInCanvas) {
      cursor.x = kontra.pointer.x * canvasWidthRatio;
      cursor.y = kontra.pointer.y * canvasWidthRatio;
    }
    if (game.state == game.states.INLEVEL) {
      let numBoostLove = 0;
      for (var i = 0; i < links.length; i++) {
        if (links[i].isPerfectMatch()) {
          if (links[i].collidesWithCursor()) {
            links[i].boostLove.start();
            numBoostLove++;
          } else {
            links[i].boostLove.stop();
          }
        }
      }
      cursor.numBoostLove = numBoostLove;
      if (numBoostLove == 0) {
        // Only can drain wifi when not boosting love
        for (var i = 0; i < routers.length; i++) {
          if (routers[i].collidesWithCursor()) {
            routers[i].drainWifi.start();
          } else {
            routers[i].drainWifi.stop();
          }
        }
      }
    }
  },
  render: function() {
    ctx.fillStyle = "darkgrey";
    ctx.fillRect(0, 0, 1000, 1000);
    for (var i = 0; i < routers.length; i++) {
      routers[i].render()
    }
    for (var i = 0; i < people.length; i++) {
      people[i].render();
    }
    for (var i = 0; i < links.length; i++) {
      links[i].render();
    }
    for (var i = 0; i < routers.length; i++) {
      routers[i].drawStats();
    }
    game.screen.render();
    if (cursor.isInCanvas) {
      cursor.render();
    }
  }
});

loop.start();
when = ac.currentTime;
seq_melody.play(when);
seq_bass.play(when + ( 60 / tempo ) * 1 );
