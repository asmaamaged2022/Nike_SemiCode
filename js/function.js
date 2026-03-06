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
function showListImages(imagesList, fromPopupProduct = false) {
  let imagesInLi = ``;
  imagesList.forEach(function (productImage) {
    imagesInLi += ` 
    <li  onclick="changeSelectedImage(this,'${productImage}')"class=" ${fromPopupProduct ? "" : "mainBorder rounded-3 mb-md-3"} me-3 me-md-0  p-2">
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
function showSize(sizeList, isProductInCart) {
  let sizeInLi = ``;
  if (isProductInCart == undefined) {
    sizeList.forEach(function (productSizes, index) {
      sizeInLi += ` 
     <li class="mainButton rounded-2 me-2 ${index == 0 ? "active" : ""}" onclick="changeActive(this) ; updateSize(this)">${productSizes}</li>
      `;
    });
  } else {
    sizeList.forEach(function (productSizes, index) {
      sizeInLi += ` 
     <li class="mainButton rounded-2 me-2 ${isProductInCart.size == productSizes ? "active" : ""}" onclick="changeActive(this) ; updateSize(this)">${productSizes}</li>
      `;
    });
  }
  return sizeInLi;
}
function showColor(ColorList, isProductInCart) {
  let colorInLi = ``;
  if (isProductInCart == undefined) {
    ColorList.forEach(function (productColor, index) {
      colorInLi += `
      <li 
        class="rounded-circle me-2 ${index === 0 ? "active" : ""}" 
        style="background-color:${productColor}; width:16px; height:16px;"
        onclick="changeActive(this);updateColor(this,'${productColor}')">
      </li>
    `;
    });
  } else {
    ColorList.forEach(function (productColor, index) {
      colorInLi += `
      <li 
        class="rounded-circle me-2 ${isProductInCart.color == productColor ? "active" : ""}" 
        style="background-color:${productColor}; width:16px; height:16px;"
        onclick="changeActive(this);updateColor(this,'${productColor}')">
      </li>
    `;
    });
  }

  return colorInLi;
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
function showDiscount(discount) {
  let value = ``;
  if (discount) {
    value = `<p class="text-light">-${discount * 100}%</p>`;
  }
  return value;
}
function getProduct(id) {
  return products.find((product) => product.id == id);
}
function openProductPopup(id) {
  let product = getProduct(id),
    productContentInPopup = document.querySelector(`.popup[data-type="product"] .box`),
    isProductInCart = productsCart.find(function (item) {
      return item.id == product.id;
    });
  productContentInPopup.innerHTML = `
   <div class="row product"
   data-product-id="${product.id}" 
  data-selected-color="${isProductInCart == undefined ? product.colors[0] : isProductInCart.color}"
   data-selected-size="${isProductInCart == undefined ? product.sizes[0] : isProductInCart.size}">
          <div class="col-md-6">
            <div class="item">
              <div class="selectedImg">
                <img src="images/products/${product.images[0]}" alt="" class="img-fluid" />
              </div>
              <div class="imageList">
                <ul class="list-unstyled d-flex">
                ${showListImages(product.images, true)}
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="item">
              <h3>Basketball Shoes</h3>
              ${showPrice(product.price, product.discount)}
              <hr />
              <p>
               ${product.description}
              </p>

              <div class="d-flex size mt-3">
              <div class="label"><h6 class="mb-0 fw-bolder me-2">Size :</h6></div>
              <div class="value">
                <ul class="list-unstyled d-flex">
                 ${showSize(product.sizes, isProductInCart)}
                </ul>
              </div>
            </div>
               
             <div class="d-flex color my-3">
              <div class="label"><h6 class="mb-0 fw-bolder me-2">Color :</h6></div>
              <div class="value">
                <ul class="list-unstyled d-flex">
                 ${showColor(product.colors, isProductInCart)}
                </ul>
              </div>
            </div>
              ${createBtn(isProductInCart, product.id)}
              </div>
          </div>
        </div>
  `;
}
function addToCart(that, id) {
  let product = getProduct(id),
    productEle = document.querySelector(`.product[data-product-id="${product.id}"]`),
    newOrder = {
      id: id,
      color: productEle.getAttribute("data-selected-color"),
      size: productEle.getAttribute("data-selected-size"),
    };
  productsCart.push(newOrder);
  updateLocalstorage();
  ShopPopUp();
  toggleCartBtn(that, "remove");
  that.setAttribute("onclick", `removeFromCart(this, ${product.id})`);
}
function removeFromCart(that, id) {
  productsCart = productsCart.filter(function (item) {
    return item.id != id;
  });
  updateLocalstorage();
  ShopPopUp();
  toggleCartBtn(that, "add");
  that.setAttribute("onclick", `addToCart(this,${id})`);
}
function toggleCartBtn(btn, status) {
  if (status == "add") {
    btn.textContent = "Add To Cart";
    btn.classList.remove("remove");
  } else if (status == "remove") {
    btn.textContent = "Remove From Cart";
    btn.classList.add("remove");
  }
}
function updateSize(that) {
  let value = that.textContent;
  that.closest(".product").setAttribute("data-selected-size", value);
}
function updateColor(that, color) {
  let product = that.closest(".product");
  product.setAttribute("data-selected-color", color);
}
function updateLocalstorage() {
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
}
function createBtn(status, productId) {
  return status == undefined
    ? ` <button class="btn mainButton" onclick="addToCart(this,${productId})">
                  Add To Cart
                </button>`
    : ` <button class="btn mainButton remove" onclick="removeFromCart(this,${productId})">
                  Remove From Cart
                </button>`;
}
