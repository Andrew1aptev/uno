const header = document.querySelector(".header");

let prevScrollPos = window.pageYOffset;
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    header.style.transform = "translate3d(0, 0, 0)";
  } else {
    header.style.transform = "translate3d(0, -100%, 0)";
  }
  prevScrollPos = currentScrollPos;
};
