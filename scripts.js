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

const lockScreenPage = document.querySelector("[data-lock-screen-page]");
const passwordScreenPage = document.querySelector(
  "[data-password-screen-page]"
);
const menuScreenPage = document.querySelector("[data-menu-screen-page]");

const lockScreenData = document.querySelector("[data-lock-screen-data]");
const lockScreenTime = document.querySelector("[data-lock-screen-time]");
const lockScreenTemp = document.querySelector("[data-lock-screen-temp]");
const lockScreenTempIcon = document.querySelector(
  "[data-lock-screen-temp-icon]"
);
const lockScreenButton = document.querySelector("[data-lock-screen-button]");

const passwordScreenInputs = document.querySelector(
  "[data-password-screen-inputs]"
);

const menuScreenData = document.querySelector("[data-menu-screen-data]");
const menuScreenTime = document.querySelector("[data-menu-screen-time]");
const menuScreenTemp = document.querySelector("[data-menu-screen-temp]");
const menuScreenTempIcon = document.querySelector(
  "[data-menu-screen-temp-icon]"
);
const menuScreenButton = document.querySelector("[data-menu-screen-button]");
const menuNotificationsEl = document.querySelector(
  "[data-menu-screen-notifications]"
);
const menuTagsEl = document.querySelector("[data-menu-screen-tags]");
const menuSocialsEl = document.querySelector("[data-menu-screen-socials]");
const weatherForecastEl = document.querySelector("[data-weather-forecast]");
const menuMealsEl = document.querySelector("[data-menu-meals]");
const menuWhatsAppeningEl = document.querySelector("[data-whats-appening]");
const menuMovieCardsEl = document.querySelector("[data-popcorn-time]");

const pin = Math.floor(Math.random() * 9000) + 1000;

const notifications = Array.from(notificationsData);
const tags = Array.from(tagsData);
const socials = Array.from(socialsData);
const weather = Array.from(weatherData);
const meals = Array.from(mealsData);
const whatsAppening = Array.from(whatsAppeningData);
const movieCards = Array.from(movieCardsData);

const passwordInputsChildren = Array.from(passwordScreenInputs.children);

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
  lockScreenTempIcon.classList.add("bx", "bx-sun");
  menuScreenTempIcon.classList.add("bx", "bx-sun");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#fcba03");
}

function cloudyTemp() {
  lockScreenTempIcon.classList.add("bx", "bx-cloud");
  menuScreenTempIcon.classList.add("bx", "bx-cloud");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#b3b3b3");
}

function rainyTemp() {
  lockScreenTempIcon.classList.add("bx", "bx-cloud-rain");
  menuScreenTempIcon.classList.add("bx", "bx-cloud-rain");

  document
    .querySelector("body")
    .style.setProperty("--temp-icon-color", "#3c738f");
}

function snowyTemp() {
  lockScreenTempIcon.classList.add("bx", "bx-cloud-snow");
  menuScreenTempIcon.classList.add("bx", "bx-cloud-snow");

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
    passwordScreenInputs.children[0].classList.add("current-input");
  });
  currentInput = 0;

  background.classList.remove("blur");

  lockScreenPage.classList.add("show");
  passwordScreenPage.classList.remove("show");
  menuScreenPage.classList.remove("show");

  menuScreenButton.classList.add("move");
  lockScreenButton.classList.remove("move");

  menuNotificationsEl.classList.add("move");
  menuTagsEl.classList.add("move");
  menuSocialsEl.classList.add("move");

  lockScreenData.classList.remove("move");
  menuScreenData.classList.add("move");

  sections.forEach((section) => {
    section.classList.add("move");
  });
}

function passwordScreen() {
  background.classList.add("blur");

  lockScreenPage.classList.remove("show");
  menuScreenPage.classList.remove("show");
  passwordScreenPage.classList.add("show");

  lockScreenButton.classList.add("move");

  lockScreenData.classList.add("move");
}

function menuScreen() {
  background.classList.remove("blur");

  lockScreenPage.classList.remove("show");
  passwordScreenPage.classList.remove("show");
  menuScreenPage.classList.add("show");

  menuScreenButton.classList.remove("move");

  menuNotificationsEl.classList.remove("move");
  menuTagsEl.classList.remove("move");
  menuSocialsEl.classList.remove("move");

  menuScreenData.classList.remove("move");

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

lockScreenButton.addEventListener("click", () => {
  page = "password screen";
  checkPage();
});

menuScreenButton.addEventListener("click", () => {
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

lockScreenTime.innerText = `${hour}:${minute}`;
menuScreenTime.innerText = `${hour}:${minute}`;
setInterval(() => {
  time = new Date();

  if (time.getSeconds() != 0) return;

  let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  let minute =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  lockScreenTime.innerText = `${hour}:${minute}`;
  menuScreenTime.innerText = `${hour}:${minute}`;
}, 1000);
lockScreenTemp.innerText = temp;
menuScreenTemp.innerText = temp;

document.querySelector("[data-password-pin]").textContent += ` (${pin})`;
document
  .querySelector("[data-cancel-password]")
  .addEventListener("click", () => {
    page = "lock screen";
    checkPage();
  });

notifications.forEach((notification) => {
  menuNotificationsEl.innerHTML += `
  <div class="notifications__notification">
  <i class="bx bx-bell"></i>
  <p>${notification.name}</p>
  <span>${notification.hour < 12 ? notification.hour : notification.hour - 12}${
    notification.hour < 12 ? "AM" : "PM"
  }</span>
  </div>
  `;
});

const menuNotificationsChildren = Array.from(menuNotificationsEl.children);

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
  menuTagsEl.innerHTML += `
    <div class="tags__tag">
      <p>${tag}</p>
    </div>
  `;
});

socials.forEach((social) => {
  menuSocialsEl.innerHTML += `
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
  weatherForecastEl.innerHTML += `
    <div class="weather__weather-box">
      <div><p>${item.temp}</p><small>°</small><small>C</small></div>
      <img src="assets/${item.img}.png" />
      <h3>${arrangedDays[index]}</h3>
    </div>
  `;
});

meals.forEach((meal) => {
  menuMealsEl.innerHTML += `
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
  menuWhatsAppeningEl.innerHTML += `
    <div class="whats-appening__box" style="background-image: url('./assets/${item.img}.jpg')">
      <div class="whats-appening__box-content">
      <span>${item.tag}</span>
      <h3>${item.title}</h3>
        <i class="${item.icon}" />
  `;
});

movieCards.forEach((card, index) => {
  menuMovieCardsEl.innerHTML += `
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
