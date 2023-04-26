function showProducts(products) {
  products.forEach((product) => {
    function createElement(tag, text) {
      const tagElement = document.createElement(tag);
      tagElement.innerText = text;
      return tagElement;
    }

    const productsList = document.querySelector(".products-container");
    const newArticle = document.createElement("article");
    const newImageSection = document.createElement("section");
    const newTextSection = document.createElement("section");
    const newPriceBoxSection = document.createElement("section");

    newArticle.setAttribute("id", product.id);
    newImageSection.classList.add("image-container");
    newTextSection.classList.add("text-container");
    newPriceBoxSection.classList.add("price-container");

    createImageSlider(product, newImageSection);

    newTextSection.append(
      createElement("h2", product.title),
      createElement("p", product.description),
    );

    newPriceBoxSection.append(
      createElement("p", `Price: ${product.price}`),
      createElement("p", `Discount: ${product.discountPercentage}`),
      createElement(
        "p",
        `Discount price: ${calculateDiscountedPrice(product)}`,
      ),
      createElement("p", `Stock: ${product.stock}`),
      createElement("p", `Rating: ${product.rating}`),
    );

    const detailsArr = Array.from(newPriceBoxSection.childNodes);

    toggleDiscountPriceDisplay();

    function toggleDiscountPriceDisplay() {
      if (!product.discountPercentage) {
        detailsArr[2].style.display = "none";
        return;
      }
      detailsArr[0].classList.add("price");
    }

    newArticle.append(newImageSection, newTextSection, newPriceBoxSection);
    productsList.appendChild(newArticle);

    newTextSection.addEventListener("click", productDetails);

    function productDetails() {
      location.href = `productDetails.html?productId=${product.id}`;
    }
    //buy-button
    const cartButton = document.createElement("button");
    cartButton.classList.add("buy-btn");
    cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
    cartButton.setAttribute("id", "cart-button-container");
    newArticle.append(cartButton);
    buyProducts(product);
  });
}
