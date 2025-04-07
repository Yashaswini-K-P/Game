let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let newGamebtn = document.querySelector('#new-btn');
let body = document.querySelector('body');

let turn0 = true;
let count = 0;

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn0) {
            box.innerText = 'X';
            turn0 = false;
            box.style.color = 'rgb(239, 239, 10)';
        } else {
            box.innerText = 'O';
            turn0 = true;
            box.style.color = 'rgb(248, 43, 244)';
        }
        box.disabled = true;
        count++;
        let iswinner = checkWinner();
        if (count === 9 && !iswinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Its a Draw";
    msg.style.color = 'black';
    disableBoxes();
    msgContainer.classList.remove('hide');
    body.style.backgroundColor = 'red';
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const resetGame = () => {
    turn0 = true;
    count = 0;
    body.style.backgroundColor = 'rgb(242, 242, 149)';
    enableBoxes();
    msgContainer.classList.add('hide');
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
};

const showWinner = (winner) => {
    let winnerColor = winner === 'X' ? 'rgb(239, 239, 10)' : 'rgb(248, 43, 244)';
    msg.innerHTML = `Congratulations <span style="color: ${winnerColor};">${winner}</span> won the game`;
    msg.style.color='black';
    body.style.backgroundColor = 'green';
    msgContainer.classList.remove('hide');
    disableBoxes();
    launchConfetti(); // Added confetti effect
};

const launchConfetti = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        console.log(`Checking pattern: ${pattern}, values: ${val1}, ${val2}, ${val3}`); // Debug log
        if (val1 !== '' && val2 !== '' && val3 !== '') {
            if (val1 === val2 && val2 === val3) {
                showWinner(val1);
                return true;
            }
        }
    }
    return false;
};

newGamebtn.addEventListener('click', resetGame);
resetbtn.addEventListener('click', resetGame);