const messageTexts = [
  [
    "ПРАВИЛА ИГРЫ: 1 ход - это переход с одной клетки на другую (смежную). По диагонали ходить нельзя! Ходить можно только вертикально и горизонтально. Ходим взглядом, нажимать по клеткам не нужно. Играем!... Нажмите кнопку Далее",

    "Вы сейчас стоите на квадрате 0. Сделайте 5 ходов в любых направлениях, кроме как по диагонали, и запомните на каком квадрате остановились. Затем нажмите Далее",
  ],

  [
    "Стартовый квадрат 0 нам уже не пригодится. Я убираю его",
    "С того квадрата, где стоите, сделайте ещё 4 хода. Не забудьте - по диагонали ходить нельзя! Запомните свой квадрат и нажмите Далее",
  ],

  [
    "Я знаю где Вас нет) Убираю ненужные квадраты",
    "Сделайте ещё 3 хода. По диагонали ходить нельзя! Запомните на каком квадрате остановились и нажмите Далее",
  ],

  [
    "Я снова уберу квадрат, где Вас нет",
    "Сделайте ещё 1 ход.",
  ],

  [
    "Я знаю, что Вас и тут нет. Я слежу за глазами ))",
    "Сделайте ещё 3 хода.",
  ],

  ["Я знаю где Вы! )))"],
];

const cellsToHide = [
  [],
  [9],
  [0, 8],
  [7],
  [2, 6],
  [1, 3, 5],
];

const refs = {
  message: document.querySelector(".instructions"),
  nextBtn: document.querySelector(".js-next-btn"),
  cells: document.querySelectorAll(".cell"),
};

let step = 1;

refs.message.innerHTML = messageTexts[0][0];

// only for the first click
refs.nextBtn.addEventListener(
  "click",
  onNextBtnClickFirstTime,
  {
    once: true,
  },
);

// console.log(refs.cells);
// console.log(refs.cells[9]);

function onNextBtnClickFirstTime() {
  console.log("click 1st");

  // refs.message.classList.add("instructions-hiding");
  // window.setTimeout(() => {
  //   refs.message.innerHTML = messageTexts[0][1];
  //   refs.message.classList.remove("instructions-hiding");
  // }, 1000);
  showSmoothInstructions(messageTexts[0][1]);

  // let timeoutID = window.setTimeout(func, 3000);
  refs.nextBtn.addEventListener("click", onNextBtnClick);
}

function onNextBtnClick() {
  console.log("click another");

  onBtnDisabled(refs.nextBtn);

  // refs.message.innerHTML = messageTexts[step][0]; // mess: del cell
  showSmoothInstructions(messageTexts[step][0]);

  // hide cell
  window.setTimeout(() => {
    // refs.cells[9].classList.add("hidden");
    hideCells(cellsToHide[step]);
  }, 2000);

  if (step >= 5) {
    return;
  }

  window.setTimeout(() => {
    // refs.message.innerHTML = messageTexts[step][1]; // mess: make steps
    showSmoothInstructions(messageTexts[step][1]);
  }, 4000);

  window.setTimeout(() => {
    onBtnEnabled(refs.nextBtn);
    step += 1;
  }, 6000);

  // console.log("step=", step);

  // console.log("step=", step);
}

function onBtnDisabled(btn) {
  btn.setAttribute("disabled", "");
  btn.classList.add("hidden");
}

function onBtnEnabled(btn) {
  btn.removeAttribute("disabled");
  btn.classList.remove("hidden");
}

function hideCells(arr) {
  arr.forEach(index =>
    refs.cells[index].classList.add("hidden"),
  );
}

function showSmoothInstructions(text) {
  refs.message.classList.add("instructions-hiding");
  window.setTimeout(() => {
    refs.message.innerHTML = text;
    refs.message.classList.remove("instructions-hiding");
  }, 1000);
}
