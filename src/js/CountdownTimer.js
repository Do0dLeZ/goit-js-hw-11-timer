'use-strict';

const template = ({ days, hours, mins, secs }) => `
<div class="field">
  <span class="value" data-value="days">${days}</span>
  <span class="label">Days</span>
</div>

<div class="field">
  <span class="value" data-value="hours">${hours}</span>
  <span class="label">Hours</span>
</div>

<div class="field">
  <span class="value" data-value="mins">${mins}</span>
  <span class="label">Minutes</span>
</div>

<div class="field">
  <span class="value" data-value="secs">${secs}</span>
  <span class="label">Seconds</span>
</div>
`;

export default function CountdownTimer({ selector, expireDate = new Date() }) {
  this.myIntervalId = undefined;

  // ================== Model ===================

  const calculateDiff = () => {
    const now = Date.now();
    const diff = new Date(expireDate) - now;

    if (diff <= 0) {
      clearInterval(this.myIntervalId);
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
  };

  // ================ Main Refs =======================

  this.element = document
    .querySelector(selector)
    .insertAdjacentHTML('beforeend', template(calculateDiff()));

  const refs = {
    elemDays: document.querySelector(`${selector} .value[data-value=days]`),
    elemHours: document.querySelector(`${selector} .value[data-value=hours]`),
    elemMinutes: document.querySelector(`${selector} .value[data-value=mins]`),
    elemSecs: document.querySelector(`${selector} .value[data-value=secs]`),
  };

  // ================== Renders =====================

  const renderTime = () => {
    const difference = calculateDiff();
    refs.elemDays.textContent = difference.days;
    refs.elemHours.textContent = difference.hours;
    refs.elemMinutes.textContent = difference.mins;
    refs.elemSecs.textContent = difference.secs;
  };

  // ================== Start ======================

  this.start = () => {
    this.myIntervalId = setInterval(renderTime, 1000);
  };
}
