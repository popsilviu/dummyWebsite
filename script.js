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

      newArticle.setAttribute('id', product.id);
      newImageSection.classList.add('image-container');
      newTextSection.classList.add('text-container');
      newPriceBoxSection.classList.add('price-container');

      const newImage = document.createElement('img');
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');
      const dotContainer = document.createElement('div');

      let imageIndex = 0;
      newImage.src = product.images[imageIndex];
      prevButton.innerText = '<';
      nextButton.innerText = '>';

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
          prevButton.disabled = true;
        } else {
          imageIndex -= 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add('active');
          nextButton.disabled = false;
          dotArr[imageIndex + 1].classList.remove('active');
        }
      }

      function nextImage() {
        if (imageIndex === product.images.length - 1) {
          nextButton.disabled = true;
        } else {
          imageIndex += 1;
          newImage.src = product.images[imageIndex];
          dotArr[imageIndex].classList.add('active');
          prevButton.disabled = false;
          dotArr[imageIndex - 1].classList.remove('active');
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

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection);

      productsList.appendChild(newArticle);
    });
  }
});
