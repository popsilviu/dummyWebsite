
function sortProducts(){
getData().then((products)=>{
if (products){


const productsList = document.querySelector('.products-container');
let sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('input', handleSelect);

function handleSelect(ev){
  let select=ev.target;
  console.log(select.value)
  switch (select.value){
    case 'priceAsc':
    products.sort((a,b)=>{
      return a.price - b.price;
    });
    
    productsList.innerHTML="";
    showProducts(products);
    break;

    case 'priceDesc':
      products.sort((a,b)=>{
        return b.price - a.price;
      });
      
      productsList.innerHTML="";
      showProducts(products);
      break;  

    case 'A-Z':
      products.sort((a,b)=>{
        a=a.title.toLowerCase();
        b=b.title.toLowerCase();
       return a > b ? 1 : -1
      });
      
      productsList.innerHTML="";
      showProducts(products);
      break;  

    case 'Z-A':
      products.sort((a,b)=>{
        a=a.title.toLowerCase();
        b=b.title.toLowerCase();
       return a > b ? -1 : 1
      });
      
      productsList.innerHTML="";
      showProducts(products);
      break;  

    case 'ratingAsc':
      products.sort((a,b)=>{
      return a.rating - b.rating;
      });
      
      productsList.innerHTML="";
      showProducts(products);
      break;  

    case 'ratingDesc':
      products.sort((a,b)=>{
      return b.rating - a.rating;
      });
      
      productsList.innerHTML="";
      showProducts(products);
      break;    
    case 'default':
      products.sort((a,b)=>{
        return a.id-b.id; 
      });      
      productsList.innerHTML="";
      showProducts(products);
      
      break;  
  }
}
    }
  })
}
