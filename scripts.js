import {
  notifications as notificationsData,
  tags as tagsData,
  socials as socialsData,
  weather as weatherData,
  meals as mealsData,
  whatsAppening as whatsAppeningData,
  movieCards as movieCardsData,
} from "./data/index.js";

const sections = document.querySelectorAll("[data-section]");
const background = document.querySelector("[data-background]");

const lockScreenEl = document.querySelector("[data-lock-screen]");
const passwordScreenEl = document.querySelector("[data-password-screen]");
const menuScreenEl = document.querySelector("[data-menu-screen]");

const pin = Math.floor(Math.random() * 9000) + 1000;

const notifications = Array.from(notificationsData);
const tags = Array.from(tagsData);
const socials = Array.from(socialsData);
const weather = Array.from(weatherData);
const meals = Array.from(mealsData);
const whatsAppening = Array.from(whatsAppeningData);
const movieCards = Array.from(movieCardsData);

const passwordInputsChildren = Array.from(
  passwordScreenEl.querySelector("[data-password-screen-inputs]").children
);

let time = new Date();
let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
let minute =
  time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

const temp = -9;

let page = "lock screen";
let currentInput = 0;

function checkTemp() {
  if (temp >= 28) {
    sunnyTemp();
  } else if (temp >= 15) {
    cloudyTemp();
  } else if (temp > 0) {
    rainyTemp();
  } else {
    snowyTemp();
  }
}

function sunnyTemp() {
  lockScreenEl
    .querySelector("[data-lock-screen-temp-icon]")
    .classList.add("bx", "bx-sun");
  menuScreenEl
    .querySelector("[data-menu-screen-temp-icon]")
    .classList.add("bx", "bx-sun");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#fcba03");
}

function cloudyTemp() {
  lockScreenEl
    .querySelector("[data-lock-screen-temp-icon]")
    .classList.add("bx", "bx-cloud");
  menuScreenEl
    .querySelector("[data-menu-screen-temp-icon]")
    .classList.add("bx", "bx-cloud");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#b3b3b3");
}

function rainyTemp() {
  lockScreenEl
    .querySelector("[data-lock-screen-temp-icon]")
    .classList.add("bx", "bx-cloud-rain");
  menuScreenEl
    .querySelector("[data-menu-screen-temp-icon]")
    .classList.add("bx", "bx-cloud-rain");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#3c738f");
}

function snowyTemp() {
  lockScreenEl
    .querySelector("[data-lock-screen-temp-icon]")
    .classList.add("bx", "bx-cloud-snow");
  menuScreenEl
    .querySelector("[data-menu-screen-temp-icon]")
    .classList.add("bx", "bx-cloud-snow");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#64c7fa");
}

function lockScreen() {
  passwordInputsChildren.forEach((element, index) => {
    element.innerHTML = "";
    if (index != 0) {
      element.classList.remove("current-input");
    }
    passwordScreenEl
      .querySelector("[data-password-screen-inputs]")
      .children[0].classList.add("current-input");
  });
  currentInput = 0;

  background.classList.remove("blur");

  lockScreenEl.classList.add("show");
  passwordScreenEl.classList.remove("show");
  menuScreenEl.classList.remove("show");

  menuScreenEl.querySelector("[data-menu-screen-button]").classList.add("move");
  lockScreenEl
    .querySelector("[data-lock-screen-button]")
    .classList.remove("move");

  menuScreenEl
    .querySelector("[data-menu-screen-notifications]")
    .classList.add("move");
  menuScreenEl.querySelector("[data-menu-screen-tags]").classList.add("move");
  menuScreenEl
    .querySelector("[data-menu-screen-socials]")
    .classList.add("move");

  lockScreenEl
    .querySelector("[data-lock-screen-data]")
    .classList.remove("move");
  menuScreenEl.querySelector("[data-menu-screen-data]").classList.add("move");

  sections.forEach((section) => {
    section.classList.add("move");
  });
}

function passwordScreen() {
  background.classList.add("blur");

  lockScreenEl.classList.remove("show");
  menuScreenEl.classList.remove("show");
  passwordScreenEl.classList.add("show");

  lockScreenEl.querySelector("[data-lock-screen-button]").classList.add("move");

  lockScreenEl.querySelector("[data-lock-screen-data]").classList.add("move");
}

function menuScreen() {
  background.classList.remove("blur");

  lockScreenEl.classList.remove("show");
  passwordScreenEl.classList.remove("show");
  menuScreenEl.classList.add("show");

  menuScreenEl
    .querySelector("[data-menu-screen-button]")
    .classList.remove("move");

  menuScreenEl
    .querySelector("[data-menu-screen-notifications]")
    .classList.remove("move");
  menuScreenEl
    .querySelector("[data-menu-screen-tags]")
    .classList.remove("move");
  menuScreenEl
    .querySelector("[data-menu-screen-socials]")
    .classList.remove("move");

  menuScreenEl
    .querySelector("[data-menu-screen-data]")
    .classList.remove("move");

  sections.forEach((section) => {
    section.classList.remove("move");
  });
}

function checkPage() {
  if (page == "lock screen") {
    lockScreen();
  } else if (page == "password screen") {
    passwordScreen();
  } else if (page == "menu screen") {
    menuScreen();
  }
}

checkPage();
checkTemp();

lockScreenEl
  .querySelector("[data-lock-screen-button]")
  .addEventListener("click", () => {
    page = "password screen";
    checkPage();
  });

menuScreenEl
  .querySelector("[data-menu-screen-button]")
  .addEventListener("click", () => {
    page = "lock screen";
    checkPage();
  });

