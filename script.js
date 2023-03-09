async function getData() {
  let data = await fetch("http://localhost:3000/products");
  return data.json();
}

getData().then((products) => {
  if (products) {
    products.forEach((product) => {
      function createElement(tag, text) {
        const tagElement = document.createElement(tag);
        tagElement.innerText = text;
        return tagElement;
      }
      console.log(product);
      const newArticle = document.createElement("article");
      const newImageSection = document.createElement("section");
      const newTextSection = document.createElement("section");
      const newPriceBoxSection = document.createElement("section");

      newTextSection.append(
        createElement("h2", product.title),
        createElement("p", product.description)
      );
      newPriceBoxSection.append(
        createElement("p", product.price),
        createElement("p", product.discountPercentage),
        createElement("p", product.stock),
        createElement("p", product.rating)
      );

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection);

      document.body.appendChild(newArticle);
    });
  }
});
