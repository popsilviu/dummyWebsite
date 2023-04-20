const apiUrl = 'http://localhost:3000/products';

const params = new URLSearchParams(location.search);
const productId = params.get('productId');

function compareProducts() {
  function productsToCompare(products) {
    const product = products.find((elem) => elem.id == productId);

    console.log(product);

    const itemsToCompare = [product];
    const category = product.category;

    const categoryArr = products.filter(
      (product) => product.category === category
    );

    const numItemsToCompare = 3;

    getItemsToCompare();

    function getItemsToCompare() {
      while (itemsToCompare.length < numItemsToCompare + 1) {
        const randomIndex = Math.floor(Math.random() * categoryArr.length);
        const idArr = itemsToCompare.map(({ id }) => id);

        if (!idArr.includes(categoryArr[randomIndex].id)) {
          itemsToCompare.push(categoryArr[randomIndex]);
        }
      }
      return itemsToCompare;
    }

    if (itemsToCompare) {
      console.log(itemsToCompare);

      itemsToCompare.forEach((item) => {
        function createNewElement(tag, text) {
          const tagElement = document.createElement(tag);
          tagElement.innerText = text;
          return tagElement;
        }

        const compareList = document.querySelector('.compare-container');
        const productContainer = document.createElement('div');
        const compareProduct = document.createElement('div');
        const compareProductImage = document.createElement('img');

        productContainer.classList.add('compare-row');
        compareProduct.classList.add('compare-product');
        compareProductImage.src = item.images[0];

        compareProduct.append(
          compareProductImage,
          createNewElement('p', item.title)
        );
        productContainer.append(
          compareProduct,
          createNewElement('p', item.brand),
          createNewElement('p', item.price),
          createNewElement('p', item.discountPercentage),
          createNewElement('p', item.rating)
        );

        compareList.appendChild(productContainer);
      });
    }
  }

  fetch(`${apiUrl}`)
    .then((res) => res.json())
    .then(productsToCompare);
}

compareProducts();
