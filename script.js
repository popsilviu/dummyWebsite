async function getData() {
  let data = await fetch("http://localhost:3000/products");
  return data.json();
}

getData().then((products) => {
  if (products) {
    console.log("Lista cu produse: ", products);
    const productsList = document.querySelector(".products-container");
    showProducts(products, productsList);

    function showProducts(products) {
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
      });
    }

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

    const categoryList = document.createElement("ul");
   
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    categories.forEach((category) => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = category;
      checkbox.id = `category-${category}`;

      const label = document.createElement("label");
      label.htmlFor = `category-${category}`;
      label.textContent = category;

      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      categoryList.appendChild(listItem);
    });

    categoryList.addEventListener("change", () => {
      const selectedCategories = Array.from(
        categoryList.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);

      if (selectedCategories.length === 0) {
        productsList.innerHTML = "";
        showProducts(products, productsList);
      } else {
        const filteredProducts = products.filter((product) =>
          selectedCategories.includes(product.category)
        );
        productsList.innerHTML = "";
        showProducts(filteredProducts, productsList);
      }
    });

    const categoryText = document.createElement("span");
    categoryText.textContent = "Category:";
    const filterDropdownMenuCat = document.querySelector(
      ".filter-dropdown-menu"
    );

    filterDropdownMenuCat.appendChild(categoryText);
    filterDropdownMenuCat.appendChild(categoryList);

    function createFilter(filterRanges, filterType, productsList, products) {
      const filterList = document.createElement("ul");

      filterList.addEventListener("change", () => {
        const selectedCategories = Array.from(
          categoryList.querySelectorAll('input[type="checkbox"]:checked')
        ).map((checkbox) => checkbox.value);

        const checkedRanges = Array.from(
          filterList.querySelectorAll('input[type="checkbox"]:checked')
        ).map((checkbox) =>
          filterRanges.find((range) => range.label === checkbox.value)
        );

        let filteredProducts = products;
        
        if (selectedCategories.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            selectedCategories.includes(product.category)
          );
        }
        if (checkedRanges.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            checkedRanges.some(
              (range) =>
                product[filterType] >= range.range[0] &&
                product[filterType] <= range.range[1]
            )
          );
        }

        productsList.innerHTML = "";
        showProducts(filteredProducts, productsList);
      });

      filterRanges.forEach((range) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = range.label;
        checkbox.id = `${filterType}-${range.label}`;

        const label = document.createElement("label");
        label.htmlFor = `${filterType}-${range.label}`;
        label.textContent = range.label;

        li.appendChild(checkbox);
        li.appendChild(label);
        filterList.appendChild(li);
      });

      const filterText = document.createElement("span");
      filterText.textContent = `${
        filterType.charAt(0).toUpperCase() + filterType.slice(1)
      }:`;

      const filterDropdownMenu = document.querySelector(
        ".filter-dropdown-menu"
      );
      filterDropdownMenu.appendChild(filterText);
      filterDropdownMenu.appendChild(filterList);
    }

    const priceRanges = [
      { label: "Under 100", range: [0, 100] },
      { label: "100 - 500", range: [100, 500] },
      { label: "500 - 1000", range: [500, 1000] },
      { label: "Over 1000", range: [1000, Infinity] },
    ];
    const ratingRanges = [
      { label: "1 star", range: [0, 1] },
      { label: "2 stars", range: [1, 2] },
      { label: "3 stars", range: [2, 3] },
      { label: "4 stars", range: [3, 4] },
      { label: "5 stars", range: [4, 5] },
    ];
    const stockRanges = [
      { label: "Unavailable", range: [0, 0] },
      { label: "Only a few left", range: [0, 50] },
      { label: "Available", range: [50, Infinity] },
    ];
    createFilter(priceRanges, "price", productsList, products);
    createFilter(stockRanges, "stock", productsList, products);
    createFilter(ratingRanges, "rating", productsList, products);
  }
});

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches(".filter-button");
  if (!isDropdownButton && e.target.closest(".filter-dropdown") != null) return; 
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest(".filter-dropdown");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll(".filter-dropdown.active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});
