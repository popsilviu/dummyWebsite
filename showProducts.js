let productsInCart = [];

function showProducts(products) {
  products.forEach((product) => {
    function createElement(tag, text) {
      const tagElement = document.createElement(tag);
      tagElement.innerText = text;
      return tagElement;
    }

    const productsList = document.querySelector(".products-container");
    var newArticle = document.createElement("article");
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

    const cartButton = document.createElement("button");
    cartButton.classList.add("buy-btn");
    cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
    cartButton.setAttribute("id", "cart-button-container");
    newArticle.append(cartButton);

    newTextSection.addEventListener("click", productDetails);

    function productDetails() {
      location.href = `productDetails.html?productId=${product.id}`;
    }

    cartButton.onclick = function () {
      let prodToCart = {
        name: product.title,
        id: product.id,
        image: product.images[0],
        count: 1,
        price: calculateDiscountedPrice(product),
        unitPrice: product.price,
      };
      updateProductsToArray(prodToCart);
      updateProductsToShoppingCart();
    };

    function updateProductsToArray(prodToCart) {
      for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id === product.id) {
          productsInCart[i].count += 1;
          return;
        }
      }
      productsInCart.push(prodToCart);
    }

    let countTheSumPrice = function () {
      let sum = 0;
      productsInCart.forEach((product) => {
        sum += Number(product.price * product.count);
      });
      return sum.toFixed(2);
    };

    let updateProductsToShoppingCart = function () {
      if (productsInCart.length > 0) {
        let result = productsInCart.map((product) => {
          return `
                    <li class="cart-li-${product.id}">
                      <img class="cart-wrapper-img" src="${product.image}">
                      <h5 class="item-cart-title">${product.name}</h5>
                      <div class="box-price-quantity">
                        <h6 class="item-cart-price">$${(
                          product.price * product.count
                        ).toFixed(2)}</h6>
                        <div class="quantity">
                          <button class="button-minus-${
                            product.id
                          }"> - </button>
                          <span class="countOfProduct">${product.count}</span>
                          <button class="button-plus-${product.id}"> + </button>
                        </div>
                      </div>
                    </li>`;
        });

        cartWrapper.innerHTML = result.join("");
        cartWrapper.classList.remove("hide");
        total.innerHTML = "TOTAL: $" + countTheSumPrice();
      } else {
        cartWrapper.classList.add("hide");
        cartWrapper.innerHTML =
          '<h4 class="empty">Your shopping cart is empty</h4>';
        total.innerHTML = "Total : $0.00 ";
      }
    };

    cartWrapper.addEventListener("click", (e) => {
      const isPlusButton = e.target.classList.contains(
        `button-plus-${product.id}`,
      );
      const isMinusButton = e.target.classList.contains(
        `button-minus-${product.id}`,
      );
      if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
          if (productsInCart[i].id == product.id) {
            if (isPlusButton) {
              productsInCart[i].count += 1;
            } else if (isMinusButton) {
              productsInCart[i].count -= 1;
            }
          }
          if (productsInCart[i].count <= 0) {
            productsInCart.splice(i, 1);
          }
        }
        updateProductsToShoppingCart();
      }
    });
  });
}
