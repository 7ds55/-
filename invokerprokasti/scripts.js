// scripts.js
const combos = [
    { name: 'Cold Snap', sequence: ['q', 'q', 'q'] },
    { name: 'Ghost Walk', sequence: ['q', 'w', 'w'] },
    { name: 'Ice Wall', sequence: ['q', 'w', 'e'] },
    { name: 'EMP', sequence: ['w', 'w', 'w'] },
    { name: 'Tornado', sequence: ['w', 'e', 'e'] },
    { name: 'Alacrity', sequence: ['w', 'e', 'r'] },
    { name: 'Sun Strike', sequence: ['e', 'e', 'e'] },
    { name: 'Forge Spirit', sequence: ['e', 'e', 'r'] },
    { name: 'Chaos Meteor', sequence: ['e', 'r', 'r'] },
    { name: 'Deafening Blast', sequence: ['r', 'r', 'r'] }
];

let currentCombo = [];
let userSequence = [];
let timerDuration = 0;
let intervalId;
let startTime;
let correctCombos = 0;
let errors = 0;

function startTraining() {
    const randomIndex = Math.floor(Math.random() * combos.length);
    currentCombo = combos[randomIndex];
    document.getElementById('comboText').innerText = currentCombo.name;
    document.getElementById('result').innerText = '';
    userSequence = [];
    updateHintList();
    document.getElementById('userSequence').innerText = '';
    window.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    if (['q', 'w', 'e', 'r'].includes(event.key)) {
        userSequence.push(event.key);
        document.getElementById('userSequence').innerText = userSequence.join(' ');

        if (userSequence.length > currentCombo.sequence.length) {
            userSequence.shift();
        }

        if (userSequence.join('') === currentCombo.sequence.join('')) {
            correctCombos++;
            document.getElementById('result').innerText = 'Правильно! Вы выполнили комбинацию!';
            window.removeEventListener('keydown', handleKeyPress);
            setTimeout(startTraining, 1000);
        } else if (userSequence.length === currentCombo.sequence.length && userSequence.join('') !== currentCombo.sequence.join('')) {
            errors++;
            document.getElementById('result').innerText = 'Неправильно! Попробуйте снова.';
            userSequence = [];
            document.getElementById('userSequence').innerText = '';
        }
    }
}

function setTimer(duration) {
    timerDuration = duration;
    document.getElementById('timerDisplay').innerText = formatTime(timerDuration);
}

function startTimer() {
    if (timerDuration > 0) {
        startTime = Date.now();
        intervalId = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = timerDuration - elapsed;

    if (remaining <= 0) {
        clearInterval(intervalId);
        document.getElementById('timerDisplay').innerText = '00:00';
        endTraining();
    } else {
        document.getElementById('timerDisplay').innerText = formatTime(remaining);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function endTraining() {
    window.removeEventListener('keydown', handleKeyPress);
    alert(`Время истекло! Вы выполнили ${correctCombos} комбинаций и допустили ${errors} ошибок.`);
    correctCombos = 0;
    errors = 0;
}

function updateHintList() {
    const hintList = document.getElementById('hintList');
    hintList.innerHTML = '';

    combos.forEach(combo => {
        const listItem = document.createElement('li');
        listItem.innerText = `${combo.name}: ${combo.sequence.join(' ')}`;
        hintList.appendChild(listItem);
    });
}