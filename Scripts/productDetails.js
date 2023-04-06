const apiUrl = 'http://localhost:3000/products';

const params = new URLSearchParams(location.search);
const productId = params.get('productId');

function productDetails() {
  function displayProductDetails(product) {
    console.log(product);

    const pageTitle = document.querySelector('.page-title');
    const title = document.querySelector('.product-title');
    const description = document.querySelector('.product-description');
    const price = document.querySelector('.product-price');
    const discountPrice = document.querySelector('.product-discount-price');
    const discount = document.querySelector('.product-discount');
    const rating = document.querySelector('.product-rating');
    const brand = document.querySelector('.product-brand');
    const stock = document.querySelector('.product-stock');
    const newImageSection = document.querySelector('.image-container');
    const compareButton = document.querySelector('.btn-compare');

    pageTitle.innerText = product.title + ' - Details';
    title.innerText = product.title;
    description.innerText = product.description;
    price.innerText = product.price;
    discountPrice.innerText = calculateDiscountedPrice(product);
    discount.innerText = product.discountPercentage;
    rating.innerText = product.rating;
    brand.innerText = product.brand;
    stock.innerText = product.stock;

    toggleDiscountPriceDisplay();

    function toggleDiscountPriceDisplay() {
      if (!product.discountPercentage) {
        discountPrice.style.display = 'none';
        return;
      }
      price.classList.add('price');
    }

    createImageSlider(product, newImageSection);

    compareButton.addEventListener(
      'click',
      () => (location.href = `compareProducts.html?productId=${product.id}`)
    );
  }

  fetch(`${apiUrl}/${productId}`)
    .then((res) => res.json())
    .then(displayProductDetails);

  function deleteProduct() {
    const deleteBtn = document.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', handleDeleteProduct);

    function handleDeleteProduct(e) {
      if (confirm('Are you sure you want to delete this product?')) {
        fetch(`${apiUrl}/${productId}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then(() => {
            e.target.parentNode.remove();
            location.href = 'index.html';
          });
      }
    }
  }

  deleteProduct();
}

productDetails();
