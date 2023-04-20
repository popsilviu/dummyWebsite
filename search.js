function searchProducts() {
  getData().then((products) => {
    if (products) {
      const productsList = document.querySelector(".products-container");
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
          searchTerm,
        );
        productsList.innerHTML = "";
        showProducts(filteredProductsByTitle, productsList);
      });
    }
  });
}
