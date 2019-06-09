class Model {
	constructor() {
		this.dataX = [];
		this.dataO = [];
		this.player = '';
		this.stepCount = 0;
	}

	addStep(ceil, num) {
		this.player === 'X' ? this.dataX.push(num) : this.dataO.push(num);

		if (!ceil.textContent) {
			this.stepCount++;
			this.changePlayer(ceil);
		}
	}

	changePlayer(ceil) {
		this.player === 'X' ? (this.player = 'O') : (this.player = 'X');
	}
}

class View {
	constructor() {
		this.gameTitle = document.querySelector('#message');
	}

	fillCeil(ceil, player) {	
		if (!ceil.textContent) {
			ceil.innerText = player;
		}
	}

	changeGameTitle(stepCount, player) {
		var titlePlayer;
		(player === 'X') ? (titlePlayer = 'O') : (titlePlayer = 'X');
		(stepCount === 9) ? (message.innerText = 'НИЧЬЯ') : (message.innerText = 'Ходит игрок: ' + titlePlayer);
	}
}

class Controller {
	constructor() {
		var model = new Model();
		var view = new View();
		this.ceil = document.querySelectorAll('.game-item');

		for (var i = 0; i < this.ceil.length; i++) {
			ceilClickHandler(this.ceil[i]);
		}

		function ceilClickHandler(ceil) {
			ceil.addEventListener('click', function() {
				model.addStep(ceil, +ceil.getAttribute('data-ceil'));
				view.fillCeil(ceil, model.player);
				view.changeGameTitle(model.stepCount, model.player);
			})
		}
	}
}

var controller = new Controller; 


// не могу получить данные при изменнеии игрока (наблюдат) +
// надо, чтобы в контроллере получали и виду отдавали + 
// придумать как передавать элемент на который нажали ceil[i] +
// отрефакторить код + 
// добавить счётчик игроков + 
// при каждом нажатии счётчик увеличивается и проверяется + 
// сделать так, чтобы повторно нельзя было нажимать на кнопку +
