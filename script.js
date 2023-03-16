

async function getData() {
  let data = await fetch("http://localhost:3000/products");
  return data.json();
}

function createImg(src) {
  const img = document.createElement('img');
  img.src = src;
  return img;
}

getData().then((products) => {
  if (products) {
    products.forEach((product) => {

      function createElement(tag, text, style) {
        const tagElement = document.createElement(tag);
        tagElement.innerText = text;

        if (style) 
        {
        tagElement.style = style
        }
        return tagElement;
      }

      console.log(product);
      const newArticle = document.createElement("article");
      const newImageSection = document.createElement("section");
      
      const newTextSection = document.createElement("section");
      const newPriceBoxSection = document.createElement("section");

      const mySlides = document.createElement('div');
      const imageSlider = document.createElement('div');

      newImageSection.setAttribute('id' , product.id);
      imageSlider.setAttribute('class' , 'imageSlider');
      mySlides.setAttribute('class', 'mySlides');

      newArticle.append(newImageSection, newTextSection, newPriceBoxSection);
      newImageSection.classList.add('newImageSection')

      newImageSection.appendChild(imageSlider)
      imageSlider.appendChild(mySlides)

      newImageSection.append(
        createElement('a' , "PREV"),
        createElement('a' , "NEXT")
      )
    
      for (let i = 0; i < product.images.length; i += 1) {
        imageSlider.append(createImg(product.images[i]));
          }


      // for (let i = 0; i < product.images.length; i += 1) {
      //   newImageSection.append(createImg(product.images[i]));
      // }

      newTextSection.append(
        createElement("h2", product.title),
        createElement("p", product.description)
      );
      newPriceBoxSection.append(
        createElement("p", "Price:  " + product.price + "$", 'text-decoration: line-through'),
        createElement("p", "-" + product.discountPercentage + "%"),
        createElement('p', " "),
        createElement('p', "New Price: " + (product.price - (product.price * product.discountPercentage / 100 )).toFixed(2) + " $"),
        createElement("p", "In stock: " + product.stock),
        createElement("p", "Rating: " + product.rating)
      );

      
      
      newPriceBoxSection.classList.add('newPriceBoxSection');
      document.body.appendChild(newArticle);
      
      

    
    });
  }
});