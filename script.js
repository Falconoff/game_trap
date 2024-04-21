const messageTexts = [
  [
    "Вы сейчас стоите на квадрате 0. По диагонали ходить нельзя! Ходить можно только вертикально и горизонтально.",

    "Сделайте 5 ходов в любых направлениях, кроме как по диагонали. Запомните на каком квадрате остановились!",
  ],

  [
    "Стартовый квадрат 0 нам уже не пригодится. Убираем его...",
    "Сделайте ещё 4 хода. Не забудьте - по диагонали ходить нельзя! Запомните на каком квадрате остановились",
  ],

  [
    "Я знаю, что Вас тут нет.",
    "Сделайте ещё 3 хода. Не забудьте - по диагонали ходить нельзя! Запомните на каком квадрате остановились",
  ],

  [
    "Я знаю, что Вас тут нет. Я слежу за глазами ))",
    "Сделайте ещё 3 хода. Не забудьте - по диагонали ходить нельзя! Запомните на каком квадрате остановились",
  ],

  [
    "Я знаю, что Вас тут нет",
    "Сделайте ещё 3 хода. Не забудьте - по диагонали ходить нельзя! Запомните на каком квадрате остановились",
  ],

  "Я знаю где Вы! )))",
];

const refs = {
  message: document.querySelector(".instructions"),
  nextBtn: document.querySelector(".js-next-btn"),
  cells: document.querySelectorAll(".cell"),
};

const step = 0;

refs.nextBtn.addEventListener(
  "click",
  onNextBtnClickFirstTime,
  {
    once: true,
  },
);

console.log(refs.cells[9]);

refs.message.innerHTML = messageTexts[0][0];

function onNextBtnClickFirstTime() {
  console.log("click 1st");
  refs.message.innerHTML = messageTexts[0][1];

  // let timeoutID = window.setTimeout(func, 3000);
  refs.nextBtn.addEventListener("click", onNextBtnClick);
}

function onNextBtnClick() {
  console.log("click another");
  onBtnDisabled(refs.nextBtn);

  refs.message.innerHTML = messageTexts[1][0]; // mess: del cell

  // hide cell
  window.setTimeout(() => {
    refs.cells[9].classList.add("hidden");
  }, 2000);
  // window.clearTimeout(timeoutID);

  window.setTimeout(() => {
    //  refs.cells[9].classList.add("hidden");
    refs.message.innerHTML = messageTexts[1][1]; // mess: make steps
  }, 4000);

  window.setTimeout(() => {
    onBtnEnabled(refs.nextBtn);
  }, 6000);

  // refs.cells[9].classList.add("hidden");
}

function onBtnDisabled(btn) {
  btn.setAttribute("disabled", "");
  btn.classList.add("hidden");
}

function onBtnEnabled(btn) {
  btn.removeAttribute("disabled");
  btn.classList.remove("hidden");
}
