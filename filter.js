function filterProducts() {
  getData().then((products) => {
    if (products) {
      const productsList = document.querySelector(".products-container");
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
          categoryList.querySelectorAll('input[type="checkbox"]:checked'),
        ).map((checkbox) => checkbox.value);
        if (selectedCategories.length === 0) {
          productsList.innerHTML = "";
          showProducts(products, productsList);
        } else {
          const filteredProducts = products.filter((product) =>
            selectedCategories.includes(product.category),
          );
          productsList.innerHTML = "";
          showProducts(filteredProducts, productsList);
        }
      });
      const categoryText = document.createElement("span");
      categoryText.textContent = "Category:";
      categoryText.style.fontWeight = "bold";
      const filterDropdownMenuCat = document.querySelector(
        ".filter-dropdown-menu",
      );
      filterDropdownMenuCat.appendChild(categoryList);
      categoryList.insertBefore(categoryText, categoryList.firstChild);
      function createFilter(filterRanges, filterType, productsList, products) {
        const filterList = document.createElement("ul");
        filterList.classList.add("dropdownContent");
        filterList.addEventListener("change", () => {
          const selectedCategories = Array.from(
            categoryList.querySelectorAll('input[type="checkbox"]:checked'),
          ).map((checkbox) => checkbox.value);
          const checkedRanges = Array.from(
            filterList.querySelectorAll('input[type="checkbox"]:checked'),
          ).map((checkbox) =>
            filterRanges.find((range) => range.label === checkbox.value),
          );
          let filteredProducts = products;
          if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              selectedCategories.includes(product.category),
            );
          }
          if (checkedRanges.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              checkedRanges.some(
                (range) =>
                  product[filterType] >= range.range[0] &&
                  product[filterType] <= range.range[1],
              ),
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
          ".filter-dropdown-menu",
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
    }
  });
}
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
