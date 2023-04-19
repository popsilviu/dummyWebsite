async function getData() {
  let data = await fetch('http://localhost:3000/products');
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

