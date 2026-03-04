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
function showListImages(imagesList) {
  let imagesInLi = ``;
  imagesList.forEach(function (productImage) {
    imagesInLi += ` 
    <li  onclick="changeSelectedImage(this,'${productImage}')"class="mainBorder rounded-3 me-3 me-md-0 mb-md-3 p-2">
       <img src="images/products/${productImage}" alt="" class="img-fluid" />
    </li>`;
  });
  return imagesInLi;
}
function showPrice(price, discount) {
  return `
     <div class="value">
        <span class="mainColor text-decoration-line-through me-2 mb-0 ${discount == 0 ? "d-none" : ""}">${price}<sup>$</sup></span>
        <span class="mb-0">${(price * (1 - discount)).toFixed(2)}<sup>$</sup></span>
      </div>
  `;
}
function showSize(sizeList) {
  let sizeInLi = ``;
  sizeList.forEach(function (productSizes, index) {
    sizeInLi += ` 
     <li class="mainButton rounded-2 me-2 ${index == 0 ? "active" : ""}">${productSizes}</li>
      `;
  });
  return sizeInLi;
}
function showLiListInFeatures(List) {
  let Lis = ``;
  List.forEach(function (LiContent, index) {
    Lis += ` 
    <li onclick="changeSelectedImage(this,'${LiContent}');changeActive(this)" class="mainButton rounded-circle ${index == List.length - 1 ? "" : "me-3"}  ${index == 0 ? "active" : ""}"></li>
      `;
  });
  return Lis;
}
function changeSelectedImage(that, selectedImage) {
  let currentProduct = that.closest(".product"),
    currentImage = currentProduct.querySelector(".selectedImg img"),
    currentSrc = currentImage.src,
    imgArr = currentSrc.split("/");
  imgArr[imgArr.length - 1] = selectedImage;
  currentImage.src = imgArr.join("/");
}
function changeActive(that) {
  let ulEle = that.closest("ul"),
    currentActive = ulEle.querySelector(".active");
  currentActive.classList.remove("active");
  that.classList.add("active");
}
