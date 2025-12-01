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
