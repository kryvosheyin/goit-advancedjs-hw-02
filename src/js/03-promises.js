import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const firstDelay = parseInt(form.elements.delay.value);
  const delayStep = parseInt(form.elements.step.value);
  const promiseAmount = parseInt(form.elements.amount.value);

  let timeout = firstDelay;
  for (let i = 1; i <= promiseAmount; i++) {
    createPromise(i, timeout)
      .then(({ position, delay }) => {
        iziToast.show({
          title: `✅ Fulfilled promise ${position} in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'green',
          titleColor: 'white',
          close: false,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          title: `❌ Rejected promise ${position} in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'red',
          titleColor: 'white',
          close: false,
        });
      });
    timeout += delayStep;
  }
});
