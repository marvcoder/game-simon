const btnStart = document.getElementById('btnStart')
const skyblue = document.getElementById('skyblue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const countLevel = document.getElementById('countLevel')
const lastLevel = 10;


class Game {
    constructor() {
        this.run = this.run.bind(this);
        this.run();
        this.generateSequence()
        setTimeout(this.nextLevel, 1000)
    }
    run() {
        this.selectColor = this.selectColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.toggleBtnStart()
        this.startCountLevel()
        this.level = 1;
        this.colors = {
            skyblue,
            violet,
            orange,
            green
        }
    }
    toggleBtnStart(){
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')
        } else {
            btnStart.classList.add('hide');
        }
    }
    generateSequence() {
        this.sequence = new Array(lastLevel).fill(0).map(n => Math.floor(Math.random() * 4));
    }
    nextLevel() {
        this.subLevel = 0
        this.lightSequence()
        this.addEventClick()
        this.updateCountLevel()
    }
    transformNumberToColor(number) {
        switch (number) {
            case 0:
                return 'skyblue'
            case 1:
                return 'violet'
            case 2:
                return 'orange'
            case 3:
                return 'green'
        }
    }
    transformColorToNumber(color) {
        switch (color) {
            case 'skyblue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }
    lightSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.lightColor(color), 1000 * i)
        }
    }
    lightColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnoffColor(color), 350)
    }
    turnoffColor(color) {
        this.colors[color].classList.remove('light');
    }
    addEventClick() {
        this.colors.skyblue.addEventListener('click', this.selectColor)
        this.colors.violet.addEventListener('click', this.selectColor)
        this.colors.orange.addEventListener('click', this.selectColor)
        this.colors.green.addEventListener('click', this.selectColor)
    }
    deleteEventClick() {
        this.colors.skyblue.removeEventListener('click', this.selectColor)
        this.colors.violet.removeEventListener('click', this.selectColor)
        this.colors.orange.removeEventListener('click', this.selectColor)
        this.colors.green.removeEventListener('click', this.selectColor)
    }
    startCountLevel(){
        countLevel.value = `Nivel: 0`;
    }
    updateCountLevel(){
        countLevel.value = `Nivel: ${this.level}`
    }

    selectColor(ev) {
        const nameColor = ev.target.dataset.color;
        const numberColor = this.transformColorToNumber(nameColor)
        this.lightColor(nameColor)
        if (numberColor === this.sequence[this.subLevel]) {
            this.subLevel++
            if (this.subLevel === this.level) {
                this.level++
                this.deleteEventClick();
                if (this.level === (lastLevel + 1)) {
                    this.winGame();
                } else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            this.lostGame()
        }
    }
    winGame() {
        swal('Miguel', 'Felicitaciones, Ganaste!', 'success')
            .then(this.run);
    }
    lostGame() {
    swal('Miguel', 'Sigue Intentando, no te rindas!', 'error')
        .then(() => {
            this.deleteEventClick()
            this.run()
        })
    }
}

function startGame() {

    window.game = new Game();
}