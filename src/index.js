class MapListeners { 
	constructor() {
		this.m = {};
	}

	add(listener, event) {
		if (this.m.hasOwnProperty(event)) {
			this.m[event].push(listener);
		} else {
			this.m[event] = [];
			this.m[event].push(listener);
		}
	}

	remove(listener, event) {
	  if (this.m.hasOwnProperty(event)) {
	    this.m[event].forEach(l => {
	    	if (l === listener) {
	        this.m[event].splice(this.m[event].indexOf(listener), 1);
	        if (Object.keys(this.m[event]).length == 0) {
	          delete this.m[event];
	        }
	      }
	    });
  	}
	}

	get() {
		return this.m;
	}
}

class Model {
	constructor() {
		this.mapList = new MapListeners();
		this.dataX = [];
		this.dataO = [];
		this.player = 'X';
		this.stepCount = 0;
		this.stateWin = false;
		this.windCombinations = [
	  	[1,2,3],
	  	[1,4,7],
	  	[1,5,9],
	  	[2,5,8],
	  	[3,6,9],
	  	[3,5,7],
	  	[4,5,6],
	  	[7,8,9]
		];
	}

	addStep(ceil, num) {
		if (!ceil.textContent) {
			this.player === 'X' ? this.dataX.push(num) : this.dataO.push(num);
			this.stepCount++;
		}

		if ((this.dataX.length > 2 || this.dataO.length > 2) && (this.checkWin(this.dataX, num) || this.checkWin(this.dataO, num))) {
			this.stateWin = true;
		}
	}

	checkWin(dataArr, num) {
		for (var i = 0; i < this.windCombinations.length; i++) {
			var someWinArr = this.windCombinations[i];
			var count = 0;

			if (someWinArr.indexOf(num) !== -1) {
				for (var j = 0; j < someWinArr.length; j++) {
					if (dataArr.indexOf(someWinArr[j]) !== -1) {
						count++;
						if (count === 3) {
							return true;
						}
					}
				}
			}

			count = 0;
		}
	}

	changePlayer() {
		this.player === 'X' ? (this.player = 'O') : (this.player = 'X');
	}

	reset() {
		this.dataX = [];
	  this.dataO = [];
		this.player = 'X';
	  this.stepCount = 0;
	  this.stateWin = false;
	}

	subscribe(listener, event) {
		this.mapList.add(listener, event);
	}

	uscribe(listener, event) {
		this.mapList.remove(listener, event);
	}

	notify(event, player, ceil, count, stateWin) {
    if (this.mapList.get()[event]) {
      this.mapList.get()[event].forEach(listener => {
        listener.update(player, ceil, count, stateWin);
      });
    }
  }
}

class View {
	constructor() {
		this.gameTitle = document.querySelector('#message');
		this.ceil = document.querySelectorAll('.game-item');
		this.notPress = function() {
			for (var i = 0; i < this.ceil.length; i++) {
				this.ceil[i].style.pointerEvents = 'none';
			}
		}
		this.yesPress = function() {
			for (var i = 0; i < this.ceil.length; i++) {
				this.ceil[i].innerText = '';
				this.ceil[i].style.pointerEvents = 'auto';
			}
		}
	}

	update(player, ceil, count, stateWin) {
		if (!ceil.textContent) {
  		ceil.innerText = player;
  		ceil.style.pointerEvents = 'none';
  	}

  	this.showGameTitle(player, count, stateWin);
  }

  showGameTitle(player, count, stateWin) {
  	if (stateWin) {
  		this.notPress();
			this.gameTitle.innerText = 'Победил игрок: ' + player;
  	} else {
  		var messagePlayer;
  		(player === 'X')  ? (messagePlayer = 'O') : (messagePlayer = 'X');
			(count === 9) ? (this.gameTitle.innerText = 'НИЧЬЯ') : (this.gameTitle.innerText = 'Ходит игрок: ' + messagePlayer);
  	}
  }

  resetGame() {
  	this.yesPress();
  	this.gameTitle.innerText = 'Ходит игрок: X';
  }
}

class Controller {
	constructor() {
		const model = new Model();
		const view  = new View();
		const ceil = document.querySelectorAll('.game-item');
		const buttonReset =  document.querySelector('#reset-game');
		model.subscribe(view, "changeData");

		for (var i = 0; i < ceil.length; i++) {
			ceil[i].addEventListener('click', ceilClickHandler);
		}

  	function ceilClickHandler() {
  		model.addStep(this, +this.getAttribute('data-ceil'));
  		model.notify("changeData", model.player, this, model.stepCount, model.stateWin);
  		model.changePlayer();
  	}

  	buttonReset.addEventListener('click', resetClickHandler);

  	function resetClickHandler() {
  		view.resetGame();
  		model.reset();
  	}
	}
}

(function() {
  var controller = new Controller();
}());