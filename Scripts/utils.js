function calculateDiscountedPrice(product) {
  if (!product.discountPercentage) {
    return '-';
  }

  return (newPrice = (
    ((100 - product.discountPercentage) / 100) *
    product.price
  ).toFixed(2));
}

function productDetails() {
  location.href = `productDetails.html?productId=${product.id}`;
}
