kontra.init();

kontra.assets.imagePath = "assets/images";

var ROUTER_WIDTH = 20;
var PERSON_WIDTH = 20;
var PERSON_HEIGHT = 40;

// Change this to make the game easier/harder!
var NUM_ROUTERS = 4;
var NUM_PEOPLE = 24;

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
  fullColor: 'magenta',
  width: 10,
  height: 10,
  radius: 5,
  wifiDrain: 20,
  hypnoPower: 10,
  isInCanvas: false,
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
  }
});

var link = function(entity1, entity2) {
  return kontra.sprite({
    entity1: entity1,
    entity2: entity2,
    linkColor: cursor.color,
    matchLevel: 0,
    maxMatchLevel: 100,
    matchScore: 0,
    matchPenaltyMultiplier: 1.5,
    scorePenalty: 7,
    scorePenaltyMultiplier: 1.2,
    successEvent: null,
    isMatch: function() {
      return this.matchLevel != 0;
    },
    updateState: function() {
      if (this.entity1.isFullyHypnotized() && this.entity2.isFullyHypnotized()) {
        this.entity1.hypnoColor = cursor.fullColor;
        this.entity2.hypnoColor = cursor.fullColor;
        this.linkColor = cursor.fullColor;
        this.success();
      }
    },
    render: function() {
      this.context.strokeStyle = this.linkColor
      this.context.beginPath();
      this.context.moveTo(this.entity1.cx(), this.entity1.cy());
      this.context.lineTo(this.entity2.cx(), this.entity2.cy());
      this.context.stroke();
    },
    drawStats: function() {
      if (this.isMatch()) {
        ctx.font = "11px Arial";
        ctx.fillStyle = entity1.hypnoColor;
        ctx.fillText(this.entity1.hypnoLevel+"%", parseInt(this.entity1.x-this.entity1.radiusX*0.15), parseInt(this.entity1.y-this.entity1.radiusY*0.3));
        ctx.fillStyle = entity2.hypnoColor;
        ctx.fillText(this.entity2.hypnoLevel+"%", parseInt(this.entity2.x-this.entity2.radiusX*0.15), parseInt(this.entity2.y-this.entity2.radiusY*0.3));
        this.entity1.drawLoveType();
        this.entity2.drawLoveType();
      }
    },
    success: function() {
      var self = this;
      gameMaster.score.addScore(this.matchScore);
      this.successEvent = window.setTimeout(function(){ 
        let entity1 = self.entity1;
        let entity2 = self.entity2;
        self.destroy(); 
        entity1.destroy();
        entity2.destroy();  
        if (people.length == 0) {
          gameMaster.time.stop();
          gameMaster.isGameOver = true;
        }
        self.successEvent = null;
      }, 1000);
    },
    init: function() {
      entity1.link = this;
      entity2.link = this;
      if (entity1.typeId != CURSOR_TYPE) {
        let typeDiff = Math.abs(this.entity1.typeId - this.entity2.typeId);
        let typeDiffPenalty = Math.min(typeDiff, LOVE_TYPES.length-typeDiff);
        let matchPenalty = Math.min(typeDiffPenalty, LOVE_TYPES.length-typeDiffPenalty) * this.maxMatchLevel / LOVE_TYPES.length;
        this.matchLevel = Math.ceil(this.maxMatchLevel - matchPenalty * this.matchPenaltyMultiplier);
        this.matchScore = Math.ceil(this.maxMatchLevel - this.scorePenalty * typeDiffPenalty * this.scorePenaltyMultiplier);
        if (this.matchScore == this.matchLevel) {
          this.matchScore *= 1.5  // bonus score for perfect match
        }
        entity1.hypnoLevel = this.matchLevel;
        entity2.hypnoLevel = this.matchLevel;
        this.updateState();
      }
      return this;
    },
    destroy: function() {
      let linkIndex = links.indexOf(this);
      links.splice(linkIndex, 1);
      if (this.isMatch()) {
        entity1.hypnoLevel = 0;
        entity1.hypnoColor = cursor.color;
      }
      entity2.hypnoLevel = 0;
      entity2.hypnoColor = cursor.color;
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
    color: 'slategrey',
    width: ROUTER_WIDTH,
    height: ROUTER_WIDTH,
    radius: 10,
    wifiPower: 100,
    maxWifiPower: 100,
    wifiRange: kontra.sprite({
      color: 'turquoise',
      radius: 200,
      render: function() {
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 2;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
      }
    }),
    cx: function() {
      return this.x + this.radius;
    },
    cy: function() {
      return this.y + this.radius;
    },
    isWifiDown: function() {
      return this.recoverWifi.timer == null;
    },
    collidesWithCursor: function() {
      let dx = cursor.cx() - this.cx();
      let dy = cursor.cy() - this.cy();
      return Math.abs(dx) <= this.radius && Math.abs(dy) <= this.radius;
    },
    isHit: function() {
      if (this.collidesWithCursor() && this.wifiPower > 0) {
        this.wifiPower -= cursor.wifiDrain;
        if (this.wifiPower <= 0) {
          this.wifiPower = 0;
          this.recoverWifi.stop();
          this.restartWifi.start();
        }
        return true;
      }
      return false;
    },
    drawStats: function() {
      ctx.font = "11px Arial";
      ctx.fillStyle = "turquoise";
      ctx.fillText(this.wifiPower, parseInt(this.x), parseInt(this.y-this.radius/3));
      if (this.isWifiDown()) {
        ctx.font = "11px Arial";
        ctx.fillStyle = "orange";
        ctx.fillText(this.restartWifi.wifiDowntimeLeft, parseInt(this.x+this.width*1.2), parseInt(this.y+this.height*0.8));
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
        if (this.parent.wifiPower < this.parent.maxWifiPower) {
          this.parent.wifiPower += 1;
        }
      },
      stop: function() {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    },
    restartWifi: {
      timer: null,
      wifiDowntimeLeft: 0,
      restartDuration: 15,
      start: function() {
        var self = this;
        this.wifiDowntimeLeft = this.restartDuration;
        this.timer = window.setInterval(function(){ self.run(); }, 1000);
        for (var i = 0; i < people.length; i++) {
          let thisPerson = people[i];
          if (thisPerson.hasMatch() && !thisPerson.hasWifi() && thisPerson.breakHypno.timer != null) {
            thisPerson.breakHypno.stop();
          }
        };
      },
      run: function() {
        this.wifiDowntimeLeft -= 1;
        if (this.wifiDowntimeLeft == 0) {
          this.parent.recoverWifi.start();
          this.stop();
        }
      },
      stop: function() {
        window.clearInterval(this.timer);
        this.timer = null;
        if (cursor.isLinking() && cursor.link.entity2.hasWifi()) {
          cursor.link.destroy();
        }
        for (var i = 0; i < people.length; i++) {
          let thisPerson = people[i];
          if (thisPerson.hasMatch() && thisPerson.hasWifi() && !thisPerson.isFullyHypnotized() && thisPerson.breakHypno.timer == null) {
            thisPerson.breakHypno.start();
          }
        };
      }
    },
    render: function() {
      this.draw();
      if (!this.isWifiDown()) {
        this.wifiRange.render();
      }
    },
    init: function() {
      this.recoverWifi.parent = this;
      this.restartWifi.parent = this;
      this.wifiRange.x = this.cx();
      this.wifiRange.y = this.cy();
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
    hypnoColor: cursor.color,
    width: PERSON_WIDTH,
    height: PERSON_HEIGHT,
    radiusX: 10,
    radiusY: 20,
    hypnoLevel: 0,
    maxHypnoLevel: 100,
    phone: kontra.sprite({
      color: 'black',
      width: 10,
      height: 18,
      render: function() {
        this.draw();
        this.context.fillStyle = 'lightgrey';
        this.context.fillRect(this.x+1, this.y+2, this.width-2, this.height-4);
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
    isFullyHypnotized: function() {
      return this.hypnoLevel == this.maxHypnoLevel;
    },
    hasMatch: function() {
      return this.isHypnotized() && this.link.isMatch();
    },
    collidesWithCursor: function() {
      let dx = cursor.cx() - this.cx();
      let dy = cursor.cy() - this.cy();
      return Math.abs(dx) <= this.radiusX && Math.abs(dy) <= this.radiusY;
    },
    isHit: function() {
      if (this.collidesWithCursor()) {
        if (this.hasMatch() && this.hypnoLevel < this.maxHypnoLevel) {
          this.hypnoLevel += Math.min(cursor.hypnoPower, this.maxHypnoLevel - this.hypnoLevel);
          if (this.isFullyHypnotized()) {
            this.hypnoColor = cursor.fullColor;
            if (this.breakHypno.timer != null) { this.breakHypno.stop(); }
            this.link.updateState();
          }
        } else if (!this.hasWifi() && !this.isHypnotized()) {
          if (!cursor.isLinking()) {
            links.push(link(cursor, this));
          } else {
            let entity = cursor.link.entity2;
            cursor.link.destroy();
            links.push(link(entity, this));
          }
        } else {
          return false;
        }
        return true;
      }
      return false;
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
        if (dist <= wifiRange.radius) {
          return true;
        }
      }
      return false;
    },
    breakHypno: {
      timer: null,
      breakInterval: 50,
      start: function() {
        var self = this;
        this.timer = window.setInterval(function(){ self.run(); }, this.breakInterval);
      },
      run: function() {
        if (this.parent.hypnoLevel == 0) {
          this.stop();
          if (this.parent.link != null) {
            this.parent.link.destroy();
          }
        } else {
          this.parent.hypnoLevel -= 1
        }
      },
      stop: function() {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    },
    render: function() {
      this.draw();
      if (this.hasWifi() && !this.isHypnotized()) {
        this.phone.render();
      }
      if (this.isHypnotized()) {
        this.context.strokeStyle = this.hypnoColor;
        this.context.lineWidth = 3;
        this.context.strokeRect(this.x-1, this.y-1, this.width+2, this.height+2);
      }
      if (DISPLAY_LOVE_TYPES) {
        this.drawLoveType();
      }
    },
    drawLoveType: function() {
      let loveType = LOVE_TYPES[this.typeId];
      ctx.font = "18px Courier";
      ctx.fillStyle = loveType.color;
      ctx.fillText(loveType.symbol, this.x+this.radiusX*0.15, this.cy()+this.radiusX*0.6);
    },
    init: function() {
      this.phone.x = this.x + this.width*0.75;
      this.phone.y = this.y + this.height*0.25;
      this.breakHypno.parent = this;
      return this;
    },
    destroy: function() {
      let personIndex = people.indexOf(this);
      people.splice(personIndex, 1);
    }
  }).init();
};
var people = []

kontra.pointer.onDown(function(event, object) {
  //console.log(cursor.x + ' ' + cursor.y);
  if (!gameMaster.isGameOver) {
    for (var i = 0; i < routers.length; i++) {
      if (routers[i].isHit()) {
        if (cursor.isLinking()) {
          cursor.link.destroy();
        }
        return;
      }
    }
    for (var i = 0; i < people.length; i++) {
      if (people[i].isHit()) {
        if (people[i].hasMatch() && cursor.isLinking()) {
          cursor.link.destroy();  // Destroy cursor-to-person link after person is matched
        }
        return;
      }
    }
    if (cursor.isLinking()) {
      cursor.link.destroy();  // Destroy cursor-to-person link if nothing is hit
    }
  }
});

// for debugging
SPAWN_ROUTERS = true;
RANDOM_SPAWN = true;

var gameMaster = {
  isGameOver: false,
  score: {
    value: 0,
    newScores: [],
    addScoreEvent: null,
    addScore: function(newScore) {
      var self = this;
      this.newScores.push(newScore);
      this.addScoreEvent = window.setTimeout(function() {
        self.value += newScore;
        self.newScores.splice(0,1);
        self.addScoreEvent = null;
      }, 1000);
    },
    render: function() {
      ctx.font = "14px Arial";
      ctx.fillStyle = 'black';
      ctx.fillText(this.value, 8, 16);
      if (this.newScores.length > 0) {
        ctx.fillStyle = cursor.fullColor;
        ctx.fillText("+"+this.newScores.reduce(function(total,num){ return total+num; }), 8, 32);
      }
    },
    reset: function() {
      this.value = 0;
      this.newScores = [];
      window.clearTimeout(this.addScoreEvent);
    }
  },
  time: {
    min: 0,
    sec: 0,
    startMin: 4,
    startSec: 0,
    timer: null,
    init: function() {
      this.min = this.startMin;
      this.sec = this.startSec;
      var self = this;
      this.timer = window.setInterval(function(){
        if (self.sec == 0) {
          if (self.min == 0) {
            gameMaster.isGameOver = true;
            self.stop();
          } else {
            self.min -= 1;
            self.sec = 59;
          }
        } else {
          self.sec -= 1;
        }
      }, 1000);
      return this;
    },
    stop: function() {
      window.clearInterval(this.timer);
      this.timer = null;
    },
    getTimeBonus: function() {
      return (this.min*60 + this.sec)*2.5;
    },
    render: function() {
      ctx.fillStyle = 'black'
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
      this.init();
    }
  }.init(),
  winScreen: {
    render: function() {
      let timeBonus = gameMaster.time.getTimeBonus();
      let gameText = "";
      if (timeBonus > 0) {
        gameText = "YOU WIN!";
      } else {
        gameText = "TIME'S UP!";
      }
      ctx.font = "48px Arial";
      ctx.fillStyle = cursor.fullColor;
      ctx.fillText(gameText, 150, 120);
      ctx.font = "16px Arial";
      ctx.fillText("TIME BONUS: "+timeBonus, 200, 185);
      ctx.font = "36px Arial";
      ctx.fillText("FINAL SCORE: "+(parseInt(gameMaster.score.value)+parseInt(timeBonus)), 110, 240);
    }
  },
  load: function() {
    this.isGameOver = false;
    this.score.reset();
    this.time.reset();
    for (var i = 0; i < links.length; i++) {
      if (links[i].successEvent != null) {
        window.clearInterval(links[i].successEvent);
        links[i].successEvent = null;
      }
    }    
    people.splice(0, people.length)
    routers.splice(0, routers.length)
    links.splice(0, links.length)
    if (RANDOM_SPAWN) {
      let routerSpawnFieldRatio = 0.5;
      let routerSpawnFieldRatioMin = 0.2;
      let routerSpawnFieldRatioMax = 0.7;
      let personSpawnFieldRatioMin = 0.05;
      let personSpawnFieldRatioMax = 0.85;
      let personalSpaceRatio = 1.5;

      if (SPAWN_ROUTERS) {
        while (routers.length < NUM_ROUTERS) {
          let x = Math.floor((Math.random() * (routerSpawnFieldRatioMax - routerSpawnFieldRatioMin) + routerSpawnFieldRatioMin) * canvasMaxWidth * canvasWidthRatio);
          let y = Math.floor((Math.random() * (routerSpawnFieldRatioMax - routerSpawnFieldRatioMin) + routerSpawnFieldRatioMin) * canvasMaxHeight * canvasWidthRatio);
          let isTooClose = false;    
          for (var i = 0; i < routers.length; i++) {
            if (Math.abs(routers[i].x - x) < canvasMaxWidth*canvasWidthRatio*routerSpawnFieldRatio/NUM_ROUTERS && Math.abs(routers[i].y - y) < canvasMaxHeight*canvasWidthRatio*routerSpawnFieldRatio/NUM_ROUTERS) {
              isTooClose = true;
              break;
            }
          }
          if (!isTooClose) {
            routers.push(router(x, y));
          }
        }
      }

      let index = 0;
      if (NUM_PEOPLE % 2 == 1) { NUM_PEOPLE -= 1; }
      while (people.length < NUM_PEOPLE) {
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
    } else {
      if (SPAWN_ROUTERS) {
        routers.push(router(150, 150));
        routers.push(router(250, 280));
      }
      people.push(person(70, 100, 0));
      people.push(person(120, 280, 3));
      people.push(person(300, 150, 6));
      people.push(person(225, 38, 9));
      people.push(person(400, 50, 0));
      people.push(person(330, 330, 3));
      people.push(person(420, 240, 6));
      people.push(person(175, 230, 9));
    }
    return this;
  }
}.load();

// RESTART GAME
kontra.keys.bind('r', function() {
  gameMaster.load();
})

// INSTANT WIN (for debugging)
kontra.keys.bind('z', function() {
  gameMaster.time.min = 0;
  gameMaster.time.sec = 0;
})
kontra.keys.bind('x', function() {
  people.splice(0, people.length);
  gameMaster.score.addScore(400);
  window.setTimeout(function(){
    gameMaster.time.stop();
    gameMaster.isGameOver = true;
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
  },
  render: function() {
    for (var i = 0; i < routers.length; i++) {
      routers[i].render()
    }
    for (var i = 0; i < people.length; i++) {
      people[i].render();
    }
    for (var i = 0; i < links.length; i++) {
      links[i].render();
      links[i].drawStats();
    }
    for (var i = 0; i < routers.length; i++) {
      routers[i].drawStats();
    }
    if (cursor.isInCanvas) {
      cursor.render();
    }
    if (!gameMaster.isGameOver) {
      gameMaster.score.render();
      gameMaster.time.render();
    } else {
      gameMaster.winScreen.render();
    }
  }
});

loop.start();