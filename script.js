class CartItem {
  constructor(name, desc, img, price) {
    this.name = name;
    this.desc = desc;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

class LocalCart {
  static key = "cartItems";

  static getLocalCartItems() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;
    return new Map(Object.entries(JSON.parse(cart)));
  }

  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      mapItem.quantity += 1;
      cart.set(id, mapItem);
    } else cart.set(id, item);
    localStorage.setItem(
      LocalCart.key,
      JSON.stringify(Object.fromEntries(cart))
    );
    updateCartUI();
  }

  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems();
    if (cart.has(id)) {
      let mapItem = cart.get(id);
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1;
        cart.set(id, mapItem);
      } else cart.delete(id);
    }
    if (cart.length === 0) localStorage.clear();
    else
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cart))
      );
    updateCartUI();
  }
}

const navbar = document.querySelector(".navbar");
const cartIcon = document.createElement("div");
cartIcon.setAttribute("id", "cart-nav-icon-container");
navbar.appendChild(cartIcon);
cartIcon.innerHTML = `<img id='cart-nav-icon' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
const dotNotification = document.createElement("button");
dotNotification.setAttribute("class", "dot-notification");
dotNotification.append(`1`);
cartIcon.appendChild(dotNotification);

// Create window cart
const cartWindow = document.createElement("div");
cartWindow.setAttribute("class", "cart-window-container hide");
cartIcon.appendChild(cartWindow);
cartWindow.inWindow = 0;

cartIcon.addEventListener("mouseover", () => {
  if (cartWindow.classList.contains("hide"))
    cartWindow.classList.remove("hide");
});

cartIcon.addEventListener("mouseleave", () => {
  if(cartWindow.classList.contains('hide'))
  setTimeout(() => {
    if (cartWindow.inWindow === 0) {
      cartWindow.classList.add("hide");
    }
  }, 500);
});

cartWindow.addEventListener("mouseover", () => {
  cartWindow.inWindow = 1;
});

cartWindow.addEventListener("mouseleave", () => {
  cartWindow.inWindow = 0;
  cartWindow.classList.add("hide");
});

//h2 -
const titleWindowCart = document.createElement("h2");
titleWindowCart.innerText = "Shopping Cart";
cartWindow.appendChild(titleWindowCart);
//div - cart wrapper
const cartWrapper = document.createElement("div");
cartWrapper.setAttribute("class", "cart-wrapper");
cartWindow.appendChild(cartWrapper);
//div - total
const total = document.createElement("div");
total.setAttribute("class", "total");
total.innerText = "Total : $0.00 ";
cartWindow.appendChild(total);
//div - checkout
const checkout = document.createElement("div");
checkout.setAttribute("class", "checkout");
checkout.innerText = "Checkout";
cartWindow.appendChild(checkout);


let productsInCart = [];

async function getData() {
  let data = await fetch("http://localhost:3000/products");
  return data.json();
}

getData().then((products) => {
  if (products) {
    console.log('Lista cu produse: ', products);
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
      const newBuySection = document.createElement("section");
      
      newArticle.setAttribute("id", product.id);
      newImageSection.classList.add("image-container");
      newTextSection.classList.add("text-container");
      newPriceBoxSection.classList.add("price-container");
      newBuySection.classList.add("buy-container");
      

      const newImage = document.createElement("img");
      const prevButton = document.createElement("button");
      const nextButton = document.createElement("button");
      const dotContainer = document.createElement("div");

      let imageIndex = 0;
      newImage.src = product.images[imageIndex];
      prevButton.innerText = "<";
      nextButton.innerText = ">";

      prevButton.classList.add("prev-btn");
      nextButton.classList.add("next-btn");
      dotContainer.classList.add("dot-container");

      prevButton.addEventListener("click", previousImage);
      nextButton.addEventListener("click", nextImage);
      createDotsForImages();

      let dotArr = Array.from(dotContainer.childNodes);
      dotArr[0].classList.add("active");

      function createDotsForImages() {
        for (let i = 0; i < product.images.length; i++) {
          const dot = document.createElement("span");
          dot.classList.add("dot");
          dotContainer.append(dot);
          dot.addEventListener("click", () => {
            newImage.src = product.images[i];
            dotArr.forEach((elem) => elem.classList.remove("active"));
            dotArr[i].classList.add("active");
          });
        }
      }

      function calculateDiscountedPrice() {
        return (((100 - product.discountPercentage) / 100) * product.price).toFixed(2);
      }

      function previousImage() {
        if (imageIndex === 0) {
          imageIndex = product.images.length - 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add("active");
          dotArr[0].classList.remove("active");
        } else {
          imageIndex -= 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add("active");
          dotArr[imageIndex + 1].classList.remove("active");
        }
      }

      function nextImage() {
        if (imageIndex === product.images.length - 1) {
          imageIndex = 0;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add("active");
          dotArr[product.images.length - 1].classList.remove("active");
        } else {
          imageIndex += 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add("active");
          dotArr[imageIndex - 1].classList.remove("active");
        }
      }

      
      newImageSection.append(newImage, prevButton, nextButton, dotContainer);

      newTextSection.append(
        createElement('h2', product.title),
        createElement('p', product.description)
      );

      newPriceBoxSection.append(
        createElement('p', `Price: ${product.price}`),
        createElement('p', `Discount: ${product.discountPercentage}`),
        createElement('p', `Discount price: ${calculateDiscountedPrice()}`),
        createElement('p', `Stock: ${product.stock}`),
        createElement('p', `Rating: ${product.rating}`)
      );

      // Punctul 7 din lista de task-uri

      const detailsArr = Array.from(newPriceBoxSection.childNodes);

      // function calculateDiscountedPrice() {
      //   if (!product.discountPercentage) {
      //     detailsArr[2].style.display = 'none';

      //     return;
      //   } else {
      //     detailsArr[0].classList.add('price');

      //     return (
      //       ((100 - product.discountPercentage) / 100) *
      //       product.price
      //     ).toFixed(2);
      //   }
      // }

      function calculateDiscountedPrice() {
        return (
          ((100 - product.discountPercentage) / 100) *
          product.price
        ).toFixed(2);
      }

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection);
      productsList.appendChild(newArticle);

      const cartButton = document.createElement("button");
      cartButton.classList.add("buy-btn");
      cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
      cartButton.setAttribute("id", "cart-button-container");
      newArticle.append(cartButton);
      cartButton.onclick = function () {
        updateProductsToArray(prodToCart);
        updateProductsToShoppingCart();
      };
      
      
      checkout.onclick=function(){   //not working
       let win= window.open('cart.html');
       
        //console.log(cartWrapper.innerHTML);
              }

      let prodToCart = {
         name: product.title,
         id: product.id,
         image: newImage.src,
         count: 1,
         price: calculateDiscountedPrice(product.price),
         unitPrice: product.price,
      };
     
      function updateProductsToArray(prodToCart) {
        for (let i = 0; i < productsInCart.length; i++) {
          if (productsInCart[i].id === product.id) {
             productsInCart[i].count += 1;
             return;
           }
         }
         productsInCart.push(prodToCart);
        // updateProductsToShoppingCart();
       }
      
       let countTheSumPrice = function () { 
        let sum = 0;
        productsInCart.forEach((product) => {
          sum += Number(product.price * product.count);
        });
        return sum.toFixed(2);
      };
      let deAfisat='';
        let updateProductsToShoppingCart = function () {  
              if (productsInCart.length > 0) {
          let result = productsInCart.map((product) => {
                return `
                  <li class="cart-li-${product.id}">
                    <img class="cart-wrapper-img" src="${product.image}">
                    <h5 class="item-cart-title">${product.name}</h5>
                    <div class="box-price-quantity">
                      <h6 class="item-cart-price">$${(product.price*product.count).toFixed(2)}</h6>
                      <div class="quantity">
                        <button class="button-minus-${product.id}"> - </button>
                        <span class="countOfProduct">${product.count}</span>
                        <button class="button-plus-${product.id}"> + </button>
                      </div>
                    </div>
                  </li>`;
              });

          cartWrapper.innerHTML = result.join("");
          cartWrapper.classList.remove('hide');
          total.innerHTML = "TOTAL: $" + countTheSumPrice();
        } else {
              cartWrapper.classList.add('hide');
              cartWrapper.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
              total.innerHTML = "Total : $0.00 ";
            }
      };

      cartWrapper.addEventListener("click", (e) => {
        // Last
        const isPlusButton = e.target.classList.contains(`button-plus-${product.id}`);
        const isMinusButton = e.target.classList.contains(`button-minus-${product.id}`);
            if (isPlusButton || isMinusButton) {
              for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == product.id) {
                  if (isPlusButton) {
                    console.log("id produs: ", isPlusButton)
                     productsInCart[i].count += 1;
                    
                    } else if (isMinusButton) {
                productsInCart[i].count -= 1;
                  }
                  //updateProductsToArray(productsInCart);
                  updateProductsToShoppingCart();
                }
                if (productsInCart[i].count <= 0) {
                  productsInCart.splice(i, 1);
                  console.log(productsInCart.splice(i, 1))
                 // updateProductsToArray(productsInCart);
                  updateProductsToShoppingCart();
                }
              }
          //     updateProductsToArray();
            
            }
           });
    });
  }
});

