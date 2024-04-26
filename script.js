const multilangMessagesObj = {
  rus: [
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
      "Я знаю, что Вас и тут нет. Я слежу за Вашими глазами ))",
      "Сделайте ещё 3 хода.",
    ],

    ["Я знаю где Вы! )))"],
  ],

  eng: [
    [
      "RULES OF THE GAME: 1 move is a transition from one cell to another (adjacent). You can't walk diagonally! You can only walk vertically and horizontally. We walk with our eyes, no need to click on the cells. Let's play!... Click Next",

      "You are now standing on the square 0. Make 5 moves in any direction except diagonally, and remember which square you stopped on. Then click Next",
    ],

    [
      "Starting square 0 will no longer be useful to us. I'll remove it",
      "From the square where you are standing, make another 4 moves. Don't forget - You can't walk diagonally! Remember your square and click Next",
    ],

    [
      "I know where you are not) Removing unnecessary squares",
      "Make 3 more moves. You can't walk diagonally! Remember which square you stopped at and click Next",
    ],

    [
      "I will again remove the square where you are not",
      "Make 1 more move.",
    ],

    [
      "I know that you are not here either. I'm watching your eyes ))",
      "Make 3 more moves.",
    ],

    ["I know where you are! )))"],
  ],

  ukr: [
    [
      "ПРАВИЛА ГРИ: 1 хід - це перехід з однієї клітинки на іншу (суміжну). По діагоналі ходити не можна! Ходити можна тільки вертикально та горизонтально. Ходимо поглядом, натискати по клітинкам не потрібно. Граємо!... Натисніть кнопку Далі",

      "Ви зараз стоїте на квадраті 0. Зробіть 5 ходів в будь-яких напрямках, окрім по діагоналі, та запам'ятайте на якому квадраті зупинилися. Тоді натисніть кнопку Далі",
    ],

    [
      "Стартовий квадрат 0 нам вже не знадобиться. Я прибираю його",
      "З того квадрату, де стоїте, зробіть ще 4 ходи. Не забудьте - по діагоналі ходити не можна! Запам'ятайте свій квадрат і натисніть Далі",
    ],

    [
      "Я знаю де Вас немає) Прибираю непотрібні квардати",
      "Зробіть ще 3 ходи. По діагоналі ходити не можна! Запам'ятайте на якому квадраті зупинилися квадрат і натисніть Далі",
    ],

    [
      "Я знову заберу квадрат, де Вас немає",
      "Зробіть ще 1 хід.",
    ],

    [
      "Я знаю, що Вас і тут немає. Я слідкую за Вашими очима ))",
      "Зробіть ще 3 ходи.",
    ],

    ["Я знаю де Ви! )))"],
  ],
};

const interfaceLang = {
  eng: ["Reload", "Next"],
  ukr: ["Спочатку", "Далі"],
  rus: ["Сначала", "Далее"],
};

// let messageTexts = messagesEng;
let currentLang = "eng";

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
  reloadBtn: document.querySelector(".js-reload-btn"),
  cells: document.querySelectorAll(".cell"),
  langBtns: document.querySelector(".js-lang-list"),
};

let step = 0;
let substep = 0;

refs.message.innerHTML =
  multilangMessagesObj[currentLang][step][substep];

// only for the first click
refs.nextBtn.addEventListener(
  "click",
  onNextBtnClickFirstTime,
  {
    once: true,
  },
);

refs.langBtns.addEventListener("click", onLangBtnClick);

// console.log(refs.cells);
// console.log(refs.cells[9]);

function onNextBtnClickFirstTime() {
  console.log("click 1st");

  // refs.message.classList.add("instructions-hiding");
  // window.setTimeout(() => {
  //   refs.message.innerHTML = messageTexts[0][1];
  //   refs.message.classList.remove("instructions-hiding");
  // }, 1000);
  substep = 1;
  showSmoothInstructions(
    multilangMessagesObj[currentLang][step][substep],
  );

  // let timeoutID = window.setTimeout(func, 3000);
  refs.nextBtn.addEventListener("click", onNextBtnClick);
}

function onNextBtnClick() {
  console.log("click another");

  onBtnDisabled(refs.nextBtn);

  step += 1;
  substep = 0;
  // refs.message.innerHTML = messageTexts[step][0]; // mess: del cell
  showSmoothInstructions(
    multilangMessagesObj[currentLang][step][substep],
  );

  // hide cell
  window.setTimeout(() => {
    // refs.cells[9].classList.add("hidden");
    hideCells(cellsToHide[step]);
  }, 2000);

  if (step >= 5) {
    return;
  }

  substep = 1;
  window.setTimeout(() => {
    showSmoothInstructions(
      multilangMessagesObj[currentLang][step][substep],
    );
  }, 4000);

  window.setTimeout(() => {
    onBtnEnabled(refs.nextBtn);
    // step += 1;
  }, 6000);
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
  }, 500);
}

// ============ LANGUAGES ===================

function onLangBtnClick(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  //  проверяем есть ли уже на какой-то кнопке активный класс
  const currentActiveBtn = document.querySelector(
    ".js-lang-list .active",
  );
  // если есть, то удаляем активный класс
  currentActiveBtn?.classList.remove("active");

  // добавляем активный класс на кликнутую кнопку
  const newActiveBtn = event.target;
  newActiveBtn.classList.add("active");

  // ...и считываем значение из data-атрибута его значение
  currentLang = newActiveBtn.dataset.lang;

  // изменяем язык текста кнопок
  changeBtnsText(currentLang);

  // изменяем язык текста сообщений игрового поля
  refs.message.innerHTML =
    multilangMessagesObj[currentLang][step][substep];
}

function changeBtnsText(lang) {
  refs.reloadBtn.innerText = interfaceLang[lang][0];
  refs.nextBtn.innerText = interfaceLang[lang][1];
}
