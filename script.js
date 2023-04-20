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
  if (cartWindow.classList.contains("hide")) cartWindow.classList.remove("hide");
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
//div - view cart
const viewCart = document.createElement("div");
viewCart.setAttribute("class", "view-cart");
viewCart.innerText = "  View-cart";
cartWindow.appendChild(viewCart);

let productsInCart = []; // Products array
console.log(productsInCart);



async function getData() {
  let data = await fetch("http://localhost:3000/products");
  return data.json();
}

getData().then((products) => {
  if (products) {
   
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
      

      const newImage = document.createElement('img');
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');
      const dotContainer = document.createElement('div');

      let imageIndex = 0;
      newImage.src = product.images[imageIndex];
      prevButton.innerText = "<";
      nextButton.innerText = ">";

      prevButton.classList.add('prev-btn');
      nextButton.classList.add('next-btn');
      dotContainer.classList.add('dot-container');

      prevButton.addEventListener('click', previousImage);
      nextButton.addEventListener('click', nextImage);
      createDotsForImages();

      let dotArr = Array.from(dotContainer.childNodes);
      dotArr[0].classList.add('active');

      function createDotsForImages() {
        for (let i = 0; i < product.images.length; i++) {
          const dot = document.createElement('span');
          dot.classList.add('dot');
          dotContainer.append(dot);
          dot.addEventListener('click', () => {
            newImage.src = product.images[i];
            dotArr.forEach((elem) => elem.classList.remove('active'));
            dotArr[i].classList.add('active');
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
          dotArr[imageIndex].classList.add('active');
          dotArr[0].classList.remove('active');
        } else {
          imageIndex -= 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add('active');
          dotArr[imageIndex + 1].classList.remove('active');
        }
      }

      function nextImage() {
        if (imageIndex === product.images.length - 1) {
          imageIndex = 0;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add('active');
          dotArr[product.images.length - 1].classList.remove('active');
        } else {
          imageIndex += 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add('active');
          dotArr[imageIndex - 1].classList.remove('active');
        }
      }

      newTextSection.append(createElement("h2", product.title), createElement("p", product.description));
      newImageSection.append(newImage, prevButton, nextButton, dotContainer);

      

        
      //task 10 - Toni:
        
      
      
      const modalDetails = createElement('div');
      const openButton = createElement('button');
      const closeButton = createElement('button');
      const priceDetails = createElement('div');
      priceDetails.classList.add('product-details');
      priceDetails.innerText = " ";
      
      priceDetails.append (createElement('p', " "), 
      createElement("p", "Price:  " + product.price + "$", 'text-decoration: line-through'),
      createElement("p", "-" + product.discountPercentage + "%"),
      createElement("p", (product.price - (product.price * product.discountPercentage / 100 )).toFixed(2) + " $")) ;

      // modalDetails.classList.add('modal-details');
      modalDetails.setAttribute('class', 'modal-details hide')
      newTextSection.append(modalDetails,openButton);
      openButton.classList.add('open-button')
      openButton.innerText= 'View more details';
      
      closeButton.classList.add('close-button')
      closeButton.innerText= 'Close';
      modalDetails.innerText='';
      newPriceBoxSection.append(priceDetails);
      modalDetails.inWindow = 0;
      openButton.addEventListener('click', () => 
      {
        if (modalDetails.classList.contains('hide')) { modalDetails.classList.remove('hide') ,openButton.classList.add('hide')};
      });

      closeButton.addEventListener('click', () =>
      {
        if(modalDetails.inWindow === 0)  {
          modalDetails.classList.add('hide') , openButton.classList.remove('hide')
        }
      })

      

      modalDetails.append(createElement('p', product.description), createElement('br'),
        createElement('p', `In stock:   ${product.stock}` + ' left'),
        createElement('p', `Rating: ${product.rating}`),
        closeButton);
        // task 10 done.


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
         updateProductsToShoppingCart();
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
                  <li class="cart-li">
                    <img class="cart-wrapper-img" src="${product.image}">
                    <h5 class="item-cart-title">${product.name}</h5>
                    <div class="box-price-quantity">
                      <h6 class="item-cart-price">$${(product.price*product.count).toFixed(2)}</h6>
                      <div class="quantity">
                        <button class="button-minus" data-id=${product.id}> - </button>
                        <span class="countOfProduct">${product.count}</span>
                        <button class="button-plus" data-id=${product.id}> + </button>
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
        const isPlusButton = e.target.classList.contains("button-plus");
        const isMinusButton = e.target.classList.contains("button-minus");
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
                  cartWrapper.innerHTML = '';
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

