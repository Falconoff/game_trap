import multilangMessagesObj from "./game-messages-multilang.js";
import interfaceLang from "./interface-texts-multilang.js";

let currentLang = "eng";

// algorithm (hiding cells step by step)
const cellsToHide = [
  [],
  [9],
  [0, 8],
  [7],
  [2, 6],
  [1, 3, 5],
];

let step = 0;
let substep = 0;

const refs = {
  message: document.querySelector(".instructions"),
  nextBtn: document.querySelector(".js-next-btn"),
  reloadBtn: document.querySelector(".js-reload-btn"),
  cells: document.querySelectorAll(".cell"),
  langBtns: document.querySelector(".js-lang-list"),
};

// 1-st show Rules
refs.message.innerHTML =
  multilangMessagesObj[currentLang][step][substep];

// Listener only for the first click
refs.nextBtn.addEventListener(
  "click",
  onNextBtnClickFirstTime,
  {
    once: true,
  },
);

refs.langBtns.addEventListener("click", onLangBtnClick);

function onNextBtnClickFirstTime() {
  substep = 1;
  showSmoothInstructions(
    multilangMessagesObj[currentLang][step][substep],
  );

  refs.nextBtn.addEventListener("click", onNextBtnClick);
}

function onNextBtnClick() {
  onBtnDisabled(refs.nextBtn);

  step += 1;
  substep = 0;
  showSmoothInstructions(
    multilangMessagesObj[currentLang][step][substep],
  );

  // hide cell
  window.setTimeout(() => {
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

// ============ LANGUAGES SWITCHER ===================

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
