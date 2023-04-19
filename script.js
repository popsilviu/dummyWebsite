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
    categoryList.classList.add("dropdownContent");
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
    categoryText.style.fontWeight = "bold";
    const filterDropdownMenuCat = document.querySelector(
      ".filter-dropdown-menu"
    );

    filterDropdownMenuCat.appendChild(categoryList);

    categoryList.insertBefore(categoryText, categoryList.firstChild);
    function createFilter(filterRanges, filterType, productsList, products) {
      const filterList = document.createElement("ul");
      filterList.classList.add("dropdownContent");
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
      filterText.style.fontWeight = "bold";

      const filterDropdownMenu = document.querySelector(
        ".filter-dropdown-menu"
      );
      filterDropdownMenu.appendChild(filterList);
      filterList.insertBefore(filterText, filterList.firstChild);
    }

    const priceRanges = [
      { label: "under 100", range: [0, 100] },
      { label: "100 - 500", range: [100, 500] },
      { label: "500 - 1000", range: [500, 1000] },
      { label: "over 1000", range: [1000, Infinity] },
    ];
    const ratingRanges = [
      { label: "\u2B50", range: [0, 1] },
      { label: "\u2B50\u2B50", range: [1, 2] },
      { label: "\u2B50\u2B50\u2B50", range: [2, 3] },
      { label: "\u2B50\u2B50\u2B50\u2B50", range: [3, 4] },
      { label: "\u2B50\u2B50\u2B50\u2B50\u2B50", range: [4, 5] },
    ];
    const stockRanges = [
      { label: "unavailable", range: [0, 0] },
      { label: "only a few left", range: [0, 50] },
      { label: "available", range: [50, Infinity] },
    ];
    createFilter(priceRanges, "price", productsList, products);
    createFilter(stockRanges, "stock", productsList, products);
    createFilter(ratingRanges, "rating", productsList, products);

    const searchBox = document.createElement("input");
    searchBox.type = "search";
    searchBox.id = "search";
    searchBox.setAttribute("data-search", "");
    searchBox.placeholder = "Search products";
    const searchWrapper = document.querySelector(".search-wrapper");
    searchWrapper.appendChild(searchBox);

    function filterProductsByTitle(products, searchTerm) {
      const filteredProductsByTitle = products.filter((product) => {
        const regexpr = new RegExp(searchTerm, "gi");
        return product.title.match(regexpr);
      });
      return filteredProductsByTitle;
    }
    const searchInput = document.querySelector("[data-search]");
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value;
      const filteredProductsByTitle = filterProductsByTitle(
        products,
        searchTerm
      );
      productsList.innerHTML = "";
      showProducts(filteredProductsByTitle, productsList);
    });
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
