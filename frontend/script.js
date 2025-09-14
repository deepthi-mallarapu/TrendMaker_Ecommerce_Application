const container = document.getElementById("products");
const cartCount = document.querySelector(".cart");
const wishlistCount = document.querySelector(".wishlist");
const goToCartBtn = document.getElementById("goToCartBtn");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let productsData = []; // store all products
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function updateCounts() {
  cartCount.textContent = `🛒 Cart (${cart.length})`;
  wishlistCount.textContent = `❤️ Wishlist (${wishlist.length})`;
  goToCartBtn.style.display = cart.length > 0 ? "block" : "none";
}

function addToCart(product) {
  if (!cart.find(item => item.id === product.id)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCounts();
  } else alert("Already in cart!");
}

function addToWishlist(product) {
  if (!wishlist.find(item => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounts();
  } else alert("Already in wishlist!");
}

function usdToInr(usd) {
  return Math.round(usd * 83);
}

// Render products
function renderProducts(products) {
  container.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <a href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.title}">
      </a>
      <h3>${p.title}</h3>
      <p>₹${usdToInr(p.price)}</p>
      <button class="btn cart-btn">Add to Cart</button>
      <button class="btn wishlist-btn">❤️ Wishlist</button>
    `;

    card.querySelector(".cart-btn").addEventListener("click", () => addToCart(p));
    card.querySelector(".wishlist-btn").addEventListener("click", () => addToWishlist(p));

    container.appendChild(card);
  });
}

// Fetch products from API
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    productsData = products;
    renderProducts(products);

    // Fill categories
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  });

// Search & Filter events
searchInput.addEventListener("input", () => filterProducts());
categoryFilter.addEventListener("change", () => filterProducts());

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = productsData.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchText);
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  renderProducts(filtered);
}

updateCounts();
