class CartItem {
  constructor(name, desc, img, price) {
    this.name = name;
    this.desc = desc;
    this.img = img;
    this.price = price;
    this.quantity = 1;
  }
}

// class LocalCart {
//   static key = "cartItems";

//   static getLocalCartItems() {
//     let cartMap = new Map();
//     const cart = localStorage.getItem(LocalCart.key);
//     if (cart === null || cart.length === 0) return cartMap;
//     return new Map(Object.entries(JSON.parse(cart)));
//   }

//   static addItemToLocalCart(id, item) {
//     let cart = LocalCart.getLocalCartItems();
//     if (cart.has(id)) {
//       let mapItem = cart.get(id);
//       mapItem.quantity += 1;
//       cart.set(id, mapItem);
//     } else cart.set(id, item);
//     localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
//     updateCartUI();
//   }

//   static removeItemFromCart(id) {
//     let cart = LocalCart.getLocalCartItems();
//     if (cart.has(id)) {
//       let mapItem = cart.get(id);
//       if (mapItem.quantity > 1) {
//         mapItem.quantity -= 1;
//         cart.set(id, mapItem);
//       } else cart.delete(id);
//     }
//     if (cart.length === 0) localStorage.clear();
//     else localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
//     updateCartUI();
//   }
// }

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
viewCart.innerText = "view-cart";
cartWindow.appendChild(viewCart);

let productsInCart=[];


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

      function calculateDiscountedPrice() {
        return (((100 - product.discountPercentage) / 100) * product.price).toFixed(2);
      }

      // console.log(product);
      const productsList = document.querySelector(".products-container");
      const newArticle = document.createElement("article");
      const newImageSection = document.createElement("section");
      const newTextSection = document.createElement("section");
      const newPriceBoxSection = document.createElement("section");
      const newBuySection = document.createElement("section");
      // const modal=document.createElement('section');
      // const modalContent=document.createElement('section');

      newArticle.setAttribute("id", product.id);
      newImageSection.classList.add("image-container");
      newTextSection.classList.add("text-container");
      newPriceBoxSection.classList.add("price-container");
      newBuySection.classList.add("buy-container");
      // modal.classList.add('myModal');
      // modalContent.classList.add('modal-content');

      const newImage = document.createElement("img");
      const prevButton = document.createElement("button");
      const nextButton = document.createElement("button");

      let imageIndex = 0;
      newImage.src = product.images[imageIndex];
      prevButton.innerText = "<";
      nextButton.innerText = ">";

      prevButton.classList.add("prev-btn");
      nextButton.classList.add("next-btn");

      prevButton.addEventListener("click", previousImage);
      nextButton.addEventListener("click", nextImage);

      function previousImage() {
        if (imageIndex === 0) {
          prevButton.disabled = true;
        } else {
          imageIndex -= 1;
          newImage.src = product.images[imageIndex];
          nextButton.disabled = false;
        }
      }

      function nextImage() {
        if (imageIndex === product.images.length - 1) {
          nextButton.disabled = true;
        } else {
          imageIndex += 1;
          newImage.src = product.images[imageIndex];
          prevButton.disabled = false;
        }
      }

      newImageSection.append(newImage, prevButton, nextButton);

      
         let prodToCart={
         name: product.title,
         id: product.id,
         image: newImage.src,
         count:1,
         price: calculateDiscountedPrice(product.price),
         unitPrice: product.price
        }
     

        function updateProductsToArray(product){
         for (let i=0; i<productsInCart.length; i++){
           if(productsInCart[i].id === product.id){
             productsInCart[i].count+=1;
             productsInCart[i].price = productsInCart[i].count * productsInCart[i].unitPrice;
             return;
           }
         }
         productsInCart.push(prodToCart);
         updateProductsToShoppingCart();
       }
      
       let countTheSumPrice = function () { 
        let sum = 0;
        productsInCart.forEach(product => {
          sum += product.price;
        });
        return sum;
      }
      
        let updateProductsToShoppingCart = function () {  
              if (productsInCart.length > 0) {
              let result = productsInCart.map(product => {
                return `
                  <li class="cart-wrapper">
                    <img src="${product.image}">
                    <div>
                      <h5>${product.name}</h5>
                      <h6>$${product.price}</h6>
                      <div>
                        <button class="button-minus" data-id=${product.id}>-</button>
                        <span class="countOfProduct">${product.count}</span>
                        <button class="button-plus" data-id=${product.id}>+</button>
                      </div>
                    </div>
                  </li>`
              });

              cartWrapper.innerHTML = result.join('');
              //document.querySelector('.checkout').classList.remove('hidden');
              total.innerHTML = 'Total :' + countTheSumPrice();
          
            }
            else {
              
              total.innerHTML = "Total : $0.00 ";
            }
          }
         // for (let i=0;i<productsInCart.length;i++) {
            // appending your elements to the body :
         //   cartWrapper.append(productsInCart[i]);


         
       
        
         

          

        
      //     document.querySelector('.modal-content').innerHTML="Your shopping cart is empty";
      //     cartSumPrice.innerHTML+="0";
        
      

      // newBuySection.append(addToCart);
           
      newTextSection.append(createElement("h2", product.title), createElement("p", product.description));

      newPriceBoxSection.append(
        createElement("p", `Price: ${product.price}`),
        createElement("p", `Discount: ${product.discountPercentage}`),
        createElement("p", `Discount price: ${calculateDiscountedPrice()}`),
        createElement("p", `Stock: ${product.stock}`),
        createElement("p", `Rating: ${product.rating}`)
      );

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection); // am scos , newBuySection, modal - create de alexandra
      productsList.appendChild(newArticle);

      // Adaugate acum de Nicu
      const cartButton = document.createElement("button");
      cartButton.classList.add('buy-btn');
      cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
      cartButton.setAttribute("id", "cart-button-container");
      //newArticle.appendChild(cartButton);
      newPriceBoxSection.append(cartButton);
      cartButton.onclick = function() {
        updateProductsToArray(prodToCart);
        console.log(productsInCart);
        updateProductsToShoppingCart();
      }
      

      // cartButton.forEach((btn) => {
      //   btn.addEventListener(`click`,console.log(`Merge`));
      // });
    });
  }
});



