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
    
  }
});