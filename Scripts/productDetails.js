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

    pageTitle.innerText = product.title + ' - Details';
    title.innerText = product.title;
    description.innerText = product.description;
    price.innerText = product.price;
    discountPrice.innerText = calculateDiscountedPrice();
    discount.innerText = product.discountPercentage;
    rating.innerText = product.rating;
    brand.innerText = product.brand;
    stock.innerText = product.stock;

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
        discountPrice.style.display = 'none';
        return;
      }
      price.classList.add('price');
    }

    createImageSlider(product, newImageSection);
  }

  fetch(`${apiUrl}/${productId}`)
    .then((res) => res.json())
    .then(displayProductDetails);
}

productDetails();
