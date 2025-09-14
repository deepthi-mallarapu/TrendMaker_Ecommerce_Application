const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

const cartCount = document.querySelector(".cart");
const wishlistCount = document.querySelector(".wishlist");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function updateCounts() {
  cartCount.textContent = `🛒 Cart (${cart.length})`;
  wishlistCount.textContent = `❤️ Wishlist (${wishlist.length})`;
  checkoutBtn.style.display = cart.length > 0 ? "inline-block" : "none";
}

// Convert USD → INR
function usdToInr(usd) {
  return Math.round(usd * 83);
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCounts();
}

// Render Cart
function renderCart() {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalPriceEl.textContent = "Total: ₹0";
    checkoutBtn.style.display = "none"; // hide button if empty
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const inrPrice = usdToInr(item.price);
    total += inrPrice;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>₹${inrPrice}</p>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(item.id));

    cartItemsDiv.appendChild(div);
  });

  totalPriceEl.textContent = `Total: ₹${total}`;
}

renderCart();
updateCounts();
