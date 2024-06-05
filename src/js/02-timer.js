import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const selectors = {
  dateField: document.getElementById('datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timeValues: document.querySelectorAll('.value'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

selectors.startButton.disabled = true;
let selectedDate;
let timer;
const currentDate = () => new Date();

flatpickr(selectors.dateField, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  onChange: selectedDates => {
    selectedDate = selectedDates[0];
    if (selectedDate) {
      if (selectedDate < currentDate()) {
        showError('Please select a future date');
        resetTimer(timer);
      } else {
        selectors.startButton.disabled = false;
      }
    }
  },
});

selectors.startButton.addEventListener('click', event => {
  if (selectedDate) {
    clearInterval(timer);
    timer = setInterval(() => {
      const timeDifference = selectedDate - currentDate();
      if (timeDifference < 1000) {
        resetTimer(timer);
      }
      displayTimeLeft(timeDifference);
    }, 1000);
  }
});

const displayTimeLeft = time => {
  const days = Math.floor(time / 86400000);
  const hours = Math.floor((time % 86400000) / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  selectors.days.textContent = days.toString().padStart(2, '0');
  selectors.hours.textContent = hours.toString().padStart(2, '0');
  selectors.minutes.textContent = minutes.toString().padStart(2, '0');
  selectors.seconds.textContent = seconds.toString().padStart(2, '0');
};

const showError = message => {
  const errorElement = document.createElement('div');
  errorElement.textContent = message;
  errorElement.className = 'error-message';
  document.body.appendChild(errorElement);

  setTimeout(() => {
    document.body.removeChild(errorElement);
  }, 2000);
};

const resetTimer = () => {
  clearInterval(timer);
  selectors.timeValues.forEach(el => (el.textContent = '00'));
  selectors.startButton.disabled = true;
};
