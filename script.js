async function getData() {
  let data = await fetch('http://localhost:3000/products');
  return data.json();
}



getData().then((products) => {
  if (products) {
    console.log("Lista cu produce: ", products);
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

      function createModal(id) {
        // Product 

        const product = products.filter(product => product.id == id); 

        const modal = document.createElement('div');
        const titleModal = document.createElement('h1');
        const exitBtn = document.createElement('button'); 
        const price = document.createElement('span');
        const modalImage = document.createElement('div');
      
        modal.classList.add('modalProduct');
        modalImage.classList.add('modalImage');
      
      
        modalImage.append(newImage)
        
      
      }
    });
  }
});

