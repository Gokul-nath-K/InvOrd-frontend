import { products } from '../assets/data.js';

console.log("Hello world!");

let product_container =  document.getElementById("product-container");
const searchInput = document.getElementById('search-bar');
const cartContent = document.getElementById('cart-content');
const checkoutSection = document.getElementById('checkout-section');
let cart = [];

listProducts(products);

function insertProduct(product) {

    const productCard = document.createElement("div");
        productCard.className = 'product-card';
        productCard.innerHTML = `
                    <div class="product-img">
                            <img src="${product.imageurl}" />
                    </div>
                    <div class="product-details">
                        <span class="product-catagory">${product.category}</span>
                        <h4><a href="">${product.name}</a></h4>
                        <div class="product-bottom-details">
                            <div class="product-price">Rs.${product.price}</div>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>`;
        const addToCartButton = productCard.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => addToCart(product));
        return productCard;
}
function listProducts(products) {
    product_container.innerHTML = ''; 
    products.forEach(product => {
        const productCard = insertProduct(product)
        product_container.appendChild(productCard);
    })
}

document.getElementById("form").onsubmit = handleSubmit;

let product = {};

function handleSubmit(event) {
    event.preventDefault();
    console.log("Function xalled");
    product.name = document.getElementById("product_name").value;
    product.price = document.getElementById("price").value;
    product.quantity = document.getElementById("quantity").value;
    product.category = document.getElementById("category").value;
    product.imageurl = "https://ik.imagekit.io/gokul/PartyEvent/party01.jpg"
    products.push(product);
    product_container.appendChild(insertProduct(product));
    document.getElementById("form").reset();
}

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query));
    listProducts(filteredProducts);
}

const filterInput = document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('click', handleFilter);
});

function handleFilter() {

    let filteredProducts = [];

    if(document.getElementById("all").checked) {

        listProducts(products);
    } 
    else if(document.getElementById("no-stock").checked) {
        filteredProducts= products.filter(product => 
            product.quantity <= 0);

        listProducts(filteredProducts);
    }
    else {
        filteredProducts= products.filter(product => 
            product.quantity > 0);

        listProducts(filteredProducts);
    }
}

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartContent.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
        <div class="product-card-1">
        <div class="product-img">
                            <img src="${product.imageurl}" />
                    </div>
                    <div class="product-details">
                        <span class="product-catagory">${product.category}</span>
                        <h4><a href="">${product.name}</a></h4>
                        <div class="product-bottom-details">
                            <div class="product-price">Rs.${product.price}</div></br>
                        </div>
                        </div>
                    </div>`;
        cartContent.appendChild(cartItem);
    });
    
    if (cart.length > 0) {
        checkoutSection.style.display = 'block';
    } else {
        checkoutSection.style.display = 'none';
    }
}

listProducts(products);

searchInput.addEventListener('input', handleSearch);