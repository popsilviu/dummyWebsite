function calculateDiscountedPrice(product) {
  if (!product.discountPercentage) {
    return '-';
  }

  return (newPrice = (
    ((100 - product.discountPercentage) / 100) *
    product.price
  ).toFixed(2));
}
