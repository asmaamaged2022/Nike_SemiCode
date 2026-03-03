let nextBtn = document.querySelector("#Carousel button.next"),
  prevBtn = document.querySelector("#Carousel button.prev"),
  carouselSliders = document.querySelectorAll("#Carousel .my-carousel-item"),
  navEle = document.querySelector(".navbar"),
  navEleHight = navEle.clientHeight,
  titleImgs = document.querySelectorAll(".title img"),
  navLinks = navEle.querySelectorAll(".nav-link"),
  loading = document.querySelector("#loading"),
  popupBoxes = document.querySelectorAll(".popup .box");

nextBtn.addEventListener("click", function () {
  let currentSlide = document.querySelector("#Carousel .my-carousel-item.active"),
    nextSlide = currentSlide.nextElementSibling ?? document.querySelector("#Carousel .my-carousel-item:first-child"),
    nextColor = nextSlide.dataset.colorName;
  changeMainColor(nextColor);
  currentSlide.classList.remove("active");
  nextSlide.classList.add("active");
});
prevBtn.addEventListener("click", function () {
  let currentSlide = document.querySelector("#Carousel .my-carousel-item.active"),
    prevSlide = currentSlide.nextElementSibling ?? document.querySelector("#Carousel .my-carousel-item:first-child"),
    prevColor = prevSlide.dataset.colorName;
  changeMainColor(prevColor);
  currentSlide.classList.remove("active");
  prevSlide.classList.add("active");
});
window.addEventListener("DOMContentLoaded", function () {
  carouselSliders[0].classList.add("active");
  loading.classList.add("hide");
  // to Save active link
  let savedLink = localStorage.getItem("activeLink");

  if (savedLink) {
    let currentActive = navEle.querySelector(".nav-link.active");
    if (currentActive) {
      currentActive.classList.remove("active");
    }
    let newActive = navEle.querySelector(`a[href="${savedLink}"]`);
    if (newActive) {
      newActive.classList.add("active");
    }
  }
});
window.addEventListener("scroll", function (e) {
  if (window.scrollY > navEleHight) {
    navEle.classList.add("scrolled");
  } else {
    navEle.classList.remove("scrolled");
  }
});
navLinks.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let oldLink = navEle.querySelector(".nav-link.active"),
      sectionId = item.getAttribute("href"),
      section = document.querySelector(`${sectionId}`),
      sectionHight = section.offsetTop;
    oldLink.classList.remove("active");
    item.classList.add("active");
    localStorage.setItem("activeLink", sectionId);
    window.scrollTo({
      top: sectionHight - navEleHight,
    });
  });
});
popupBoxes.forEach(function (popupBox) {
  popupBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
