const apiUrl = 'http://localhost:3000/products';

const params = new URLSearchParams(location.search);
const productId = params.get('productId');

function displayProductDetails(product) {
  const heading = document.querySelector('.edit-heading');
  const title = document.querySelector('#productTitle');
  const description = document.querySelector('#productDescription');
  const price = document.querySelector('#productPrice');
  const discount = document.querySelector('#productDiscount');
  const rating = document.querySelector('#productRating');
  const stock = document.querySelector('#productStock');
  const brand = document.querySelector('#productBrand');
  const category = document.querySelector('#productCategory');
  let thumbnail = document.querySelector('#productThumbnail');
  const images = document.querySelector('#productImages');

  heading.innerText = `${product.title} - Details`;
  title.value = product.title;
  description.value = product.description;
  price.value = product.price;
  discount.value = product.discountPercentage;
  stock.value = product.stock;
  brand.value = product.brand;
  category.value = product.category;
  thumbnail.value = product.thumbnail;
  images.value = product.images;

  const value = document.querySelector('.rating-value');
  rating.value = product.rating;
  value.innerText = rating.value;
  rating.oninput = function () {
    value.innerText = this.value;
  };
}

fetch(`${apiUrl}/${productId}`)
  .then((res) => res.json())
  .then(displayProductDetails);

function editProductDetails() {
  const editBtn = document.querySelector('.edit-btn');
  editBtn.addEventListener('submit', handleEditProduct);

  function handleEditProduct(e) {
    e.preventDefault();

    const inputs = e.target.elements;

    console.log(inputs);
    const title = inputs.productTitle.value;
    const description = inputs.productDescription.value;
    const price = inputs.productPrice.value;
    const discountPercentage = inputs.productDiscount.value;
    const rating = inputs.productRating.value;
    const stock = inputs.productStock.value;
    const brand = inputs.productBrand.value;
    const category = inputs.productCategory.value;
    const thumbnail = inputs.productThumbnail.value;
    const images = inputs.productImages.value;

    fetch(`${apiUrl}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        price: price.value,
        discountPercentage: discountPercentage.value,
        rating: rating.value,
        stock: stock.value,
        brand: brand.value,
        category: category.value,
        thumbnail: thumbnail.value,
        images: images.value,
      }),
    })
      .then((res) => res.json())
      .then(() => (location.href = 'index.html'));
  }
}
editProductDetails();