document.addEventListener("keydown", (e) => {
  if (page != "password screen") {
    currentInput = 0;
  }

  if (e.keyCode == 8 && currentInput > 0) {
    currentInput--;
    passwordInputsChildren[currentInput].innerHTML = "";
    passwordInputsChildren.forEach((element, index) => {
      if (index != currentInput) {
        element.classList.remove("current-input");
      }
    });
    passwordInputsChildren[currentInput].classList.add("current-input");
    return;
  }
  if (currentInput >= passwordInputsChildren.length) return;
  if (isNaN(parseInt(e.key))) return;

  passwordInputsChildren[currentInput].innerHTML = e.key;

  currentInput++;

  passwordInputsChildren.forEach((element, index) => {
    if (element.classList.contains("invalid")) {
      element.classList.remove("invalid");
    }
    if (index != currentInput) {
      element.classList.remove("current-input");
    }
  });
  if (currentInput < passwordInputsChildren.length) {
    passwordInputsChildren[currentInput].classList.add("current-input");
  }

  if (currentInput == passwordInputsChildren.length) {
    let usersPin = "";
    passwordInputsChildren.forEach((element) => {
      usersPin += element.innerHTML;
    });
    if (usersPin == pin) {
      page = "menu screen";
      checkPage();
    } else {
      passwordInputsChildren.forEach((element) => {
        element.classList.add("invalid");
      });
    }
  }
});

lockScreenEl.querySelector(
  "[data-lock-screen-time]"
).innerText = `${hour}:${minute}`;
menuScreenEl.querySelector(
  "[data-menu-screen-time]"
).innerText = `${hour}:${minute}`;
setInterval(() => {
  time = new Date();

  if (time.getSeconds() != 0) return;

  let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  let minute =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  lockScreen.querySelector(
    "[data-lock-screen-time]"
  ).innerText = `${hour}:${minute}`;
  menuScreenEl.querySelector(
    "[data-menu-screen-time]"
  ).innerText = `${hour}:${minute}`;
}, 1000);

lockScreenEl.querySelector("[data-lock-screen-temp]").innerText = temp;
menuScreenEl.querySelector("[data-menu-screen-temp]").innerText = temp;

document.querySelector("[data-password-pin]").textContent += ` (${pin})`;
document
  .querySelector("[data-cancel-password]")
  .addEventListener("click", () => {
    page = "lock screen";
    checkPage();
  });

notifications.forEach((notification) => {
  menuScreenEl.querySelector("[data-menu-screen-notifications]").innerHTML += `
  <div class="notifications__notification">
  <i class="bx bx-bell"></i>
  <p>${notification.name}</p>
  <span>${notification.hour < 12 ? notification.hour : notification.hour - 12}${
    notification.hour < 12 ? "AM" : "PM"
  }</span>
  </div>
  `;
});

const menuNotificationsChildren = Array.from(
  menuScreenEl.querySelector("[data-menu-screen-notifications]").children
);

menuNotificationsChildren.forEach((element, index) => {
  let icon = element.children[0];

  element.addEventListener("mouseover", () => {
    icon.classList.remove(notifications[index].icon);
    icon.classList.add("bx-x");
  });

  element.addEventListener("mouseleave", () => {
    icon.classList.remove("bx-x");
    icon.classList.add(notifications[index].icon);
  });

  icon.addEventListener("click", () => {
    icon.parentElement.remove();
  });
});

tags.forEach((tag) => {
  menuScreenEl.querySelector("[data-menu-screen-tags]").innerHTML += `
    <div class="tags__tag">
      <p>${tag}</p>
    </div>
  `;
});

socials.forEach((social) => {
  menuScreenEl.querySelector("[data-menu-screen-socials]").innerHTML += `
    <a href="${social.link}" target="_blank" class="socials__social">
      <i class="bx ${social.icon}" style="color: ${social.color}"></i>
      <p>${social.name}</p>
    </a>
  `;
});

let day = time.getDay();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let arrangedDays = [];
let arrangedWeather = [];

for (let j = 0; j < days.length; j++) {
  arrangedDays[j] = days[day];
  arrangedWeather[j] = weather[day];

  day++;
  if (day > days.length - 1) {
    day = 0;
  }
}

arrangedWeather.forEach((item, index) => {
  menuScreenEl.querySelector("[data-weather-forecast]").innerHTML += `
    <div class="weather__weather-box">
      <div><p>${item.temp}</p><small>°</small><small>C</small></div>
      <img src="assets/${item.img}.png" />
      <h3>${arrangedDays[index]}</h3>
    </div>
  `;
});

meals.forEach((meal) => {
  menuScreenEl.querySelector("[data-menu-meals]").innerHTML += `
    <div class="meals__meal">
      <img src="./assets/${meal.img}.jpg" />
      <div class="meal__content">
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
      </div>
    </div>
  `;
});

whatsAppening.forEach((item) => {
  menuScreenEl.querySelector("[data-whats-appening]").innerHTML += `
    <div class="whats-appening__box" style="background-image: url('./assets/${item.img}.jpg')">
      <div class="whats-appening__box-content">
      <span>${item.tag}</span>
      <h3>${item.title}</h3>
        <i class="${item.icon}" />
  `;
});

movieCards.forEach((card, index) => {
  menuScreenEl.querySelector("[data-popcorn-time]").innerHTML += `
    <div class="popcorn-time__movie-card">
      <img src="./assets/movie${index + 1}.jpg" />
      <div class="movie-card__content" style="background: linear-gradient(to bottom, transparent 70%, ${
        card.color
      })">
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <i class="${card.icon}"></i>
      </div>
    </div>
  `;
});
