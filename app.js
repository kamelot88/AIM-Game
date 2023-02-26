const startBtn = document.querySelector('.start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('time-btn')) {
        time = +target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }
});

const clickBoard = (event) => {
    if (event.target.matches('.circle')) {
        score++;
    }
    board.firstElementChild.remove();
    createRandomCircle();
};

board.addEventListener('click', clickBoard);

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
   
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.removeEventListener('click', clickBoard);
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    let size = getRandomNumber(1, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    let color = getRandomColor();
    circle.style.background = color;
    board.append(circle);
}

function getRandomColor() {
    let colors = ['linear-gradient(90deg,#1a0505,#670f0f,#a01603)', 'linear-gradient(90deg,#9a13d7,#6965eb,#11c7e9)', 'linear-gradient(90deg,#e38bbc,#eca3cb,#cccdd2,#ebecef)', 'linear-gradient(90deg,#31111c,#e4282a,#f3eb63,#d52827,#110a13)', 'linear-gradient(90deg,#b3650c,#ff860d,#cc0081)', 'linear-gradient(90deg,#ffff00,#bb2c40,#b7048c)'];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

