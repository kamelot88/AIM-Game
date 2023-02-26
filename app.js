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
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span><br>
    <a href="#" class="reload">Try again</a></h1>`;
    // document.querySelector('.again').style.display = 'block';
    document.querySelector('.reload').addEventListener('click', () => {
        location.reload(); 
        return false;
    })
}


function createRandomCircle() {
    const circle = document.createElement('div');
    let size = getRandomNumber(4, 40);
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
    let colors = ['red', 'yellowgreen', 'yellow', 'white', 'blue', 'purple'];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

