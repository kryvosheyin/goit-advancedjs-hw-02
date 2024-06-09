import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const selectors = {
  dateField: document.getElementById('datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timeValues: document.querySelectorAll('.value'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate) {
      if (selectedDate < currentDate()) {
        iziToast.show({
          timeout: 1500,
          close: false,
          class: 'toast',
          title: 'Please select the date in the future',
          titleColor: 'white',
          backgroundColor: 'red',
          position: 'topCenter',
        });
        resetTimer(timer);
      } else {
        selectors.startButton.disabled = false;
      }
    }
  },
};

selectors.startButton.disabled = true;
let selectedDate;
let timer;
const currentDate = () => new Date();

flatpickr(selectors.dateField, options);

selectors.startButton.addEventListener('click', event => {
  if (selectedDate) {
    selectors.startButton.disabled = true;
    selectors.dateField.disabled = true;
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

const resetTimer = () => {
  clearInterval(timer);
  selectors.timeValues.forEach(el => (el.textContent = '00'));
  selectors.startButton.disabled = true;
  selectors.dateField.disabled = false;
};
