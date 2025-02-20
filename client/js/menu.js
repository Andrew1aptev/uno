const header = document.querySelector(".header");
const headerButton = document.querySelector(".header__mobile-button");

function addClassOnClick() {
  headerButton.addEventListener("click", () => {
    header.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });
}

// Инициализация функции
addClassOnClick();
