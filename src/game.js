kontra.init();

kontra.assets.imagePath = "assets/images";
/*kontra.assets.load("player.png").then(function() {
  window.player = kontra.sprite({
    x: 100,
    y: 100,
    image: kontra.assets.images.player
  });
})*/

var CURSOR_TYPE = -1;
var SPADE_TYPE = 0;
var CLUB_TYPE = 1;
var DIAMOND_TYPE = 3;
var HEART_TYPE = 4;
var NUMBER_OF_LOVE_TYPES = 4;

var love_type = function(symbol, color) {
  return {
    symbol: symbol,
    color: color
  };
}
// Think of this as a circular list
// The compability of two love types are relative to how close they are in the list
var LOVE_TYPES = []
LOVE_TYPES.push(love_type('\u2660', 'black')); // spade
LOVE_TYPES.push(love_type('\u2663', 'black')); // club
LOVE_TYPES.push(null); // filler
LOVE_TYPES.push(love_type('\u2666', 'red')); // diamond
LOVE_TYPES.push(love_type('\u2665', 'red')); // heart
LOVE_TYPES.push(null); // filler

var cursor = kontra.sprite({
  x: -100,
  y: -100,
  type: CURSOR_TYPE,
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
    scorePenalty: 10,
    scorePenaltyFactor: 1,
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
        ctx.font = "20px Courier";
        ctx.fillStyle = LOVE_TYPES[entity1.type].color;
        ctx.fillText(LOVE_TYPES[entity1.type].symbol, this.entity1.x+this.entity1.radiusX*0.35, this.entity1.cy()+this.entity1.radiusX*0.3);
        ctx.fillStyle = LOVE_TYPES[entity2.type].color;
        ctx.fillText(LOVE_TYPES[entity2.type].symbol, this.entity2.x+this.entity2.radiusX*0.35, this.entity2.cy()+this.entity2.radiusX*0.3);
      }
    },
    success: function() {
      var self = this;
      let matchScore = self.maxMatchLevel - self.scorePenalty*self.scorePenaltyFactor;
      gameMaster.score.addScore(matchScore);
      window.setTimeout(function(){ 
        let entity1 = self.entity1;
        let entity2 = self.entity2;
        self.destroy(); 
        entity1.destroy();
        entity2.destroy();  
        if (people.length == 0) {
          gameMaster.gameTime.stop();
          gameMaster.gameOver = true;
        }  
      }, 1000)
    },
    init: function() {
      entity1.link = this;
      entity2.link = this;
      if (entity1.type != CURSOR_TYPE) {
        let typeDiff = Math.abs(this.entity1.type - this.entity2.type);
        this.scorePenaltyFactor = Math.min(typeDiff, LOVE_TYPES.length-typeDiff);
        let matchLevelPenalty = Math.min(this.scorePenaltyFactor, LOVE_TYPES.length-this.scorePenaltyFactor) * this.maxMatchLevel / NUMBER_OF_LOVE_TYPES;
        this.matchLevel = this.maxMatchLevel - matchLevelPenalty;
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
    color: 'blue',
    width: 20,
    height: 20,
    radius: 10,
    wifiPower: 100,
    maxWifiPower: 100,
    wifiRange: kontra.sprite({
      color: 'cyan',
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
      ctx.fillStyle = "cyan";
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
      restartDuration: 10,
      start: function() {
        var self = this;
        this.wifiDowntimeLeft = this.restartDuration;
        this.timer = window.setInterval(function(){ self.run(); }, 1000);
        for (var i = 0; i < people.length; i++) {
          let person = people[i];
          if (person.hasMatch() && !person.hasWifi() && person.breakHypno.timer != null) {
            person.breakHypno.stop();
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
          let person = people[i];
          if (person.hasMatch() && person.hasWifi() && !person.isFullyHypnotized() && person.breakHypno.timer == null) {
            person.breakHypno.start();
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
routers.push(router(150, 150));
routers.push(router(250, 280));

var person = function(x, y, type) {
  return kontra.sprite({
    x: x,
    y: y,
    type: type,
    color: 'limegreen',
    hypnoColor: cursor.color,
    width: 20,
    height: 40,
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
people.push(person(70, 100, SPADE_TYPE));
people.push(person(120, 280, CLUB_TYPE));
people.push(person(300, 150, DIAMOND_TYPE));
people.push(person(225, 38, HEART_TYPE));
people.push(person(400, 50, SPADE_TYPE));
people.push(person(330, 330, CLUB_TYPE));
people.push(person(420, 240, DIAMOND_TYPE));
people.push(person(175, 230, HEART_TYPE));

kontra.pointer.onDown(function(event, object) {
  if (!gameMaster.gameOver) {
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

var gameMaster = {
  score: {
    value: 0,
    newScores: [],
    addScore: function(newScore) {
      var self = this;
      this.newScores.push(newScore);
      window.setTimeout(function() {
        self.value += newScore;
        self.newScores.splice(0,1);
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
    }
  },
  gameTime: {
    min: 2,
    sec: 0,
    timer: null,
    init: function() {
      var self = this;
      this.timer = window.setInterval(function(){
        if (self.sec == 0) {
          if (self.min == 0) {
            gameMaster.gameOver = true;
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
      return (this.min*60 + this.sec)*2;
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
    }
  }.init(),
  winScreen: {
    render: function() {
      let timeBonus = gameMaster.gameTime.getTimeBonus();
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
  gameOver: false
}

// INSTANT WIN (for debugging)
kontra.keys.bind('z', function() {
  gameMaster.gameTime.min = 0;
  gameMaster.gameTime.sec = 0;
})
kontra.keys.bind('x', function() {
  people.splice(0, people.length);
  gameMaster.score.addScore(400);
  window.setTimeout(function(){
    gameMaster.gameTime.stop();
    gameMaster.gameOver = true;
  }, 1000);
})

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
    if (!gameMaster.gameOver) {
      gameMaster.score.render();
      gameMaster.gameTime.render();
    } else {
      gameMaster.winScreen.render();
    }
  }
});

loop.start();