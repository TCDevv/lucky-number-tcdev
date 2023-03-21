var numbers = [];
var lastNumber = 0;
for (var i = 1; i <= 200; i++) {
  numbers.push(i);
}
var prizeList = [];
const title = document.querySelector('.title');
const btnRoll = document.getElementById('roll-btn');
const btnConfirm = document.getElementById('confirm-btn');
const alertPrize = document.getElementById('prizeAlert');
const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
const fourth = document.getElementById('fourth');
const fifth = document.getElementById('fifth');
const chiptune = new Audio(
  'https://soundimage.org/wp-content/uploads/2017/07/Arcade-Puzzler_v001.mp3'
);
const applause = new Audio(
  'https://www.pacdv.com/sounds/applause-sound/app-5.mp3'
);
localStorage.setItem('luckyNumber', '');
btnConfirm.setAttribute('disabled', true);
var timeout;

// Đổi số hiển thị trên mỗi phần tử
function roll() {
  chiptune.play();
  document.getElementById('myAlert').style.top = '-130px';
  const luckyNumber = localStorage.getItem('luckyNumber');
  btnRoll.setAttribute('disabled', true);
  btnConfirm.setAttribute('disabled', true);
  var counter = 200;

  var rollInterval = setInterval(function () {
    counter--;

    var randomIndex = Math.floor(Math.random() * numbers.length);
    var randomNum = numbers[randomIndex];
    document.getElementById('number1').innerHTML = randomNum;
    if (counter === 0) {
      chiptune.pause();
      chiptune.currentTime = 0;
      lastNumber = randomNum;
      clearInterval(rollInterval);
      if (luckyNumber) {
        document.getElementById('number1').innerHTML = luckyNumber;
        setTimeout(() => {
          document.getElementById(
            'myAlert'
          ).innerText = `Lucky number: ${luckyNumber}`;
          lastNumber = +luckyNumber;
          btnRoll.removeAttribute('disabled');
          btnConfirm.removeAttribute('disabled');
        }, 100);
      } else {
        setTimeout(() => {
          document.getElementById(
            'myAlert'
          ).innerText = `Lucky number: ${lastNumber}`;
          btnRoll.removeAttribute('disabled');
          btnConfirm.removeAttribute('disabled');
        }, 100);
      }
      document.getElementById('myAlert').style.top = '0px';
    }
  }, 100);
}

function confirmPrize() {
  btnConfirm.setAttribute('disabled', true);
  if (alertPrize.classList.contains('warning')) {
    alertPrize.classList.remove('warning');
  }
  alertPrize.style.animation = 'appear 4s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
  setTimeout(() => (alertPrize.style.animation = 'none'), 4100);
  if (prizeList.includes(lastNumber) || lastNumber === 0) {
    alertPrize.classList.add('warning');
    alertPrize.innerText = `Duplicate prize's number!`;
    return;
  }
  prizeList.push(lastNumber);
  applause.play();
  setTimeout(() => {
    applause.pause();
    applause.currentTime = 0;
  }, 5000);
  switch (prizeList.length) {
    case 1:
      fifth.innerText = lastNumber;
      alertPrize.innerText = `The fifth prize: ${lastNumber}`;
      randomFirework();
      break;
    case 2:
      fourth.innerText = lastNumber;
      alertPrize.innerText = `The fourth prize: ${lastNumber}`;
      randomFirework();
      break;
    case 3:
      third.innerText = lastNumber;
      alertPrize.innerText = `The third prize: ${lastNumber}`;
      randomFirework();
      break;
    case 4:
      second.innerText = lastNumber;
      alertPrize.innerText = `The second prize: ${lastNumber}`;
      randomFirework();
      break;
    case 5:
      first.innerText = lastNumber;
      btnRoll.setAttribute('disabled', true);
      alertPrize.innerText = `The first prize: ${lastNumber}`;
      title.innerHTML = `<h1>Congratulation <i class="fa-solid fa-star"></i></h1>`;
      randomFirework();
      break;
  }
}

function randomFirework() {
  for (let i = 0; i < 50; i++) {
    setTimeout(function () {
      createFirework();
    }, i * 100);
  }
}

function createFirework() {
  // Tạo một pháo hoa mới
  const firework = document.createElement('div');
  firework.classList.add('firework');

  // Chọn một màu sắc ngẫu nhiên cho pháo hoa
  const colors = [
    'firework-color-1',
    'firework-color-2',
    'firework-color-3',
    'firework-color-4',
    'firework-color-5',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  firework.classList.add(randomColor);

  // Thiết lập vị trí ban đầu cho pháo hoa
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  firework.style.left = x + 'px';
  firework.style.top = y + 'px';

  // Thêm pháo hoa vào trang web
  document.body.appendChild(firework);

  // Kích hoạt animation để hiển thị pháo hoa
  setTimeout(function () {
    firework.remove();
  }, 1000);
}

btnRoll.addEventListener('click', roll);
btnConfirm.addEventListener('click', confirmPrize);
