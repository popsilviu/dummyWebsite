async function getData() {
  let data = await fetch("http://localhost:3000/products");
  return data.json();
}

getData().then((products) => {
  if (products) {
    console.log("Lista cu produce: ", products);
    const productsList = document.querySelector(".products-container");
    renderProducts(products, productsList);

    const categorySelect = document.createElement("select");
    categorySelect.classList.add("category-select");
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    categories.unshift("All categories");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categorySelect.appendChild(option);
    });
    categorySelect.addEventListener("change", () => {
      const selectedCategory = categorySelect.value;
      if (selectedCategory === "All categories") {
        productsList.innerHTML = "";
        renderProducts(products, productsList);
      } else {
        const filteredProducts = products.filter(
          (product) => product.category === selectedCategory
        );
        productsList.innerHTML = "";
        renderProducts(filteredProducts, productsList);
      }
    });
    document.body.appendChild(categorySelect);

    const priceSelect = document.createElement("select");
    priceSelect.classList.add("price-select");
    const prices = [...new Set(products.map((product) => product.prices))];
    const priceRanges = [
      { label: "All prices", range: [0, Infinity] },
      { label: "Under 100", range: [0, 100] },
      { label: "100 - 500", range: [100, 500] },
      { label: "500 - 1000", range: [500, 1000] },
      { label: "Over 1000", range: [1000, Infinity] },
    ];
    priceRanges.forEach((range) => {
      const option = document.createElement("option");
      option.value = range.label;
      option.text = range.label;
      priceSelect.appendChild(option);
    });
    priceSelect.addEventListener("change", () => {
      const selectedRange = priceRanges.find(
        (range) => range.label === priceSelect.value
      );
      if (selectedRange) {
        const filteredProducts = products.filter(
          (product) =>
            product.price >= selectedRange.range[0] &&
            product.price <= selectedRange.range[1]
        );
        productsList.innerHTML = "";
        renderProducts(filteredProducts, productsList);
      }
    });
    document.body.appendChild(priceSelect);

    const stockSelect = document.createElement("select");
    stockSelect.classList.add("stock-select");
    const stocks = [...new Set(products.map((product) => product.stocks))];
    const stockRanges = [
      { label: "All stocks", range: [0, Infinity] },
      { label: "Unavailable", range: [0, 0] },
      { label: "Only a few left", range: [0, 50] },
      { label: "Available", range: [50, Infinity] },
    ];
    stockRanges.forEach((range) => {
      const option = document.createElement("option");
      option.value = range.label;
      option.text = range.label;
      stockSelect.appendChild(option);
    });
    stockSelect.addEventListener("change", () => {
      const selectedRange = stockRanges.find(
        (range) => range.label === stockSelect.value
      );
      if (selectedRange) {
        const filteredProducts = products.filter(
          (product) =>
            product.stock >= selectedRange.range[0] &&
            product.stock <= selectedRange.range[1]
        );
        productsList.innerHTML = "";
        renderProducts(filteredProducts, productsList);
      }
    });
    document.body.appendChild(stockSelect);

    const ratingSelect = document.createElement("select");
    ratingSelect.classList.add("rating-select");
    const ratings = [...new Set(products.map((product) => product.ratings))];
    const ratingRanges = [
      { label: "All ratings", range: [0, 5] },
      { label: "1 star", range: [0, 1] },
      { label: "2 stars", range: [1, 2] },
      { label: "3 stars", range: [2, 3] },
      { label: "4 stars", range: [3, 4] },
      { label: "5 stars", range: [4, 5] },
    ];
    ratingRanges.forEach((range) => {
      const option = document.createElement("option");
      option.value = range.label;
      option.text = range.label;
      ratingSelect.appendChild(option);
    });
    ratingSelect.addEventListener("change", () => {
      const selectedRange = ratingRanges.find(
        (range) => range.label === ratingSelect.value
      );
      if (selectedRange) {
        const filteredProducts = products.filter(
          (product) =>
            product.rating >= selectedRange.range[0] &&
            product.rating <= selectedRange.range[1]
        );
        productsList.innerHTML = "";
        renderProducts(filteredProducts, productsList);
      }
    });
    document.body.appendChild(ratingSelect);

    function renderProducts(products, container) {
      products.forEach((product) => {
        function createElement(tag, text) {
          const tagElement = document.createElement(tag);
          tagElement.innerText = text;
          return tagElement;
        }

        function calculateDiscountedPrice() {
          return (
            ((100 - product.discountPercentage) / 100) *
            product.price
          ).toFixed(2);
        }

        console.log(product);
        const newArticle = document.createElement("article");
        const newImageSection = document.createElement("section");
        const newTextSection = document.createElement("section");
        const newPriceBoxSection = document.createElement("section");

        newArticle.setAttribute("id", product.id);
        newImageSection.classList.add("image-container");
        newTextSection.classList.add("text-container");
        newPriceBoxSection.classList.add("price-container");

        const newImage = document.createElement("img");
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        const dotContainer = document.createElement("div");

        let imageIndex = 0;
        newImage.src = product.images[imageIndex];
        prevButton.innerText = "<";
        nextButton.innerText = ">";

        prevButton.classList.add("prev-btn");
        nextButton.classList.add("next-btn");
        dotContainer.classList.add("dot-container");

        prevButton.addEventListener("click", previousImage);
        nextButton.addEventListener("click", nextImage);
        createDotsForImages();

        let dotArr = Array.from(dotContainer.childNodes);
        dotArr[0].classList.add("active");

        function createDotsForImages() {
          for (let i = 0; i < product.images.length; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dotContainer.append(dot);
            dot.addEventListener("click", () => {
              newImage.src = product.images[i];
              dotArr.forEach((elem) => elem.classList.remove("active"));
              dotArr[i].classList.add("active");
            });
          }
        }

        function previousImage() {
          if (imageIndex === 0) {
            prevButton.disabled = true;
          } else {
            imageIndex -= 1;
            newImage.src = product.images[imageIndex];
            dotArr[imageIndex].classList.add("active");
            nextButton.disabled = false;
            dotArr[imageIndex + 1].classList.remove("active");
          }
        }

        function nextImage() {
          if (imageIndex === product.images.length - 1) {
            nextButton.disabled = true;
          } else {
            imageIndex += 1;
            newImage.src = product.images[imageIndex];
            dotArr[imageIndex].classList.add("active");
            prevButton.disabled = false;
            dotArr[imageIndex - 1].classList.remove("active");
          }
        }

        newImageSection.append(newImage, prevButton, nextButton, dotContainer);

        newTextSection.append(
          createElement("h2", product.title),
          createElement("p", product.description)
        );

        newPriceBoxSection.append(
          createElement("p", `Price: ${product.price}`),
          createElement("p", `Discount: ${product.discountPercentage}`),
          createElement("p", `Discount price: ${calculateDiscountedPrice()}`),
          createElement("p", `Stock: ${product.stock}`),
          createElement("p", `Rating: ${product.rating}`)
        );

        newArticle.append(newImageSection, newTextSection, newPriceBoxSection);

        productsList.appendChild(newArticle);

        function createModal(id) {
          // Product

          const product = products.filter((product) => product.id == id);

          const modal = document.createElement("div");
          const titleModal = document.createElement("h1");
          const exitBtn = document.createElement("button");
          const price = document.createElement("span");
          const modalImage = document.createElement("div");

          modal.classList.add("modalProduct");
          modalImage.classList.add("modalImage");

          modalImage.append(newImage);
        }
      });
    }
  }
});
