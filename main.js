let player1, player2
const modal = document.getElementById('modal')
const winnerContainer = document.querySelector('#winner')

const Player = (name, marker) => {
	return { name, marker };
}

document.getElementById('play-game-btn').addEventListener('click', () => {
	const modalForm = document.getElementById('modal-form')

	const player1Name = document.getElementById('player1-name').value
	const player2Name = document.getElementById('player2-name').value
	const player1Marker = document.getElementById('player1-marker').value
	const player2Marker = document.getElementById('player2-marker').value

	player1 = Player(player1Name, player1Marker)
	player2 = Player(player2Name, player2Marker)

	console.log(player1)
	console.log(player2)

	modal.classList.remove('show')
	modal.classList.add('hide')

	game()

	modalForm.reset()
})

const gameBoard = (() => {
	console.log('gameBoard start')

	const gameBoardContainer = document.getElementById('game-board');
	for (let i=1; i<=9; i++) {
		const cell = document.createElement('div');
		cell.id = `${i}`;
		cell.className = 'cell';
		gameBoardContainer.append(cell);
	}
})();

const game = () => {
	console.log('game start')
	
	let playerTurn = player1;
	let board = ['','','','','','','','',''];
	let count = 0;
	let winner = null;
	const cells = Array.from(document.querySelectorAll('.cell'));

	const checkWin = player => {
		console.log('checkWin start')

		const player1Win = `${player1.marker} ${player1.marker} ${player1.marker}`;
		const player2Win = `${player2.marker} ${player2.marker} ${player2.marker}`;

		let winCases = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		];

		winCases.forEach((cases) => {
			let temp = `${board[cases[0]]} ${board[cases[1]]} ${board[cases[2]]}`;

			if (temp == player1Win) {
				winner = player.name;
			} else if (temp === player2Win) {
				winner = player.name;
			}
		})

		if (count === 9 && winner === null) {
			winner = 'Tied';
		}

		if (winner !== null) {
			winnerContainer.classList.remove('hide')
			winnerContainer.innerText = `${winner} is the winner!`
		}
	}

	const fillBlock = (player, cell) => {
		console.log('fillBlock start')

		const cellID = cell.id - 1;
		board[cellID] = player.marker;
		cell.innerText = player.marker;
		count++;
		checkWin(player);
	}

	const play = () => {
		console.log('play start')

		cells.forEach(cell => {
			cell.addEventListener('click', () => {
				const cellID = cell.id - 1;
				if(board[cellID] === '' && count < 9 && winner === null) {
					fillBlock(playerTurn, cell);
					if (playerTurn === player1) {
						playerTurn = player2
					} else if (playerTurn === player2) {
						playerTurn = player1
					}
				}
			})
		})
	}
	play();
};

document.getElementById('new-game-btn').addEventListener('click', () => {
	location.reload()
})