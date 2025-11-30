    // *** SEARCH FEATURE ***
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

    // *** SOCIAL BUTTONS ***
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

        // FAQ Toggle
        function toggleFAQ(index) {
            const answer = document.getElementById('answer-' + index);
            const icon = document.getElementById('icon-' + index);
            
            answer.classList.toggle('active');
            icon.classList.toggle('active');
        }

        // Contact Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && message) {
                alert('Thank you for contacting us!\n\nWe will respond to you soon.');
                this.reset();
            }
        });
    