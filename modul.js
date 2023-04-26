getData().then((products) => {
  if (products) {
    products.forEach((product) => {

    newTextSection.append(createElement('h2', product.title));

    const modalDetails = createElement("div");
    const openButton = createElement("button");
    const closeButton = createElement("button");
    

    modalDetails.setAttribute("class", "modal-details hide");
    openButton.classList.add("open-button");
    closeButton.classList.add("close-button");
    openButton.innerText = "View more details";
    newTextSection.append(modalDetails, openButton);
    modalDetails.innerText = "";
    closeButton.innerText = "x";

    
    modalDetails.inWindow = 0;
    openButton.addEventListener("click", () => {
      if (modalDetails.classList.contains("hide")) {
        modalDetails.classList.remove("hide"),
          openButton.classList.add("hide");
      }
    });

    closeButton.addEventListener("click", () => {
      if (modalDetails.inWindow === 0) {
        modalDetails.classList.add("hide"),
          openButton.classList.remove("hide");
      }
    });
    const modalHeader = createElement("div");
    const modalImageContainer = createElement("div");
    const modalDots = document.createElement("div");
    const modalFooter = createElement("div");
    const modalPrice = createElement("span");
    const modalCart = createElement("button");
    const modalImage = document.createElement("img");
    const modalPrev = document.createElement("button");
    const modalNext = document.createElement("button");
    

    let modalIndex = 0;
        modalImage.src = product.images[modalIndex];
  
        // newImage.src = product.images[imageIndex];
        modalPrev.innerText = "<";
        modalNext.innerText = ">";
        modalImageContainer.classList.add("modal-container");
        modalPrev.classList.add("modal-prev");
        modalNext.classList.add("modal-next");
        modalDots.classList.add("dotM-container");
        modalImageContainer.innerText = " ";
  
        modalDotsForImages();
  
        let modalArr = Array.from(modalDots.childNodes);
        modalArr[0].classList.add("active");
  
        function modalPreviousImage() {
          if (modalIndex === 0) {
            modalIndex = product.images.length - 1;
            modalImage.src = product.images[modalIndex];
            modalArr[modalIndex].classList.add("active");
            modalArr[0].classList.remove("active");
          } else {
            modalIndex -= 1;
            modalImage.src = product.images[modalIndex];
            modalArr[modalIndex].classList.add("active");
            modalArr[modalIndex + 1].classList.remove("active");
          }
        }
        function modalNextImage() {
          if (modalIndex === product.images.length - 1) {
            modalIndex = 0;
            modalImage.src = product.images[modalIndex];
            modalArr[modalIndex].classList.add("active");
            modalArr[product.images.length - 1].classList.remove("active");
          } else {
            modalIndex += 1;
            modalImage.src = product.images[modalIndex];
            modalArr[modalIndex].classList.add("active");
            modalArr[modalIndex - 1].classList.remove("active");
          }
        }
        modalPrev.addEventListener("click", modalPreviousImage);
        modalNext.addEventListener("click", modalNextImage);
        function modalDotsForImages() {
          for (let i = 0; i < product.images.length; i++) {
            const dotM = document.createElement("span");
            dotM.classList.add("dot-modal");
            modalDots.append(dotM);
            dotM.addEventListener("click", () => {
              newImage.src = product.images[i];
              modalArr.forEach((elem) => elem.classList.remove("active"));
              modalArr[i].classList.add("active");
            });
          }
        }
    modalCart.classList.add("modal-cart");
    modalPrice.classList.add("modal-price");
    modalPrice.innerText = " ";
    modalHeader.classList.add("modal-header");
    modalHeader.innerText = " ";
    modalFooter.classList.add("modal-footer");
    modalFooter.innerText = " ";
    modalFooter.append(modalPrice, modalCart);
    modalPrice.append(
      createElement("p", " "),
      createElement("p", "Price:  " + product.price + "$",
        "text-decoration: line-through"),
      createElement("p", "-" + product.discountPercentage + "%"),
      createElement("p",(product.price -(product.price * product.discountPercentage) / 100
        ).toFixed(2) + " $"
      )
    );


    modalCart.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
        modalCart.onclick = function () {
          updateProductsToArray(prodToCart);
          console.log(productsInCart);
        };

    modalHeader.append(closeButton, createElement("div", "Product Details"));
    modalDetails.append(
      modalHeader,
      modalImageContainer,
      modalDots,
      createElement("p", product.description),
      createElement("br"),
      createElement("p", `In stock:   ${product.stock}` + " left"),
      createElement("p", `Rating:    ${product.rating}`),
      modalFooter
    );
    modalImageContainer.append(modalPrev, modalImage, modalNext);

  });
}
});