async function getData() {
  let data = await fetch('http://localhost:3000/products');
  return data.json();
}

getData().then((products) => {
  if (products) {
    console.log('Lista cu produce: ', products);
    const productsList = document.querySelector('.products-container');
    showProducts(products);
    sortProducts();

    //function showProducts(products){
    
    products.forEach((product) => {
      function createElement(tag, text) {
        const tagElement = document.createElement(tag);
        tagElement.innerText = text;
        return tagElement;
      }


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
    //}
    
    //const detailsArr = Array.from(newPriceBoxSection.childNodes);

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

    
  }
});