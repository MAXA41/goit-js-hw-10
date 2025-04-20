import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const btn = document.querySelector('.btn');
const inp = document.querySelector('.inp');
btn.disabled = true;

// Конвертирует миллисекунды в дни/часы/минуты/секунды
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// adding 0's
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// aaaaaaaupdate timer
function updateTimer({ days, hours, minutes, seconds }) {
  const timeValues = {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };

  for (const key in timeValues) {
    const el = document.querySelector(`[data-${key}]`);
    if (el) el.textContent = timeValues[key];
  }
}

const options = {
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
    // console.log(dateNow);
    if (selectedDates[0] <= dateNow) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      btn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      btn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

btn.addEventListener('click', function () {
  btn.disabled = true;
  inp.disabled = true;

  const intervalId = setInterval(() => {
    const now = Date.now();
    const distance = userSelectedDate - now;

    // const daysEl = document.querySelector('[data-days]');
    // daysEl.textContent = days;

    // const hoursEl = document.querySelector('[data-hours]');
    // hoursEl.textContent = hours;

    // const minutesEl = document.querySelector('[data-minutes]');
    // minutesEl.textContent = minutes;

    // const secondsEl = document.querySelector('[data-seconds]');
    // secondsEl.textContent = seconds;

    if (distance <= 0) {
      clearInterval(intervalId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      inp.disabled = false;
      return;
    }

    const time = convertMs(distance);
    updateTimer(time);
  }, 1000);
});

// console.log(userSelectedDate);
