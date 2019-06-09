var ceil = document.querySelectorAll('.game-item');
var reset = document.querySelector('#reset-game');
var message = document.querySelector('#message');
var player = 'X';
var stepCount = 0;
// массив с выйгрышными комбинациями
var windCombinations = [
	  	[1,2,3],
	  	[1,4,7],
	  	[1,5,9],
	  	[2,5,8],
	  	[3,6,9],
	  	[3,5,7],
	  	[4,5,6],
	  	[7,8,9]
];
// массив с ходами игроков
var dataX = [];
var dataO = [];

function addEvent() {
	for (var i = 0; i < ceil.length; i++) {
		ceil[i].addEventListener('click', currentStep);
	}
} 
addEvent();

function removeEvent() {
	for (var i = 0; i < ceil.length; i++) {
		ceil[i].removeEventListener('click', currentStep);
	}
}
 
function currentStep() {
	var num = +this.getAttribute('data-ceil');

	if (!this.textContent) {
		this.innerText = player;
		player === 'X' ? dataX.push(num) : dataO.push(num);

		if ((dataX.length > 2 || dataO.length > 2) && (checkWin(dataX, num) || checkWin(dataO, num))) {
			removeEvent();

			return (message.innerText = 'Победил игрок: ' + player);
		}
	}

	stepCount++;
	checkCount(stepCount);
	changePlayer();
}

function checkWin(arr, number) {
	for (var w = 0; w < windCombinations.length; w++) {
		var someWinArr = windCombinations[w];
		var count = 0;

		if (someWinArr.indexOf(number) !== -1) {
			
			for (var k = 0; k < someWinArr.length; k++) {
				if (arr.indexOf(someWinArr[k]) !== -1) {
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

function checkCount(count) {
	(count === 9) ? (message.innerText = 'НИЧЬЯ') : (message.innerText = 'Ходит игрок: ' + player);
}

function changePlayer() {
	player === 'X' ? (player = 'O') : (player = 'X');
}

reset.addEventListener('click', function() {
	for (var i = 0; i < ceil.length; i++) {
		ceil[i].innerText = '';
	}

	dataX = [];
	dataO = [];
	player = 'X';
	stepCount = 0;
	message.innerText = 'Ходит игрок: ' + player;
	addEvent();
})