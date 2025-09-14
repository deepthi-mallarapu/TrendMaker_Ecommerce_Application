const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productDetails = document.getElementById("productDetails");
const cartCount = document.querySelector(".cart");
const wishlistCount = document.querySelector(".wishlist");
const goToCartBtn = document.getElementById("goToCartBtn");

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
  } else {
    alert("Already in cart!");
  }
}

function addToWishlist(product) {
  if (!wishlist.find(item => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounts();
  } else {
    alert("Already in wishlist!");
  }
}

function usdToInr(usd) {
  return Math.round(usd * 83);
}

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(p => {
    const discount = Math.floor(Math.random() * 20) + 5;
    const discountedPrice = usdToInr(p.price) * (100 - discount) / 100;

    productDetails.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="product-info">
        <h2>${p.title}</h2>
        <p class="price">₹${discountedPrice} <span class="discount">(${discount}% OFF)</span></p>
        <p><del>₹${usdToInr(p.price)}</del></p>
        <p>${p.description}</p>
        <p class="rating">⭐ ${p.rating.rate} (${p.rating.count} reviews)</p>
        <button class="btn cart-btn">Add to Cart</button>
        <button class="btn wishlist-btn">❤️ Wishlist</button>
      </div>
    `;

    document.querySelector(".cart-btn").addEventListener("click", () => addToCart(p));
    document.querySelector(".wishlist-btn").addEventListener("click", () => addToWishlist(p));
    updateCounts();
  });

updateCounts();
