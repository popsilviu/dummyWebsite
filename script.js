const navbar = document.querySelector(".navbar");
const cartIcon = document.createElement("div");
cartIcon.setAttribute("id", "cart-nav-icon-container");
navbar.appendChild(cartIcon);
cartIcon.innerHTML = `<img id='cart-nav-icon' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
const dotNotification = document.createElement("button");
dotNotification.setAttribute("class", "dot-notification");
dotNotification.append(`1`);
cartIcon.appendChild(dotNotification);


async function getData() {
  let data = await fetch('http://localhost:3000/products');
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
        return (
          ((100 - product.discountPercentage) / 100) *
          product.price
        ).toFixed(2);
      }

      console.log(product);
      const productsList = document.querySelector('.products-container');
      const newArticle = document.createElement('article');
      const newImageSection = document.createElement('section');
      const newTextSection = document.createElement('section');
      const newPriceBoxSection = document.createElement('section');
      const newBuySection=document.createElement('section');
      // const modal=document.createElement('section');
      // const modalContent=document.createElement('section');

      newArticle.setAttribute('id', product.id);
      newImageSection.classList.add('image-container');
      newTextSection.classList.add('text-container');
      newPriceBoxSection.classList.add('price-container');
      newBuySection.classList.add('buy-container');
      // modal.classList.add('myModal');
      // modalContent.classList.add('modal-content');
      

      const newImage = document.createElement('img');
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');

      let imageIndex = 0;
      newImage.src = product.images[imageIndex];
      prevButton.innerText = '<';
      nextButton.innerText = '>';

      prevButton.classList.add('prev-btn');
      nextButton.classList.add('next-btn');

      prevButton.addEventListener('click', previousImage);
      nextButton.addEventListener('click', nextImage);

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


      
      // Alexandra!!!!!!!!!//

      // const buyButton=document.createElement('button');
      const addToCart=document.createElement('button');
      // buyButton.innerHTML="Buy";
      addToCart.innerHTML="Add to Cart";
      // buyButton.classList.add('buy-btn');
      addToCart.classList.add('add-btn');

      
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

    //  let productsInCart=[];
    //  let cartSumPrice="Suma totala:";
    //  let prodToCart={
    //   name:product.title,
    //   id: product.id,
    //   image:product.newImage,
    //   count:1,
    //   price: product.calculateDiscountedPrice,
    //   unitPrice: product.calculateDiscountedPrice

    //  }

    //  function updateProductsToArray(product){
    //   for (let i=0; i<productsInCart.length; i++){
    //     if(productsInCart[i].id ===product.id){
    //       productsInCart[i].count+=1;
    //       productsInCart[i].price = productsInCart[i].count * productsInCart[i].unitPrice;
    //       return;
    //     }
    //   }
    //   productsInCart.push(product);
    // }

    //  function updateProductsToShoppingCart(){
    //   if(productsInCart.length>0){
    //     //to complete    
                    
          
    //     }

      
    //   else {
    //     document.querySelector('.modal-content').innerHTML="Your shopping cart is empty";
    //     cartSumPrice.innerHTML+="0";
    //   }
    //  }
     
     
     
           
      newBuySection.append(addToCart);
     


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

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection); // am scos , newBuySection, modal - create de alexandra
      productsList.appendChild(newArticle);

            // Adaugate acum de Nicu
            const cartButton = document.createElement("div");
            cartButton.innerHTML = `<img id='cart-button' src='https://cdn-icons-png.flaticon.com/512/5465/5465858.png'>`;
            cartButton.setAttribute("id", "cart-button-container");
            newArticle.appendChild(cartButton);

      
    });
  }
});

