const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

let timerId;

const toggleButtons = (startDisabled, stopDisabled) => {
  startButton.disabled = startDisabled;
  stopButton.disabled = stopDisabled;
};

const changeColor = () => {
  toggleButtons(true, false);
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopColorChange = () => {
  clearInterval(timerId);
  toggleButtons(false, true);
};

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

document.addEventListener('DOMContentLoaded', () => {
  toggleButtons(false, true);
  startButton.addEventListener('click', changeColor);
  stopButton.addEventListener('click', stopColorChange);
});
