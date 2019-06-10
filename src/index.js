class Model {
	constructor() {
		this.dataX = [];
		this.dataO = [];
		this.player = 'X';
		this.stepCount = 0;
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

		this.ceil = document.querySelectorAll('.game-item'); // потом удалить
	}

	addStep(ceil, num) {
		if (!ceil.textContent) {
			this.player === 'X' ? this.dataX.push(num) : this.dataO.push(num);
			this.stepCount++;
			ceil.style.pointerEvents = 'none';
		}

		/*переписать этот блок ~ попробовать решить проблему с помощью паттерна наблюдатель*/
		if ((this.dataX.length > 2 || this.dataO.length > 2) && (this.checkWin(this.dataX, num) || this.checkWin(this.dataO, num))) {
			for (var i = 0; i < this.ceil.length; i++) {
				this.ceil[i].style.pointerEvents = 'none';
			}

			return true;
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
	}
}

class View {
	constructor() {
		this.gameTitle = document.querySelector('#message');
	}

	fillCeil(ceil, player, stepCount) {	
		if (!ceil.textContent) {
			ceil.innerText = player;
			this.changeGameTitle(stepCount, player);
		}
	}

	showWin(player) {
		var gameTitle;
		(player === 'X')  ? (gameTitle = 'O') : (gameTitle = 'X');
		this.gameTitle.innerText = 'Победил игрок: ' + gameTitle;
	}

	// сделать более универальным
	changeGameTitle(stepCount, player) {
		var gameTitle;
		(player === 'X')  ? (gameTitle = 'O') : (gameTitle = 'X');
		(stepCount === 9) ? (message.innerText = 'НИЧЬЯ') : (message.innerText = 'Ходит игрок: ' + gameTitle);
	}

	// избавиться
	setInintState(player) {
		message.innerText = 'Ходит игрок: ' + player;
	}
}

class Controller {
	constructor() {
		var model = new Model();
		var view = new View();
		this.ceil = document.querySelectorAll('.game-item');
		this.buttonReset = document.querySelector('#reset-game');

		for (var i = 0; i < this.ceil.length; i++) {
			this.ceil[i].addEventListener('click', ceilClickHandler);
		}

		function ceilClickHandler() {
			var result = model.addStep(this, +this.getAttribute('data-ceil'));
			view.fillCeil(this, model.player, model.stepCount);
			model.changePlayer(this);

			if (result) {
				view.showWin(model.player);
			}
		}

		this.buttonReset.addEventListener('click', reset);

		function reset() {
			for (var i=0; i < controller.ceil.length; i++) {
				controller.ceil[i].innerText = '';
				controller.ceil[i].style.pointerEvents = 'auto';
			}

			model.reset();
			view.setInintState(model.player);
		}
	}
}

var controller = new Controller; 


// не могу получить данные при изменнеии игрока (наблюдат) +
// надо, чтобы в контроллере получали и виду отдавали + 
// придумать как передавать элемент на который нажали ceil[i] +
// отрефакторить код + 
// добавить счётчик игроков + 
// при каждом нажатии счётчик увеличивается и проверяется + (наблюд)
// сделать так, чтобы повторно нельзя было нажимать на кнопку +
// помле нажатия надо удалить спососбность нажатия + 
// начинать делать проверку на выйгрыш +
// наблюдатель при выйгрыше должно приходить оповещение контроллеру (обновление) -
// написать очистку игры+
