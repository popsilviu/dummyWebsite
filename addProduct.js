const slider = document.querySelector('#productRating');
const value = document.querySelector('.rating-value');

value.innerText = slider.value;
slider.oninput = function () {
  value.innerText = this.value;
};

function addProduct() {
  const editBtn = document.querySelector('.add-btn');
  editBtn.addEventListener('submit', handleAddProduct);

  function handleAddProduct(e) {
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

    fetch('http://localhost:3000/products', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      }),
    })
      .then((res) => res.json())
      .then(() => (location.href = 'index.html'));
  }
}

addProduct();