function addItemFunction(e) {
  const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id");
  const img = e.target.parentElement.parentElement.previousElementSibling.src;
  const name = e.target.parentElement.previousElementSibling.textContent;
  const desc = e.target.parentElement.children[0].textContent;
  let price = e.target.parentElement.children[1].textContent;
  price = price.replace("Price: $", "");
  const item = new CartItem(name, desc, img, price);
  LocalCart.addItemToLocalCart(id, item);
  console.log(price);
}


// !!!!!!!!!!!!!!!!!!!FUNCTIA ASTA TREBUIE SA O REZOLVAM!!!!!!!!!!

// function updateCartUI(){
//   cartWrapper.innerHTML=""
//   const items = LocalCart.getLocalCartItems()
//   if(items === null) return
//   let count = 0
//   let total = 0
//   for(const [key, value] of items.entries()){
//       const cartItem = document.createElement('div')
//       cartItem.classList.add('cart-item')
//       let price = value.price*value.quantity
//       price = Math.round(price*100)/100
//       count+=1
//       total += price
//       total = Math.round(total*100)/100
//       cartItem.innerHTML =
//       `
//       <img src="${value.img}"> 
//                      <div class="details">
//                          <h3>${value.name}</h3>
//                          <p>${value.desc}
//                           <span class="quantity">Quantity: ${value.quantity}</span>
//                              <span class="price">Price: $ ${price}</span>
//                          </p>
//                      </div>
//                      <div class="cancel"><i class="fas fa-window-close"></i></div>
//       `
//      cartItem.lastElementChild.addEventListener('click', ()=>{
//          LocalCart.removeItemFromCart(key)
//      })
//       cartWrapper.append(cartItem)
//   }

//   if(count > 0){
//       cartIcon.classList.add('non-empty')
//       let root = document.querySelector(':root')
//       root.style.setProperty('--after-content', `"${count}"`)
//       const subtotal = document.querySelector('.subtotal')
//       subtotal.innerHTML = `SubTotal: $${total}`
//   }
//   else
//   cartIcon.classList.remove('non-empty')
// }
// document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})
  