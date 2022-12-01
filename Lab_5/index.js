const swap_btn = document.querySelector(".swap-btn");
const calc_btn = document.querySelector(".calc-btn");
const result_btn = document.querySelector(".result-btn");
const number_btn = document.querySelector(".number-btn");
const save_btn = document.querySelector(".save-btn");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const fourth = document.querySelector(".fourth");
const fifth = document.querySelector(".fifth");
const sixth = document.querySelector(".sixth");
const seventh = document.querySelector(".seventh");
const inputs = document.querySelector(".inputs");
const height = document.querySelector(".height");
const width = document.querySelector(".width");
const error = document.querySelector(".error");
const square_result = document.querySelector(".result");
const number_input = document.querySelector(".number-input");
const number = document.querySelector(".number-input-content");
const items = document.querySelectorAll(".item");
const forms = document.querySelectorAll(".add-input");
const add_btn = document.querySelectorAll(".add-btn");
const add_input = document.querySelectorAll(".add-list");
const list = document.querySelectorAll(".list");
swap_btn.addEventListener("click", () => {
  let a = sixth.innerHTML;
  sixth.innerHTML = third.innerHTML;
  third.innerHTML = a;
});

let calc_square = (a, h) => {
  return a * h;
};

calc_btn.addEventListener("click", () => {
  inputs.classList.toggle("hidden");
});

result_btn.addEventListener("click", () => {
  if (height.value <= 0 || width.value <= 0) {
    error.classList.remove("hidden");
  } else {
    error.classList.add("hidden");
    square_result.innerHTML = `Result: ${calc_square(
      height.value,
      width.value
    )}`;
  }
});

number_btn.addEventListener("click", () => {
  number_input.classList.toggle("hidden");
});

save_btn.addEventListener("click", () => {
  let value = number.value;
  let maxNum = -1;
  for (let i = 0; i < value.length; i++) {
    const num = Number(value[i]);
    if (!isNaN(num)) maxNum = Math.max(maxNum, num);
  }
  if (maxNum > -1) {
    alert("Найбільша цифра " + maxNum + ".\nЗначення збережено в cookie.");
    document.cookie = "maxNum=" + maxNum + ";";
  } else {
    alert("Введене значення не має чисел");
  }
});

const allCookies = Object.fromEntries(
  document.cookie.split(";").map((keyVal) => keyVal.split("="))
);
if (allCookies.hasOwnProperty("maxNum")) {
  alert(
    "Найбільша цифра " +
      allCookies.maxNum +
      ".\nПри натисненні OK значення буде видалено з cookie."
  );
  document.cookie = "maxNum=0;expires=Thu, 01 Jan 1970 00:00:01 GMT";
  alert("Значення видалено з cookie.\nНатиснення OK перезавантажить сторінку.");
  location.reload();
}

function setPosition() {
  const align2 = document.querySelector(
    'input[name="second-align"]:checked'
  ).value;
  const align4 = document.querySelector(
    'input[name="fourth-align"]:checked'
  ).value;
  const align5 = document.querySelector(
    'input[name="fifth-align"]:checked'
  ).value;
  second.style["text-align"] = align2;
  fourth.style["text-align"] = align4;
  fifth.style["text-align"] = align5;
  localStorage.setItem("align2", align2);
  localStorage.setItem("align4", align4);
  localStorage.setItem("align5", align5);
}
function restore() {
  const align2 = localStorage.getItem("align2");
  const align4 = localStorage.getItem("align4");
  const align5 = localStorage.getItem("align5");
  document.querySelector(
    'input[name="second-align"][value="' + align2 + '"]'
  ).checked = true;
  document.querySelector(
    'input[name="fourth-align"][value="' + align4 + '"]'
  ).checked = true;
  document.querySelector(
    'input[name="fifth-align"][value="' + align5 + '"]'
  ).checked = true;
}
second.addEventListener("mouseout", setPosition);
restore();
setPosition();

function logSelection() {
  console.log(document.getSelection().toString());
}
items.forEach((item, index) => {
  item.addEventListener("selectstart", () => {
    forms.forEach((form) => {
      if (!form.classList.contains("hidden")) {
        form.classList.add("hidden");
      }
    });
    forms[index].classList.remove("hidden");
  });
});

add_btn.forEach((item, index) => {
  item.addEventListener("click", () => {
    let li = document.createElement("li");
    li.innerHTML = add_input[index].value;
    list[index].append(li);
    localStorage.setItem(
      `list${index}${list[index].children.length}`,
      li.innerHTML
    );
  });
});
console.log(localStorage.key(0));
window.addEventListener("load", () => {
  let deleted = [];
  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i).includes("list"));
    console.log(localStorage.key(i).indexOf("list"));
    if (localStorage.key(i).indexOf("list") !== -1) {
      deleted.push(localStorage.key(i));
    }
  }
  deleted.forEach((item) => {
    localStorage.removeItem(item);
  });
});
