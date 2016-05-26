/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var LittleZeus = __webpack_require__(1);
	var GameTime = __webpack_require__(4);
	var Start = __webpack_require__(16);
	var StartGame = new Start(canvas, context);
	var Zeus = new LittleZeus(context, canvas);
	var Game = new GameTime(Zeus);

	var img = new Image();
	img.src = './images/sky.jpg';

	requestAnimationFrame(function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  context.drawImage(img, 0, 0);
	  if (StartGame.draw()) {
	    Game.run(Zeus);
	  }
	  requestAnimationFrame(gameLoop);
	});

	canvas.addEventListener('keydown', function (event) {
	  var keyCode = event.keyCode;
	  Game.move(Zeus, keyCode);
	});

	canvas.addEventListener('keyup', function (event) {
	  var keyCode = event.keyCode;
	  Game.fire(Zeus, keyCode);
	});

	canvas.addEventListener('click', function (event) {
	  if (Zeus.currentLevel === 'Game Over') {
	    Game.clicks(event, Zeus);
	  } else {
	    StartGame.clicks(event);
	  }
	}, false);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Toggle = __webpack_require__(2);
	var collision = __webpack_require__(3);

	function Zeus(context, canvas) {
	  this.toggle = new Toggle();
	  this.projectiles = [];
	  this.context = context;
	  this.canvas = canvas;
	  this.towers = [];
	  this.targets = [];
	  this.cannonBarrel = {};
	  this.currentLevel = 'One';
	  this.targetsHitScore = 0;
	  this.shotCount = 0;
	}

	Zeus.prototype.setCoordinates = function () {
	  var coords = this.cannonBarrel;
	  coords.toggle = this.toggle.y;
	  return coords;
	};

	Zeus.prototype.projectileFlysOutOfCanvas = function () {
	  var ball = this.projectiles[0] || nullBall();
	  var zeus = this;
	  if (ballGoesOffMap(ball)) {
	    ballCollides(zeus);
	    zeus.shotCount += 1;
	    return this;
	  }
	};

	Zeus.prototype.projectileCollidesWithTower = function () {
	  var ball = this.projectiles[0] || nullBall();
	  var zeus = this;
	  this.towers.forEach(function (tower) {
	    if (collision(ball, tower)) {
	      ballCollides(zeus);
	      zeus.shotCount += 1;
	    }
	  });
	  return this;
	};

	Zeus.prototype.projectileCollidesWithTarget = function () {
	  var ball = this.projectiles[0] || nullBall();
	  var zeus = this;
	  this.targets.forEach(function (target) {
	    if (collision(ball, target)) {
	      destroyTarget(zeus, target);
	      ballCollides(zeus);
	    }
	  });
	  return this;
	};

	Zeus.prototype.score = function () {
	  return this.targetsHitScore - this.shotCount;
	};

	function ballGoesOffMap(ball) {
	  return ballYGreaterThanCanvas(ball) || ballXGreaterThanCanvas(ball) || ballXLessThanCanvas(ball);
	}

	function ballYGreaterThanCanvas(ball) {
	  return ball.y > 800;
	}

	function ballXGreaterThanCanvas(ball) {
	  return ball.x > 800;
	}

	function ballXLessThanCanvas(ball) {
	  return ball.x < 0;
	}

	function ballCollides(Zeus) {
	  Zeus.toggle.pause = false;
	  Zeus.projectiles.pop();
	}

	function destroyTarget(Zeus, target) {
	  var index = Zeus.targets.indexOf(target);
	  Zeus.targetsHitScore += 10;
	  Zeus.targets.splice(index, 1);
	}

	function nullBall() {
	  return { x: 0, y: 0, width: 0, height: 0 };
	}

	module.exports = Zeus;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function Toggle() {
	  this.x = 5;
	  this.y = 10;
	  this.width = 20;
	  this.height = 5;
	  this.direction = 'down';
	  this.pause = false;
	}

	var directionChange = function directionChange(object) {
	  if (object.y === 200) {
	    object.direction = 'up';
	  } else if (object.y === 10) {
	    object.direction = 'down';
	  }
	};

	Toggle.prototype.draw = function (context) {
	  context.fillStyle = 'black';
	  context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Toggle.prototype.move = function () {
	  if (this.y <= 200 && this.direction === 'down' && !this.pause) {
	    directionChange(this);
	    return this.y++;
	  } else if (this.y >= 10 && this.direction === 'up' && !this.pause) {
	    directionChange(this);
	    return this.y--;
	  }
	};

	module.exports = Toggle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function collision(ball, target) {
	  return ballLeftInsideTargetRight(ball, target) && ballRightInsideTargetLeft(ball, target) && ballTopInsideTargetBottom(ball, target) && ballBottomInsideTargetTop(ball, target);
	}

	function ballLeftInsideTargetRight(ball, target) {
	  return ball.x <= target.x + target.width;
	}

	function ballRightInsideTargetLeft(ball, target) {
	  return ball.x + ball.width >= target.x;
	}

	function ballTopInsideTargetBottom(ball, target) {
	  return ball.y <= target.y + target.height;
	}

	function ballBottomInsideTargetTop(ball, target) {
	  return ball.y + ball.height >= target.y;
	}

	module.exports = collision;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var levelOne = __webpack_require__(5);
	var levelTwo = __webpack_require__(12);
	var levelThree = __webpack_require__(13);
	var Projectile = __webpack_require__(14);
	var GameOver = __webpack_require__(15);

	var GameOver = new GameOver();

	function Game() {}

	Game.prototype.run = function (Zeus) {
	  drawBackground(Zeus);
	  if (Zeus.currentLevel === 'One') {
	    levelOne(Zeus);
	  } else if (Zeus.currentLevel === 'Two') {
	    levelTwo(Zeus);
	  } else if (Zeus.currentLevel === 'Three') {
	    levelThree(Zeus);
	  } else if (Zeus.currentLevel === 'Game Over') {
	    GameOver.update(Zeus);
	    GameOver.draw(Zeus.score());
	  }
	  Zeus.projectiles.forEach(function (projectile) {
	    projectile.draw(Zeus.context).movement();
	    Zeus.projectileCollidesWithTarget().projectileCollidesWithTower().projectileFlysOutOfCanvas();
	  });
	};

	Game.prototype.move = function (Zeus, keyCode) {
	  if (keyCode === 38) {
	    Zeus.cannonBarrel.moveUp();
	  } else if (keyCode === 40) {
	    Zeus.cannonBarrel.moveDown();
	  }
	};

	Game.prototype.clicks = function (event, Zeus) {
	  GameOver.clicks(event, Zeus);
	};

	Game.prototype.fire = function (Zeus, keyCode) {
	  if (keyCode === 32 && Zeus.projectiles.length === 0) {
	    Zeus.toggle.pause = true;
	    Zeus.projectiles.push(new Projectile());
	    Zeus.projectiles.forEach(function (projectile) {
	      projectile.setPosition(Zeus.setCoordinates());
	    });
	  }
	};

	function drawBackground(Zeus) {
	  var context = Zeus.context;
	  context.font = "30px Verdana";
	  context.fillStyle = 'red';
	  var countAndLevel = Zeus.score() + " | Level: " + Zeus.currentLevel;
	  context.fillText(countAndLevel, 50, 50);
	  var img = new Image();
	  img.src = 'images/power_bar.png';
	  context.drawImage(img, 10, 10, 10, 200);
	}

	module.exports = Game;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CannonBase = __webpack_require__(6);
	var CannonBarrel = __webpack_require__(7);
	var Target = __webpack_require__(8);
	var createTowers = __webpack_require__(9);
	var levelOpener = __webpack_require__(11);

	var cannonBase = new CannonBase({ x: 30, y: 360 });
	var cannonBarrel = new CannonBarrel(cannonBase);
	var target1 = new Target({ x: 720, y: 360 });
	var target2 = new Target({ x: 720, y: 50 });
	var target3 = new Target({ x: 350, y: 200 });
	var target4 = new Target({ x: 100, y: 100 });
	var towers = createTowers('one');
	var targets = [target1, target2, target3, target4];

	function levelOne(Zeus) {
	  cannonBase.draw(Zeus.context);
	  Zeus.cannonBarrel = cannonBarrel;
	  Zeus.towers = towers;
	  Zeus.targets = targets;
	  cannonBarrel.draw(Zeus.context);
	  Zeus.toggle.draw(Zeus.context).move();
	  towers.forEach(function (tower) {
	    tower.draw(Zeus.context);
	  });
	  targets.forEach(function (target) {
	    target.draw(Zeus.context);
	  });

	  nextLevel(Zeus);
	}

	function nextLevel(Zeus) {
	  if (Zeus.targets.length === 0) {
	    levelOpener(Zeus.context, 'One');
	    setTimeout(function () {
	      Zeus.currentLevel = 'Two';
	    }, 1000);
	  }
	}

	module.exports = levelOne;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function CannonBase(options) {
	  this.options = options || {};
	  this.x = options.x;
	  this.y = options.y;
	  this.height = options.height || 40;
	  this.width = options.width || 40;
	}

	CannonBase.prototype.draw = function (context) {
	  context.fillStyle = '#556270';
	  context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	module.exports = CannonBase;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function CannonBarrel(cannon) {
	  this.x = cannon.x + 17;
	  this.y = cannon.y + 17;
	  this.width = 6;
	  this.height = 50;
	  this.angle = 0;
	  this.anglex = this.x + 50;
	  this.angley = this.y;
	  this.image = 'images/cannonbarrel.png';
	}

	CannonBarrel.prototype.draw = function (context) {
	  context.fillStyle = 'white';
	  context.stroke();
	  context.beginPath();
	  context.lineWidth = 10;
	  context.lineCap = "round";
	  context.moveTo(this.x, this.y);
	  context.lineTo(this.anglex, this.angley);
	  context.strokeStyle = 'black';
	  context.stroke();
	  return this;
	};

	var step = Math.PI / 180;

	CannonBarrel.prototype.moveUp = function () {
	  var x = this.x + 50 * Math.cos(this.angle += step);
	  var y = this.y - 50 * Math.sin(this.angle += step);
	  this.anglex = x;
	  this.angley = y;
	  return this;
	};

	CannonBarrel.prototype.moveDown = function () {
	  var x = this.x + 50 * Math.cos(this.angle -= step);
	  var y = this.y - 50 * Math.sin(this.angle -= step);
	  this.anglex = x;
	  this.angley = y;
	  return this;
	};

	module.exports = CannonBarrel;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	function Target(options) {
	  this.options = options || {};
	  this.x = options.x;
	  this.y = options.y;
	  this.height = options.height || 50;
	  this.width = options.width || 50;
	  this.image = options.image || 'images/target.png';
	  this.display = true;
	  this.direction = options.direction || '';
	  this.min = options.min || 0;
	  this.max = options.max || 0;
	}

	Target.prototype.draw = function (context) {
	  if (this.display) {
	    var image = new Image();
	    image.src = this.image;
	    context.drawImage(image, this.x, this.y, this.width, this.height);
	    return this;
	  }
	};

	Target.prototype.move = function () {
	  if (this.direction === 'up' || this.direction === 'down') {
	    return movementUpDown(this);
	  } else if (this.direction === 'left' || this.direction === 'right') {
	    return movementLeftRight(this);
	  }
	};

	function movementUpDown(target) {
	  if (target.y >= target.min - 1 && target.direction === 'down') {
	    directionUpDown(target);
	    return target.y++;
	  } else if (target.y <= target.max + 1 && target.direction === 'up') {
	    directionUpDown(target);
	    return target.y--;
	  }
	}

	function movementLeftRight(target) {
	  if (target.x <= target.max + 1 && target.direction === 'left') {
	    directionLeftRight(target);
	    return target.x--;
	  } else if (target.x >= target.min - 1 && target.direction === 'right') {
	    directionLeftRight(target);
	    return target.x++;
	  }
	}

	function directionUpDown(target) {
	  if (target.y === target.min) {
	    target.direction = 'down';
	  } else if (target.y === target.max) {
	    target.direction = 'up';
	  }
	}

	function directionLeftRight(target) {
	  if (target.x === target.max) {
	    target.direction = 'left';
	  } else if (target.x === target.min) {
	    target.direction = 'right';
	  }
	}

	module.exports = Target;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Tower = __webpack_require__(10);

	function createTowers(level) {
	  if (level === 'one') {
	    return levelOneTowers();
	  } else if (level === 'two') {
	    return levelTwoTowers();
	  } else if (level === 'three') {
	    return levelThreeTowers();
	  } else if (level === 'game over') {
	    // end of game montage
	  }
	}

	function levelOneTowers() {
	  var arrayOfTowers = makeArrayOfTowers(9, 400, 200);
	  var tower6 = new Tower({ x: 435, y: 200, height: 400 });
	  var tower9 = new Tower({ x: 690, y: 400, height: 200, width: 100 });
	  arrayOfTowers.splice(5, 1, tower6);
	  arrayOfTowers.splice(8, 1, tower9);
	  return arrayOfTowers;
	}

	function levelTwoTowers() {
	  var arrayOfTowers = makeArrayOfTowers(9, 400, 200);
	  var tower4 = new Tower({ x: 265, y: 200, height: 400 });
	  var tower6 = new Tower({ x: 435, y: 200, height: 400 });
	  var tower9 = new Tower({ x: 690, y: 400, height: 200, width: 100 });
	  arrayOfTowers.splice(3, 1, tower4);
	  arrayOfTowers.splice(5, 1, tower6);
	  arrayOfTowers.splice(8, 1, tower9);
	  return arrayOfTowers;
	}

	function levelThreeTowers() {
	  var arrayOfTowers = makeArrayOfTowers(9, 400, 200);
	  var tower4 = new Tower({ x: 265, y: 200, height: 400 });
	  var tower6 = new Tower({ x: 435, y: 200, height: 400 });
	  var tower8 = new Tower({ x: 605, y: 200, height: 400 });
	  var tower9 = new Tower({ x: 690, y: 400, height: 200, width: 100 });
	  arrayOfTowers.splice(3, 1, tower4);
	  arrayOfTowers.splice(5, 1, tower6);
	  arrayOfTowers.splice(7, 1, tower8);
	  arrayOfTowers.splice(8, 1, tower9);
	  return arrayOfTowers;
	}

	function makeArrayOfTowers(amount, y, height) {
	  var newArray = [];
	  var counter = 10;
	  for (var i = 0; i < amount; i++) {
	    newArray.push(new Tower({ x: counter, y: y, height: height }));
	    counter += 85;
	  }
	  return newArray;
	}
	module.exports = createTowers;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	function Tower(options) {
	  this.options = options || {};
	  this.x = options.x;
	  this.y = options.y;
	  this.height = options.height;
	  this.width = options.width || 80;
	  this.image = options.image || 'images/building1_crop.png';
	}

	Tower.prototype.draw = function (context) {
	  var img = new Image();
	  img.src = this.image;

	  context.drawImage(img, this.x, this.y, this.width, this.height);
	  return this;
	};

	module.exports = Tower;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	function levelOpener(context, level) {
	  context.fillStyle = 'red';
	  var completed = "Completed Level " + level + "!";
	  context.fillText(completed, 250, 150);
	}

	module.exports = levelOpener;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CannonBase = __webpack_require__(6);
	var CannonBarrel = __webpack_require__(7);
	var Target = __webpack_require__(8);
	var createTowers = __webpack_require__(9);
	var levelOpener = __webpack_require__(11);

	var cannonBase = new CannonBase({ x: 30, y: 360 });
	var cannonBarrel = new CannonBarrel(cannonBase);
	var target1 = new Target({ x: 720, y: 350 });
	var target2 = new Target({ x: 720, y: 50, direction: 'left', min: 300, max: 720 });
	var target3 = new Target({ x: 365, y: 350 });
	var towers = createTowers('two');
	var targets = [target1, target2, target3];

	function levelTwo(Zeus) {
	  cannonBase.draw(Zeus.context);
	  Zeus.cannonBarrel = cannonBarrel;
	  Zeus.towers = towers;
	  Zeus.targets = targets;
	  cannonBarrel.draw(Zeus.context);
	  Zeus.toggle.draw(Zeus.context).move();
	  towers.forEach(function (tower) {
	    tower.draw(Zeus.context);
	  });
	  targets.forEach(function (target) {
	    target.draw(Zeus.context).move();
	  });
	  nextLevel(Zeus);
	}

	function nextLevel(Zeus) {
	  if (Zeus.targets.length === 0) {
	    levelOpener(Zeus.context, 'Two');
	    setTimeout(function () {
	      Zeus.currentLevel = 'Three';
	    }, 1000);
	  }
	}

	module.exports = levelTwo;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CannonBase = __webpack_require__(6);
	var CannonBarrel = __webpack_require__(7);
	var Target = __webpack_require__(8);
	var createTowers = __webpack_require__(9);
	var levelOpener = __webpack_require__(11);

	var cannonBase = new CannonBase({ x: 30, y: 360 });
	var cannonBarrel = new CannonBarrel(cannonBase);
	var target1 = new Target({ x: 720, y: 350, direction: 'up', min: 200, max: 450 });
	var target2 = new Target({ x: 720, y: 50, direction: 'left', min: 300, max: 720 });
	var target3 = new Target({ x: 365, y: 350, direction: 'down', min: 200, max: 450 });
	var target4 = new Target({ x: 535, y: 210, direction: 'up', min: 200, max: 450 });
	var towers = createTowers('three');
	var targets = [target1, target2, target3, target4];

	function levelThree(Zeus) {
	  cannonBase.draw(Zeus.context);
	  Zeus.cannonBarrel = cannonBarrel;
	  Zeus.towers = towers;
	  Zeus.targets = targets;
	  cannonBarrel.draw(Zeus.context);
	  Zeus.toggle.draw(Zeus.context).move();
	  towers.forEach(function (tower) {
	    tower.draw(Zeus.context);
	  });
	  targets.forEach(function (target) {
	    target.draw(Zeus.context).move();
	  });
	  nextLevel(Zeus);
	}

	function nextLevel(Zeus) {
	  if (Zeus.targets.length === 0) {
	    levelOpener(Zeus.context, 'Three');
	    setTimeout(function () {
	      Zeus.currentLevel = 'Game Over';
	    }, 1000);
	  }
	}

	module.exports = levelThree;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	function Projectile() {
	  this.x = 0;
	  this.y = 0;
	  this.angle = 0;
	  this.width = 15;
	  this.height = 15;
	  this.xVel = 0;
	  this.yVel = 0;
	  this.g = 0;
	}

	Projectile.prototype.draw = function (context) {
	  var img = new Image();
	  img.src = 'images/cannonball.png';
	  context.drawImage(img, this.x, this.y, this.width, this.height);
	  return this;
	};

	Projectile.prototype.setPosition = function (coords) {
	  this.x = coords.anglex - 5;
	  this.y = coords.angley - 5;
	  this.xVel = coords.anglex - coords.x;
	  this.yVel = coords.angley - coords.y;
	  this.g = powerSetting(coords.toggle);
	};

	Projectile.prototype.movement = function () {
	  this.x += this.xVel / 3;
	  this.y += this.yVel / 3;
	  this.yVel += this.g;
	};

	function powerSetting(power) {
	  if (power <= 20) {
	    return 0.5;
	  } else if (20 < power && power <= 40) {
	    return 0.6;
	  } else if (40 < power && power <= 60) {
	    return 0.7;
	  } else if (60 < power && power <= 80) {
	    return 0.8;
	  } else if (80 < power && power <= 100) {
	    return 0.9;
	  } else if (100 < power && power <= 120) {
	    return 1.1;
	  } else if (120 < power && power <= 140) {
	    return 1.2;
	  } else if (140 < power && power <= 160) {
	    return 1.35;
	  } else if (160 < power && power <= 180) {
	    return 1.45;
	  } else if (180 < power && power <= 200) {
	    return 1.6;
	  }
	}

	module.exports = Projectile;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	function GameOver() {
	  this.canvas = {};
	  this.context = {};
	  this.elemLeft = {};
	  this.elemTop = {};
	  this.context = {};
	  this.element = {};
	}

	GameOver.prototype.update = function (Zeus) {
	  this.canvas = Zeus.canvas;
	  this.context = Zeus.context;

	  this.elemLeft = this.canvas.offsetLeft;
	  this.elemTop = this.canvas.offsetTop;
	  this.context = this.context;
	  this.start = false;
	  this.element = {
	    color: '#05EFFF',
	    width: 400,
	    height: 80,
	    top: 360,
	    left: 200
	  };
	};

	GameOver.prototype.draw = function (score) {
	  var img = new Image();
	  img.src = './images/sky.jpg';
	  var image = new Image();
	  image.src = './images/replay.png';
	  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  this.context.drawImage(img, 0, 0);
	  this.context.drawImage(image, this.element.left, this.element.top, this.element.width, this.element.height);
	  this.context.font = "60px Open Sans";
	  this.context.fillStyle = 'red';
	  this.context.fillText("Game Over!", 250, 250);
	  this.context.fillStyle = 'red';
	  var countAndLevel = "Your Score is " + score + "!";
	  this.context.fillText(countAndLevel, 180, 330);
	};

	GameOver.prototype.clicks = function (event, Zeus) {
	  var x = event.pageX - this.elemLeft;
	  var y = event.pageY - this.elemTop;

	  if (y > this.element.top && y < this.element.top + this.element.height && x > this.element.left && x < this.element.left + this.element.width) {
	    location.reload();
	  }
	};

	module.exports = GameOver;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	function StartGame(canvas, context) {
	  this.elemLeft = canvas.offsetLeft;
	  this.elemTop = canvas.offsetTop;
	  this.context = context;
	  this.start = false;
	  this.element = {
	    color: '#05EFFF',
	    width: 400,
	    height: 100,
	    top: 250,
	    left: 200
	  };
	}

	StartGame.prototype.clicks = function (event) {
	  var x = event.pageX - this.elemLeft;
	  var y = event.pageY - this.elemTop;

	  if (y > this.element.top && y < this.element.top + this.element.height && x > this.element.left && x < this.element.left + this.element.width) {
	    this.start = true;
	  }
	};

	var img = new Image();
	img.src = 'images/start-button.png';

	StartGame.prototype.draw = function () {
	  if (this.start === false) {
	    this.context.font = "110px Open Sans";
	    this.context.fillStyle = 'red';
	    this.context.fillText("Cannonz", 200, 175);
	    this.context.drawImage(img, this.element.left, this.element.top, this.element.width, this.element.height);
	  } else {
	    return this.start;
	  }
	};

	module.exports = StartGame;

/***/ }
/******/ ]);