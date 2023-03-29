async function getData() {
  let data = await fetch('http://localhost:3000/products');
  return data.json();
}

getData().then((products) => {
  if (products) {
    console.log("Lista cu produse: ", products);
    console.log('Lista cu produse: ', products);
    products.forEach((product) => {
      function createElement(tag, text) {
        const tagElement = document.createElement(tag);
        tagElement.innerText = text;
        return tagElement;
      }

      const productsList = document.querySelector('.products-container');
      const newArticle = document.createElement('article');
      const newImageSection = document.createElement('section');
      const newTextSection = document.createElement('section');
      const newPriceBoxSection = document.createElement('section');

      newArticle.setAttribute('id', product.id);
      newImageSection.classList.add('image-container');
      newTextSection.classList.add('text-container');
      newPriceBoxSection.classList.add('price-container');

      createImageSlider(product, newImageSection);
      const newImage = document.createElement('img');
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');
      const favButton = document.createElement('button');


      let imageIndex = 0;
      newImage.src = product.images[imageIndex];
      prevButton.innerText = '<';
      nextButton.innerText = '>';
      favButton.innerText = 'Add to favourite';


      prevButton.classList.add('prev-btn');
      nextButton.classList.add('next-btn');
      favButton.classList.add('favourite-btn');


      prevButton.addEventListener('click', previousImage);
      nextButton.addEventListener('click', nextImage);
      favButton.addEventListener('click', favouriteButton);


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

      function favouriteButton() {

        let data = product
        
        fetch('http://localhost:3000/favourites', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Favourite Added: ", data);
          })
          .catch((error) => {
            console.error("Error:", error)
            alert('Product is already in favourites.');
          });
      }

      newImageSection.append(newImage, prevButton, nextButton, favButton);

      newTextSection.append(
        createElement("h2", product.title),
        createElement("p", product.description),
      );

      newPriceBoxSection.append(
        createElement("p", `Price: ${product.price}`),
        createElement("p", `Discount: ${product.discountPercentage}`),
        createElement("p", `Discount price: ${calculateDiscountedPrice(product)}`),
        createElement("p", `Stock: ${product.stock}`),
        createElement("p", `Rating: ${product.rating}`),
      );

      const detailsArr = Array.from(newPriceBoxSection.childNodes);

      toggleDiscountPriceDisplay();

      function toggleDiscountPriceDisplay() {
        if (!product.discountPercentage) {
          detailsArr[2].style.display = 'none';
          return;
        }
        detailsArr[0].classList.add('price');
      }

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection);

      productsList.appendChild(newArticle);

      newTextSection.addEventListener('click', productDetails);

      function productDetails() {
        location.href = `productDetails.html?productId=${product.id}`;
      }
    });
  }
});

