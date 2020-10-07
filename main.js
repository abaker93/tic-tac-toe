const Player = (name, marker) => {
	return { name, marker };
}

const gameBoard = (() => {
	const gameBoardContainer = document.getElementById('game-board');
	for (let i=1; i<=9; i++) {
		const cell = document.createElement('div');
		cell.id = `${i}`;
		cell.className = 'cell';
		gameBoardContainer.append(cell);
	}
})();

const game = (() => {
	let player1 = Player('player 1', 'X');
	let player2 = Player('player 2', 'O');
	let playerTurn = player1;
	let board = ['','','','','','','','',''];
	let count = 0;
	let winner = null;
	const cells = Array.from(document.querySelectorAll('.cell'));
	const winnerContainer = document.querySelector('#winner');

	const checkWin = player => {
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
			winnerContainer.innerText = `${winner} is the winner!`
		}
	}

	const fillBlock = (player, cell) => {
		const cellID = cell.id - 1;
		board[cellID] = player.marker;
		cell.innerText = player.marker;
		count++;
		checkWin(player);
	}

	const play = () => {
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
})();