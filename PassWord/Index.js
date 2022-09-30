const PASSWORD = document.querySelector(".password");
const COPY = document.querySelector(".copy");
const CHECK = document.querySelectorAll("#checks div");
const GENERATE = document.getElementById("btn");
const pstrength = document.querySelector(".strength");
const TBODY = document.getElementById("tbody");
const HISTORY = document.getElementById("history");
const HIST = document.getElementById("hist");
const BODY = document.querySelector(".back");
let arr = [];
/**
 * data - formats the date return value
 * @returns: a formatted date
 */
let date = function () {
  let Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let final = "";
  final += new Date().getDay() + 25;
  final += ", ";
  final += Month[new Date().getMonth()];
  final += ", ";
  final += new Date().getFullYear();
  return final;
};
console.log(new Date().getDay() + 25);
/**
 * Copies the generated link to the computer's clipboard
 */
COPY.onclick = () => {
  navigator.clipboard.writeText(PASSWORD.innerHTML);
  COPY.innerHTML = `<i class="fa text-green-400 text-lg font-thin">&#xf00c;</i>`;
  setTimeout(() => {
    COPY.innerHTML = `<i class="fa text-lg text-green-400">&#xf0c5;</i>`;
  }, 1000);
  let info = {
    p: PASSWORD.innerHTML,
    d: date(),
  };
  localStorage.setItem(
    `${PASSWORD.innerHTML.substring(0, 4)}`,
    `${JSON.stringify(info)}`
  );
};
HISTORY.onclick = () => {
  HIST.style.top = "0px";
  HIST.style.transition = "ease 1s";
  for (let i = 0; i < localStorage.length; i++) {
    const row = document.createElement("tr");
    row.classList.add("p-4");
    row.classList.add("my-7");
    row.innerHTML = `
        <td class="text-white font-pop sm:text-base text-xs">${
          JSON.parse(localStorage.getItem(localStorage.key(i))).p
        }</td>
       <td class="text-white font-pop sm:text-base text-xs">${
         JSON.parse(localStorage.getItem(localStorage.key(i))).d
       }</td>
        `;
    TBODY.appendChild(row);
  }
};
BODY.onclick = () => {
  HIST.style.top = "-100%";
};
/**
 * generate_Password - generates a random password
 * @param {Array} arr: Array of selected password choice and strength
 *
 * @returns: return a random password (string);
 */
var generate_Password = function (arr = []) {
  let p = "",
    str = "";
  let Table = {
    num: "0123456789",
    sym: "$#&!_-",
    alpha: "abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  };
  for (let i = 0; i < 12; i++) {
    if (arr.includes("sym")) {
      p += Table.sym[Math.floor(Math.random() * Table.sym.split("").length)];
    }
    if (arr.includes("alpha")) {
      p +=
        Table.alpha[Math.floor(Math.random() * Table.alpha.split("").length)];
    }
    if (arr.includes("num")) {
      p += Table.num[Math.floor(Math.random() * Table.num.split("").length)];
    }
  }
  for (let i = 0; i < p.length; i++) {
    str += p[Math.floor(Math.random() * p.length)];
  }
  return "Md" + str.substring(0, 12);
};
/**
 * validate - validate if the password is strong, easy, or medium
 * @str: an array of selected password choice and strength
 * @returns: a string
 */
var validate = function (str) {
  let res = "";
  let text = {
    med: "Medium",
    strong: "Strong",
    weak: "Weak",
  };
  res = str.length == 3 ? text.strong : res;
  res = str.length == 2 ? text.med : res;
  res = str.length == 1 ? text.weak : res;
  return res;
};
/**
 * On Button click, all validating functions and formatting functions are called
 */
GENERATE.addEventListener("click", () => {
  CHECK.forEach((item) => {
    let child = item.children[0];
    if (child.checked) {
      arr.push(child.id);
      let p = generate_Password(arr);
      PASSWORD.innerHTML = p;
      if (validate(arr) == "Weak") {
        pstrength.style.color = "red";
      } else if (validate(arr) == "Medium") {
        pstrength.style.color = "yellow";
      } else {
        pstrength.style.color = "green";
      }
      pstrength.innerHTML = validate(arr);
    }
  });
  arr = [];
});
