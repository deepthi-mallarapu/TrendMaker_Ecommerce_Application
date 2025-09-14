// Grab the form
const form = document.getElementById("checkoutForm");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Optional: Update cart count on navbar if needed
const cartCount = document.querySelector(".cart");
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = `🛒 Cart (${cart.length})`;
  }
}
updateCartCount();

// Form submit event
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent page reload

  // Optional: You can fetch form values if needed
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (!name || !email || !address || !city || !zip || !paymentMethod) {
    alert("Please fill all required fields!");
    return;
  }

  // Clear the cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count in navbar
  updateCartCount();

  // Redirect to success page with animated check mark
  window.location.href = "order-success.html";

  // Reset form (optional)
  form.reset();
});
