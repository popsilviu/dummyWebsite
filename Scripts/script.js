async function getData() {
  let data = await fetch('http://localhost:3000/products');
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

      console.log(product);
      const productsList = document.querySelector('.products-container');
      const newArticle = document.createElement('article');
      const newImageSection = document.createElement('section');
      const newTextSection = document.createElement('section');
      const newPriceBoxSection = document.createElement('section');
      const compareButton = document.createElement('button');

      newArticle.setAttribute('id', product.id);
      newImageSection.classList.add('image-container');
      newTextSection.classList.add('text-container');
      newPriceBoxSection.classList.add('price-container');
      compareButton.classList.add('compare-btn');
      compareButton.innerText = 'Compare';

      createImageSlider(product, newImageSection);
      compareButton.addEventListener('click', compareProducts);

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

      const detailsArr = Array.from(newPriceBoxSection.childNodes);

      toggleDiscountPriceDisplay();

      function calculateDiscountedPrice() {
        if (!product.discountPercentage) {
          return '-';
        }

        return (newPrice = (
          ((100 - product.discountPercentage) / 100) *
          product.price
        ).toFixed(2));
      }

      function toggleDiscountPriceDisplay() {
        if (!product.discountPercentage) {
          detailsArr[2].style.display = 'none';
          return;
        }
        detailsArr[0].classList.add('price');
      }

      newArticle.append(
        newImageSection,
        newTextSection,
        newPriceBoxSection,
        compareButton
      );

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
