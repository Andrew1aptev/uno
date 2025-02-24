function modalInit() {
    const modalDialog = document.getElementById("modal");
    const buttonCartOpen = document.getElementById("open-button-modal");
    const buttonCartClose = document.getElementById("close-button-modal");

    function showModalWindow() {
        modalDialog.showModal();
        document.body.classList.add("scroll-lock");
    }
    function closeModalWindow() {
        modalDialog.close();
        document.body.classList.remove("scroll-lock");
    }
    function closeOnBackDropClick({ currentTarget, target }) {
        const dialogElement = currentTarget
        const isClickedOnBackDrop = target === dialogElement
        if (isClickedOnBackDrop) {
            modalDialog.close()
            document.body.classList.remove("scroll-lock");
        }
    }

    buttonCartOpen.addEventListener("click", showModalWindow);
    buttonCartClose.addEventListener("click", closeModalWindow);
    modalDialog.addEventListener("click", closeOnBackDropClick);
}
modalInit();

const dialogPolyfillURL = "https://esm.run/dialog-polyfill"
const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined
/**
 * Подключаем полифил к каждому dialog на странице,
 * если в браузере нет поддержки
**/
if (isBrowserNotSupportDialog) {
    const dialogs = document.querySelectorAll("dialog")

    dialogs.forEach(async (dialog) => {
        const { default: polyfill } = await import(dialogPolyfillURL)
        polyfill.registerDialog(dialog)
    })
}