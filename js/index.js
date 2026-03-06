let nextBtn = document.querySelector("#Carousel button.next"),
  prevBtn = document.querySelector("#Carousel button.prev"),
  carouselSliders = document.querySelectorAll("#Carousel .my-carousel-item"),
  navEle = document.querySelector(".navbar"),
  navEleHight = navEle.clientHeight,
  titleImgs = document.querySelectorAll(".title img"),
  navLinks = navEle.querySelectorAll(".nav-link"),
  loading = document.querySelector("#loading"),
  popupBoxes = document.querySelectorAll(".popup .box"),
  latestContentEle = document.querySelector("#Latest .content"),
  featuresContentEle = document.querySelector("#Featured .content .row"),
  productsCart = [],
  shopPopup = document.querySelector(`.popup[data-type="shop"] .box .row`);

(function () {
  if (localStorage.getItem("productsCart") == null) {
    updateLocalstorage();
  } else {
    productsCart = JSON.parse(localStorage.getItem("productsCart"));
  }
})();
ShopPopUp();
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
latest.forEach(function (product) {
  let isProductInCart = productsCart.find(function (item) {
    return item.id == product.id;
  });
  latestContentEle.innerHTML += `
   <div class="product bg-light p-3 rounded-3 mainBorder mb-3" 
   data-product-id="${product.id}" 
    data-selected-color="${isProductInCart == undefined ? product.colors[0] : isProductInCart.color}"
   data-selected-size="${isProductInCart == undefined ? product.sizes[0] : isProductInCart.size}">
      <div class="row">
        <div class="col-lg-6">
          <div class="item">
            <div class="row">
              <div class="col-md-2 part1">
                <ul class="list-unstyled d-md-block d-flex">
                 ${showListImages(product.images)}
                </ul>
              </div>
              <div class="col-md-10 m-auto part2">
                <div class="selectedImg">
                  <img src="images/products/${product.images[0]}" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="item">
            <h2 class="mainColor">${product.name}</h2>
            <p class="text-secondary">
           ${product.description}
            </p>
             <div class="d-flex price">
                 <div class="label"><h6 class="mb-0 fw-bolder me-3">Price :</h6></div>
                    ${showPrice(product.price, product.discount)}
            </div>
            <div class="d-flex size mt-3">
              <div class="label"><h6 class="mb-0 fw-bolder me-2">Size :</h6></div>
              <div class="value">
                <ul class="list-unstyled d-flex">
                 ${showSize(product.sizes, isProductInCart)}
                </ul>
              </div>
            </div>
            ${createBtn(isProductInCart, product.id)}
           
          </div>
        </div>
      </div>
    </div>`;
});
features.forEach(function (product) {
  featuresContentEle.innerHTML += `
   <div class="col-lg-3 col-sm-6 product text-center mb-4">
      <div class="item rounded-4 bg-light overflow-hidden">
        <div class="header">
          ${showDiscount(product.discount)}
          <div class="selectedImg">
            <img src="images/products/${product.images[0]}" alt="" class="img-fluid" />
          </div>
          <i class="fas fa-search key rounded-circle" onclick="openPopup('product');openProductPopup(${product.id})"></i>
          <ul class="list-unstyled d-flex justify-content-center mb-0">
         ${showLiListInFeatures(product.images)} 
          </ul>
        </div>
        <div class="body py-3">
          <h6>${product.name}</h6>
          ${showPrice(product.price, product.discount)}
        </div>
      </div>
    </div>
   `;
});
function ShopPopUp() {
  shopPopup.innerHTML = ``;
  productsCart.forEach(function (item) {
    let product = getProduct(item.id);
    shopPopup.innerHTML += `
    <div class="col-md-4 mb-3">
      <div class="product">
        <div class="item bg-light rounded-3 p-3">
          <div class="header">
            <div class="selectedImg">
              <img src="images/products/${product.images[0]}" alt="" class="img-fluid" />
            </div>
          </div>
          <div class="body">
            <p>${product.name}</p>
           ${showPrice(product.price, product.discount)}
        <div class="d-flex size mt-3">
              <div class="label"><h6 class="mb-0 fw-bolder me-2 text-nowrap">Size :</h6></div>
              <div class="value">
                <ul class="list-unstyled d-flex">
                 ${showSize(Array.from(item.size))}
                </ul>
              </div>
            </div>
               
             <div class="d-flex color">
              <div class="label"><h6 class="mb-0 fw-bolder me-2 text-nowrap">Color :</h6></div>
              <div class="value">
                <ul class="list-unstyled d-flex">
                 ${showColor(Array.from(item.color))}
                </ul>
              </div>
            </div>
          </div>
          <button class="btn mainButton w-100 mt-2">Remove</button>
        </div>
      </div>
  </div>
`;
  });
}
