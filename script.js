let minutsArea = document.querySelector('#timer').firstElementChild;
let secondsArea = document.querySelector('#timer').lastElementChild;

class Timer {
    constructor () {
        this.currentMin = 0;
        this.currentSec = 0;
        this.currentTimer = 0;
        this.interval = 0;
        this.timerNotStartedState = true;
        }
        start = function () {
            this.timerNotStartedState && (this.interval = setInterval(() => {
                this.timerNotStartedState = false;
                this.currentTimer += 0.1;
                this.currentSec = this.currentTimer % 60;
                this.currentMin = parseInt(this.currentTimer / 60);
                minutsArea.innerHTML = this.currentMin.toString() + ' min';
                secondsArea.innerHTML = this.currentSec.toFixed(1).toString() + ' sec';
            }, 100))
        };
        stop = function () {
            clearInterval(this.interval);
            this.timerNotStartedState = true;
        };
        clear = function () {
            this.currentTimer = 0;
            minutsArea.innerHTML = '0 min';
            secondsArea.innerHTML = '0 sec';
            this.stop();
        };
        reset = () => document.getElementById('results').innerHTML = ''
}

let firstTimer = new Timer();
firstTimer.clear()

const buttons = document.querySelectorAll('button')
buttons[0].addEventListener('click', () => firstTimer.start())
buttons[1].addEventListener('click', () => {
    if (!firstTimer.timerNotStartedState) {
        firstTimer.stop();
        let historyEl = document.createElement('h3');
        historyEl.textContent = minutsArea.innerHTML + ' ' + secondsArea.innerHTML;
        historyEl.className = "text-center my-1 font-sans";
        document.querySelector('section').lastElementChild.appendChild(historyEl);
        document.getElementById('results').lastElementChild.scrollIntoView({behavior : 'smooth'})
        firstTimer.clear();
    }})
buttons[2].addEventListener('click', () => firstTimer.stop())
buttons[3].addEventListener('click', () => {
    firstTimer.clear();
    firstTimer.reset();
    })