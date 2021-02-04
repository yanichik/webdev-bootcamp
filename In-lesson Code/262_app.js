const groceryForm = document.querySelector("#groceryForm");
const listContainer = document.querySelector("#list");

groceryForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    const productInput = groceryForm.elements.product;
    const quantityInput = groceryForm.elements.qty;
    addProduct(productInput.value, quantityInput);
    
})

const addProduct = function(product, quantity){
    const newProduct = document.createElement("li");
    newProduct.append(`${quantity} `);
    newProduct.append(`${product}`);
    listContainer.append(newProduct);
    
}