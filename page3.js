// Subject selection
function selectSubject(subject) {
  alert(
    `You have selected ${subject}. This would typically proceed to tutor selection.`
  );
}

// Wishlist toggle
function toggleWishlist(button) {
  const icon = button.querySelector("i");
  if (icon.classList.contains("bi-heart")) {
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
    icon.style.color = "red";
  } else {
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
    icon.style.color = "";
  }
}

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

// *** ICON BUTTONS ***
document.getElementById("wishlistBtn").addEventListener("click", () => {
  alert("Viewing wishlist");
});

document.getElementById("favoritesBtn").addEventListener("click", () => {
  alert("Favorites Clicked");
});

// Cart logic
let cartCount = 0;
const cartBadge = document.getElementById("cartBadge");

document.getElementById("cartBtn").addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Your cart is empty for now!");
  } else {
    alert("Cart items: " + cartCount);
  }
});
