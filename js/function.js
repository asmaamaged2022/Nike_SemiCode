function changeMainColor(colorName) {
  let html = document.querySelector("html"),
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName.split("-")[0]}Color`);
  changeLogoImage(colorName.split("-")[0]);
  changeTitleImg(colorName.split("-")[0]);
  html.style.setProperty("--mainColor", newColor);
}
function changeLogoImage(ImgName) {
  let currentLogo = Logo.src,
    currentImaArr = currentLogo.split("/");
  currentImaArr[currentImaArr.length - 1] = `${ImgName}-logo.png`;
  Logo.src = currentImaArr.join("/");
  Icon.href = currentImaArr.join("/");
}
function changeTitleImg(imgName) {
  titleImgs.forEach(function (img) {
    let currentImg = img.getAttribute("src"),
      currentImaArr = currentImg.split("/");
    currentImaArr[currentImaArr.length - 1] = `${imgName}-correct.png`;
    img.setAttribute("src", currentImaArr.join("/"));
  });
}
function openPopup(popUpName) {
  let popupEle = document.querySelector(`.popup[data-type="${popUpName}"]`);
  popupEle.classList.add("active");
  setTimeout(function () {
    popupEle.classList.add("show");
  }, 100);
}
function closePopup() {
  let popupEle = document.querySelector(".popup.active");
  popupEle.classList.remove("show");
  setTimeout(function () {
    popupEle.classList.remove("active");
  }, 500);
}
