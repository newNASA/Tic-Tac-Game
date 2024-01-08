document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let currentPlayer = 'X';
    const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    function createCell(index) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
        return cell;
    }

    function handleCellClick(index) {
        const cell = cells[index];
        const player_x = document.querySelector('.player-x .div-bottom span');
        const player_o = document.querySelector('.player-o .div-bottom span');
        const draw = document.querySelector('.draw .div-bottom span');
        const win = document.querySelector('.win');
        const winner = document.querySelector('.win .section .top h1 p');
        const winner_h1 = document.querySelector('.win .section .top h1');
        const winner_img = document.querySelector('.win .section .top svg');
        const win_close = document.querySelector('.win .section .setting button');
        const canvas = document.querySelector('#my-canvas');

        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());

            if (checkWinner()) {
                if (currentPlayer === 'X') {
                    win.style.display = 'flex';
                    winner.textContent = 'X'
                    winner.style.color = 'var(--player-x)'
                    winner_img.style.fill = 'var(--player-x)'
                    canvas.style.display = 'flex'
                    player_x.textContent = parseInt(player_x.textContent) + 1;
                } else {
                    winner.textContent = "O"
                    winner.style.color = 'var(--player-o)'
                    winner_img.style.fill = 'var(--player-o)'
                    win.style.display = 'flex';
                    canvas.style.display = 'flex'
                    player_o.textContent = parseInt(player_o.textContent) + 1;
                }
                resetGame();
            } else if (cells.every(cell => cell.textContent !== '')) {
                win.style.display = 'flex';
                winner_h1.textContent = 'DRAW';
                winner_h1.style.color = 'var(--draw)';
                winner_img.style.display = 'none';
                draw.textContent = parseInt(draw.textContent) + 1;
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            win_close.addEventListener('click', () => {
                win.style.display = 'none';
                canvas.style.display = 'none';
            })
        }
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });

        currentPlayer = 'X';
    }

    // Qo'shilgan qismi boshqa rangga aylantirish
    board.addEventListener('mouseover', (event) => {
        const hoveredCell = event.target;
        if (!hoveredCell.classList.contains('cell') || hoveredCell.textContent !== '') {
            return;
        }

        if (currentPlayer === 'X') {
            hoveredCell.style.backgroundColor = 'var(--player-x)';
        } else {
            hoveredCell.style.backgroundColor = 'var(--player-o)';
        }
    });

    board.addEventListener('mouseout', (event) => {
        const hoveredCell = event.target;
        if (!hoveredCell.classList.contains('cell')) {
            return;
        }
        
        hoveredCell.style.backgroundColor = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            if (window.innerWidth <= 375) {
                cell.style.backgroundColor = 'var(--board-select)';
            }
        });

        cell.addEventListener('mouseout', () => {
            cell.style.backgroundColor = 'var(--board-select)';
        });
    });
});
