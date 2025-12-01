let selectedPaymentMethod = -1;

// *** SEARCH FEATURE ***
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", function () {
  const txt = searchInput.value.trim();
  if (txt.length > 0) {
    alert("Searching for: " + txt);
  } else {
    alert("Please type something first!");
  }
});

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") searchBtn.click();
});

// *** SOCIAL BUTTONS ***
document.getElementById("wishlistBtn").addEventListener("click", () => {
  alert("Viewing wishlist");
});

// Wishlist icon
document.getElementById("favoritesBtn").addEventListener("click", () => {
  alert("Favorites Clicked");
});

let cartCount = 1;
const cartBadge = document.getElementById("cartBadge");

document.getElementById("cartBtn").addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Your cart is empty for now!");
  } else {
    alert("Cart items: " + cartCount);
  }
});

// Payment method selection
function selectPayment(index) {
  const paymentMethods = document.querySelectorAll(".payment-method");

  paymentMethods.forEach((method, i) => {
    if (i === index) {
      method.classList.add("selected");
    } else {
      method.classList.remove("selected");
    }
  });

  selectedPaymentMethod = index;
}

// Confirm booking
function confirmBooking() {
  if (selectedPaymentMethod === -1) {
    alert("Please select a payment method first!");
    return;
  }

  const paymentMethods = [
    "Credit/Debit Card",
    "PayPal",
    "Apple Pay",
    "JazzCash/Easypaisa",
  ];
  const selectedMethod = paymentMethods[selectedPaymentMethod];

  alert(
    "Booking Confirmed!\n\nPayment Method: " +
      selectedMethod +
      "\nTotal Amount: 7750.25 Rs.\n\nYou will receive a confirmation email shortly with tutor details and session information.\n\nThank you for choosing Tutor Time!"
  );
}
