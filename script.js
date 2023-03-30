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
    localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
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
    else localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)));
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
  if (cartWindow.classList.contains("hide")) cartWindow.classList.remove("hide");
});

cartIcon.addEventListener("mouseleave", () => {
  // if(wholeCartWindow.classList.contains('hide'))
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
    console.log('Lista cu produce: ', products);
    products.forEach((product) => {
      function createElement(tag, text) {
        const tagElement = document.createElement(tag);
        tagElement.innerText = text;
        return tagElement;
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

      newImageSection.append(newImage, prevButton, nextButton, dotContainer);

      // Alexandra!!!!!!!!!//

      // const buyButton=document.createElement('button');
      // const addToCart=document.createElement('button');
      // buyButton.innerHTML="Buy";
      // addToCart.innerHTML="Add to Cart";
      // buyButton.classList.add('buy-btn');
      // addToCart.classList.add('add-btn');

      //   const closeButton=document.createElement("button");
      //   closeButton.classList.add('close-btn');

      //   closeButton.innerHTML='&times;';
      //   modal.append(closeButton);

      //   buyButton.onclick = function() {
      //     modal.style.display = "block";
      //   }
      //   addToCart.onclick = function() {
      //     modal.style.display = "block";
      //     updateProductsToArray(prodToCart);
      //     updateProductsToShoppingCart();
      //   }

      //   closeButton.onclick = function() {
      //     modal.style.display = "none";
      //   }

        let cartSumPrice="Suma totala:";

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
         
        updateProductsToShoppingCart(prodToCart.count);
       }

        let updateProductsToShoppingCart = (count)=>{
         

          }

        
      //     document.querySelector('.modal-content').innerHTML="Your shopping cart is empty";
      //     cartSumPrice.innerHTML+="0";
        
      

      // newBuySection.append(addToCart);

      //task 10 - Toni:
        
      newTextSection.append(createElement("h2", product.title));
      
      
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


      newArticle.append(newImageSection, newTextSection, newPriceBoxSection); // am scos , newBuySection, modal - create de alexandra
      productsList.appendChild(newArticle);

      // Adaugate acum de Nicu
      const cartButton = document.createElement("button");
      cartButton.classList.add('buy-btn');
      cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
      cartButton.setAttribute("id", "cart-button-container");
      newPriceBoxSection.appendChild(cartButton);
      cartButton.onclick = function() {
        updateProductsToArray(prodToCart);
        console.log(productsInCart);
   //     updateProductsToShoppingCart();
      }
      

      // cartButton.forEach((btn) => {
      //   btn.addEventListener(`click`,console.log(`Merge`));
      // });
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

      function createModal(id) {
        // Product

        const product = products.filter((product) => product.id == id);

        const modal = document.createElement('div');
        const titleModal = document.createElement('h1');
        const exitBtn = document.createElement('button');
        const price = document.createElement('span');
        const modalImage = document.createElement('div');

        modal.classList.add('modalProduct');
        modalImage.classList.add('modalImage');

        modalImage.append(newImage);
      }
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
  