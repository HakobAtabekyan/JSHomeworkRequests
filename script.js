// let user = {    
//     "email": "hakob@gmail.com",
//     "password": "aA123456!"
//   };
//  fetch('https://reqres.in/api/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   }).then(response=>{
//     console.log(response.json());
//   })
 
//   let result = await response.json();
//   console.log(result);
let productcount = document.querySelector(".productscounts");
 let products = [];
 getproducts(productcount.value); 


productcount.addEventListener("change",(e)=>{
   getproducts(e.target.value);
   
})
let categorysection = document.querySelector(".categories");
categorysection.innerHTML ="";

fetch('https://dummyjson.com/products/categories')
.then((response) => {
  return response.json();
})
.then((categories) => {  
    let newrow = document.createElement("option");
    newrow.innerHTML = "all";
    newrow.value = "all";  
    newrow.selected = true;
    categorysection.append(newrow)  
    categories.forEach( item => {
    let newrow = document.createElement("option");
    newrow.innerHTML = item;
    newrow.value = item;    
    categorysection.append(newrow)

});

});

categorysection.addEventListener("change",(e)=>{ 
    let categoryname = e.target.value;
console.log(categoryname)
    if (categoryname == "all") {
        getproducts(productcount.value)
        
    } else {        
        getproductsbycategory(categoryname)
    }
})


let searchinput = document.querySelector(".search");

searchinput.addEventListener("input",(e)=>{
let searchtext = e.target.value;

if (searchtext.length >0) {
    getproductsbysearch(searchtext) }

})




function getproducts(productcount){   
    fetch('https://dummyjson.com/products?limit='+productcount)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        products = data.products;
        showproducts(products)
    });

}

function getproductsbycategory(categoryname){   
    fetch('https://dummyjson.com/products/category/'+categoryname)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        products = data.products;
        showproducts(products)
    });

}
function getproductsbysearch(searchtext){   
    fetch('https://dummyjson.com/products/search?q='+searchtext)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        products = data.products;
        showproducts(products)
    });

}


function  showproducts() {    
let productssection = document.querySelector(".row-section");
productssection.innerHTML ="";
products.forEach(element =>{ 
    let newrow = document.createElement("h3");
    newrow.innerHTML = `# ${element.id}: ${element.title}`
    newrow.id = element.id;
    newrow.addEventListener("click",showinfo)
    productssection.append(newrow)

});
}

function showinfo() {   
    let  infosection = document.querySelector(".info");   
    infosection.innerHTML = ""
    fetch('https://dummyjson.com/products/'+this.id)
    .then((response) => {
      return response.json();
    })
    .then((data) => {   
      
for (const key in data) {
    let newrow = document.createElement("h4");
    newrow.innerHTML = `${key}: ${data[key]}`    
    infosection.append(newrow)   
}
    });
    
}

