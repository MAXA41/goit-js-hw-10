import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

class Timer {
  constructor({ onTick }) {
    startBtn.disabled = true;
    this.onTick = onTick;
    this.userSelectedDate = null;
    this.timerInterval = null; 
        
    this.init();
  }

  init() {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: (selectedDates) => {
        const selectedDate = selectedDates[0];
        const now = new Date();

        if (selectedDate <= now) {
          iziToast.error({
            title: "Error",
            message: "Please choose a date in the future",
            position: "topRight",
            backgroundColor: "#ef4040",
            titleColor: "#fff",
            messageColor: "#fff",
            class: "icon-svg-success",
            iconUrl: "/img/error.svg",
          });
          startBtn.disabled = true;
        } else {
          this.userSelectedDate = selectedDate;
          startBtn.disabled = false;
        }
      },
    };

    flatpickr("#datetime-picker", options);
  }

  start() {
    if (!this.userSelectedDate || startBtn.disabled) {
      return;
    }

    startBtn.disabled = true;
    
    this.timerInterval = setInterval(() => {
      const curentTime = Date.now();
      const resultTime = this.userSelectedDate - curentTime;

      if (resultTime <= 0) {
        clearInterval(this.timerInterval);
        this.onTick(this.convertMs(0)); 
        return;
      }

      const ms = this.convertMs(resultTime);
      this.onTick(ms);
    }, 1000);
  }

  convertMs(ms) {
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
}

const timer = new Timer({
  onTick: updateTimerDisplay,
});

startBtn.addEventListener("click", () => timer.start());

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  dataDays.textContent = pad(days);
  dataHours.textContent = pad(hours);
  dataMinutes.textContent = pad(minutes);
  dataSeconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

