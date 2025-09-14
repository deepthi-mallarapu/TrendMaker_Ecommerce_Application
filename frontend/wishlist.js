const wishlistItemsDiv = document.getElementById("wishlistItems");

const cartCount = document.querySelector(".cart");
const wishlistCount = document.querySelector(".wishlist");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function updateCounts() {
  cartCount.textContent = `🛒 Cart (${cart.length})`;
  wishlistCount.textContent = `❤️ Wishlist (${wishlist.length})`;
}

function usdToInr(usd) {
  return Math.round(usd * 83);
}

// Remove from wishlist
function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
  updateCounts();
}

// Move item to cart
function moveToCart(product) {
  if (!cart.find(item => item.id === product.id)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  removeFromWishlist(product.id);
}

// Render wishlist
function renderWishlist() {
  wishlistItemsDiv.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItemsDiv.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  wishlist.forEach(item => {
    const inrPrice = usdToInr(item.price);

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>₹${inrPrice}</p>
      </div>
      <button class="move-btn">Move to Cart</button>
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".move-btn").addEventListener("click", () => moveToCart(item));
    div.querySelector(".remove-btn").addEventListener("click", () => removeFromWishlist(item.id));

    wishlistItemsDiv.appendChild(div);
  });
}

renderWishlist();
updateCounts();
