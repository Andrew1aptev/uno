const header = document.querySelector(".header");
const headerButton = document.querySelector(".header__mobile-button")

function addClassOnClick () {
  headerButton.addEventListener("click", () =>{
    header.classList.toggle("open");
    document.body.classList.toggle('no-scroll');
  })
}
addClassOnClick()
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 10,
    // autoHeight: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

let prevScrollPos = window.pageYOffset;
window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if(prevScrollPos > currentScrollPos) {
        header.style.transform = "translate3d(0, 0, 0)";
    } else{
        header.style.transform = "translate3d(0, -100%, 0)";
    }
    prevScrollPos = currentScrollPos;
}
// Найти контейнер вкладок
const tabsContainer = document.querySelector(".catalog__tabs-container");
// Найти список вкладок (ul)
const tabsList = document.querySelector(".catalog__tabs-list");
// Найти все кнопки вкладок (a)
const tabButtons = document.querySelectorAll(".catalog__tabs-button");
// Найти все панели вкладок (div)
const tabPanels = tabsContainer.querySelectorAll(".catalog__tabs-panels > .catalog__tab");

// Установить роль tablist для списка вкладок
tabsList.setAttribute("role", "tablist");
// Установить роль presentation для каждого элемента списка
tabsList.querySelectorAll("li").forEach((listitem) => {
    listitem.setAttribute("role", "presentation")
})
// Установить роль tab для каждой кнопки вкладки и начальные атрибуты
tabButtons.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    if(index === 0) {
        tab.setAttribute("aria-selected", "true") // Выбранная вкладка по умолчанию
    } else{
        tab.setAttribute("tabindex", "-1") // Невыбранные вкладки не фокусируются
        tabPanels[index].setAttribute("hidden", ""); // Скрыть панели вкладок
    }
});
// Установить роль tabpanel для каждой панели вкладки и начальные атрибуты
tabPanels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel")
    panel.setAttribute("tabindex", "0") // Панели вкладок могут быть сфокусированы
})
// Добавить обработчик кликов на контейнер вкладок
tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a");
    if(!clickedTab) return; // Игнорировать клики вне кнопок вкладок
    console.log(clickedTab);
    e.preventDefault();
    switchTab(clickedTab) // Переключиться на новую вкладку
});
// Добавить обработчик клавиатурных событий на контейнер вкладок
tabsContainer.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft(); // Переместиться к левой вкладке
            break;

        case "ArrowRight":
            moveRight(); // Переместиться к правой вкладке
            break;
        case "Home":
            e.preventDefault();
            switchTab(tabButtons[0]); // Переключиться на первую вкладку
            break;
        case "End":
            e.preventDefault();
            switchTab(tabButtons[tabButtons.length - 1]); // Переключиться на последнюю вкладку
            break;
    }
})
// Функция для перемещения к левой вкладке
function moveLeft() {
    const currentTab = document.activeElement;
    if (!currentTab.parentElement.previousElementSibling){
        switchTab(tabButtons[tabButtons.length - 1]); // Переключиться на последнюю вкладку, если текущая - первая
    } else{
        switchTab(currentTab.parentElement.previousElementSibling.querySelector("a")); // Переключиться на предыдущую вкладку
    }
}
// Функция для перемещения к правой вкладке
function moveRight() {
    const currentTab = document.activeElement;
    if (!currentTab.parentElement.nextElementSibling){
        switchTab(tabButtons[0]); // Переключиться на первую вкладку, если текущая - последняя
    } else{
        switchTab(currentTab.parentElement.nextElementSibling.querySelector("a")); // Переключиться на следующую вкладку
    }
}
// Функция для переключения вкладок
function switchTab(newTab) {
    const activePanelId = newTab.getAttribute("href");
    const activePanel = tabsContainer.querySelector(activePanelId);
    
    // Обновить атрибуты всех кнопок вкладок
    tabButtons.forEach((button) => {
        button.setAttribute("aria-selected", false);
        button.setAttribute("tabindex", "-1");
    });
    
    // Скрыть все панели вкладок
    tabPanels.forEach((panel) => {
        panel.setAttribute("hidden", true);
    });

    // Показать активную панель и обновить атрибуты выбранной вкладки
    activePanel.removeAttribute("hidden");
    newTab.setAttribute("aria-selected", true);
    newTab.setAttribute("tabindex", "0");
    newTab.focus();
}
