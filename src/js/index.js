'uset-strict';

import CountdownTimer from './CountdownTimer.js';

const expireDate = new Date(2020, 6, 20);

const countDownTimer = new CountdownTimer({
  selector: '#timer-1',
  expireDate: expireDate,
});

countDownTimer.start();
