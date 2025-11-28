// Basic search handler (placeholder for actual logic later)
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', function () {
        const txt = searchInput.value.trim();
        if (txt.length > 0) {
            alert("Searching for: " + txt);
        } else {
            alert("Please type something first!");
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === "Enter") searchBtn.click();
    });

    // Navigation buttons below hero
    // const actionBtns = document.querySelectorAll('.action-btn');
    // actionBtns.forEach(btn => {
    //     btn.addEventListener('click', function () {
    //         const sec = this.getAttribute('data-section');
    //         alert('Navigating to: ' + sec);
    //     });
    // });

    // List icon example
    document.getElementById('wishlistBtn').addEventListener('click', () => {
        alert("Viewing wishlist");
    });

    // Wishlist icon
    document.getElementById('favoritesBtn').addEventListener('click', () => {
        alert("Favorites Clicked");
    });

    // Cart logic (extremely basic)
    let cartCount = 0;
    const cartBadge = document.getElementById('cartBadge');

    document.getElementById('cartBtn').addEventListener('click', () => {
        if (cartCount === 0) {
            alert("Your cart is empty for now!");
        } else {
            alert("Cart items: " + cartCount);
        }
    });

    // Adding an unused helper (just like devs often leave around)
    function addSomethingToCart() {
        cartCount++;
        cartBadge.textContent = cartCount;
    }