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

// *** ICON BUTTONS ***
document.getElementById("wishlistBtn").addEventListener("click", () => {
  alert("Viewing wishlist");
});

document.getElementById("favoritesBtn").addEventListener("click", () => {
  alert("Favorites Clicked");
});

// Cart logic
let cartCount = 1;
const cartBadge = document.getElementById("cartBadge");

document.getElementById("cartBtn").addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Your cart is empty for now!");
  } else {
    alert("Cart items: " + cartCount);
  }
});

document.querySelectorAll(".heart").forEach((heart, index) => {
  heart.addEventListener("click", function () {
    const tutorName =
      this.closest(".tutor-card").querySelector("h3").textContent;
    alert("❤️ Added " + tutorName + " to your wishlist!");
    this.textContent = "❤️"; // Change to filled heart
  });
});

document.querySelectorAll(".doc").forEach((doc, index) => {
  doc.addEventListener("click", function () {
    const tutorName =
      this.closest(".tutor-card").querySelector("h3").textContent;
    alert("📄 Viewing details for " + tutorName);
  });
});
