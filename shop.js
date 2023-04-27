getData().then((products) => {
    
    if (products) {
      
      products.forEach((product) => {

   
const navbar = document.querySelector(".navbar");
const cartIcon = document.createElement("div");
cartIcon.setAttribute("id", "cart-nav-icon-container");
navbar.appendChild(cartIcon);
cartIcon.innerHTML = `<img id='cart-nav-icon' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
const dotNotification = document.createElement("button");
dotNotification.setAttribute("class", "dot-notification");
dotNotification.append(`1`);
cartIcon.appendChild(dotNotification);

const cartWindow = document.createElement("div");
cartWindow.setAttribute("class", "cart-window-container hide");
cartIcon.appendChild(cartWindow);
cartWindow.inWindow = 0;


cartIcon.addEventListener("mouseover", () => {
  if (cartWindow.classList.contains("hide"))
    cartWindow.classList.remove("hide");
});

cartIcon.addEventListener("mouseleave", () => {
  if (cartWindow.classList.contains("hide"))
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
const cartButton = document.createElement("button");
    cartButton.classList.add("buy-btn");
    cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
    cartButton.setAttribute("id", "cart-button-container");
   
 newArticle.append(cartButton);
   
    
cartButton.onclick = function () {
    //createImageSlider(product, newImageSection) ;
    let prodToCart = {
      name: product.title,
      id: product.id,
      image: product.images[0],
      count: 1,
      price: calculateDiscountedPrice(product),
      unitPrice: product.price,
   }
    updateProductsToArray(prodToCart);
    updateProductsToShoppingCart();
  };
  
  
  checkout.onclick=function(){   //not working
   let win= window.open('cart.html');
   
    //console.log(cartWrapper.innerHTML);
          }

  
 
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
  }

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
                  console.log("count = ", productsInCart[i].count);
              }
              //updateProductsToArray(productsInCart);
              
            }
            if (productsInCart[i].count <= 0) {
              productsInCart.splice(i, 1);
              console.log(productsInCart.splice(i, 1))                                                               
            }
            
          }
          updateProductsToShoppingCart();
        
        }
       });
    
  });
    }
});
 


