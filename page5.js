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

document.querySelectorAll(".doc").forEach((doc, index) => {
  doc.addEventListener("click", function () {
    const tutorName =
      this.closest(".tutor-card").querySelector("h3").textContent;
    alert("📄 Viewing details for " + tutorName);
  });
});

document.querySelectorAll(".doc").forEach((doc, index) => {
  doc.addEventListener("click", function () {
    const tutorName =
      this.closest(".tutor-card").querySelector("h3").textContent;
    alert("📄 Viewing details for " + tutorName);
  });
});

// *** TRASH BUTTON (Remove Tutor) ***
const trashBtn = document.querySelector(".trash");
if (trashBtn) {
  trashBtn.addEventListener("click", function () {
    const confirmRemove = confirm("Are you sure you want to remove this tutor?");
    if (confirmRemove) {
      alert("Tutor removed from selection!");
    }
  });
}

// *** HEART BUTTON (Add/Remove from Wishlist) ***
const heartBtn = document.querySelector(".action-icons .heart");
let isInWishlist = false;

if (heartBtn) {
  heartBtn.addEventListener("click", function () {
    isInWishlist = !isInWishlist;
    
    if (isInWishlist) {
      this.textContent = "♥"; // Filled heart
      this.style.color = "red";
      alert("Added to favorites! ❤️");
    } else {
      this.textContent = "♡"; // Empty heart
      this.style.color = "";
      alert("Removed from favorites");
    }
  });
}

// *** CONTINUE SHOPPING BUTTON ***
const continueShopping = document.querySelector(".light-btn");
if (continueShopping && continueShopping.textContent.includes("Continue Shopping")) {
  continueShopping.addEventListener("click", function () {
    alert("Redirecting to tutor selection page...");
    window.location.href = "page4.html";
  });
}

// *** SAVE FOR LATER BUTTON ***
const saveForLater = document.querySelectorAll(".light-btn")[1];
if (saveForLater) {
  saveForLater.addEventListener("click", function () {
    alert("Tutor saved for later! You can continue browsing.");
  });
}
