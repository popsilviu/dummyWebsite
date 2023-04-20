# dummyWebsite

## Development

To run the project locally:

```
git clone https://github.com/popsilviu/dummyWebsite.git
cd dummyWebsite
npm install
```

Start development backend:

```
npx json-server --watch db.json
```

## TODO

1. ~~Clean up CSS, make it nice~~
2. ~~Add images~~
3. ~~Create a image slide~~
4. ~~If discount - calculate discounted price, add to HTML make it nice~~
5. ~~Make it obvious which is the price, discount, rating, stock~~
6. ~~Add unique ids to HTML for each product~~


7. ~~If not discount on product do not calculate discount, add validation in javascript~~
8. ~~Add a buy button or a add to cart~~

- on buy button click - open shopping cart with item already in it
- on add to cart just store the selected item

9. Add a shopping cart functionality

- it there are product in cart added by 'add to cart' then populate the product list with them
- a product list - product - quantity, price (calculated by quantity), remove from cart (delete)
- total sum on ordered items
- Confirmation button

10. ~~On click on product open dialog/modal to view product details~~
11. ~~Compare products~~
12. ~~Add product to favorites~~
13. ~~Add filtering by filter products by category, price, stock, rating~~
14. Sort products by price, alphabetical order, rating (both ascending and descending)
15. ~~Add user comments~~
16. Create a proper backend database, CRUD operations
17. Add view cart functionality
18. Add checkout functionality
19. Search functionality
