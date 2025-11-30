// Tutor Time - Interactive JavaScript
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupWishlist();
    setupCart();
    setupSearch();
    setupSubjectCards();
    setupDropdowns();
    setupFilters();
}

// ===========================================
// WISHLIST & CART MANAGEMENT
// ===========================================

let wishlist = [];
let cart = [];

function setupWishlist() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const heartIcon = card.querySelector('.card-icons');
        if (heartIcon) {
            const heart = heartIcon.textContent.includes('❤️') ? heartIcon : null;
            if (heart) {
                heartIcon.addEventListener('click', function(e) {
                    if (e.target.textContent.includes('❤️') || e.target === heartIcon) {
                        toggleWishlist(card);
                    }
                });
            }
        }
    });
}

function toggleWishlist(card) {
    const subject = card.querySelector('h3').textContent;
    const index = wishlist.indexOf(subject);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        card.style.borderColor = '#ddd';
        showNotification(`${subject} removed from wishlist`, 'info');
    } else {
        wishlist.push(subject);
        card.style.borderColor = '#ff6b6b';
        showNotification(`${subject} added to wishlist!`, 'success');
    }
    
    updateWishlistIcon();
}

function setupCart() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const selectBtn = card.querySelector('.select-btn');
        if (selectBtn) {
            selectBtn.addEventListener('click', function() {
                addToCart(card);
            });
        }
        
        // Handle note icon (📝) for cart
        const noteIcon = card.querySelector('.card-icons');
        if (noteIcon) {
            noteIcon.addEventListener('click', function(e) {
                if (e.target.textContent.includes('📝')) {
                    addToCart(card);
                }
            });
        }
    });
}

function addToCart(card) {
    const subject = card.querySelector('h3').textContent;
    
    if (!cart.includes(subject)) {
        cart.push(subject);
        card.style.backgroundColor = '#e8f5e9';
        showNotification(`${subject} added to cart!`, 'success');
        updateCartIcon();
        
        // Animate the button
        const btn = card.querySelector('.select-btn');
        btn.textContent = 'ADDED ✓';
        btn.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
            btn.textContent = 'SELECT';
            btn.style.backgroundColor = '';
        }, 2000);
    } else {
        showNotification(`${subject} is already in your cart`, 'info');
    }
}

function updateWishlistIcon() {
    const wishlistIcon = document.querySelector('img[src="wishlist.png"]');
    if (wishlistIcon && wishlist.length > 0) {
        wishlistIcon.style.filter = 'brightness(1.5)';
        wishlistIcon.style.transform = 'scale(1.1)';
    }
}

function updateCartIcon() {
    const cartIcon = document.querySelector('img[src="cart.png"]');
    if (cartIcon && cart.length > 0) {
        cartIcon.style.filter = 'brightness(1.5)';
        cartIcon.style.transform = 'scale(1.1)';
    }
}

// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================

function setupSearch() {
    const searchInput = document.querySelector('.searchbar input');
    const searchBtn = document.querySelector('.searchbar button');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search filter
        searchInput.addEventListener('input', function() {
            filterSubjects(this.value);
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.searchbar input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        filterSubjects(query);
        showNotification(`Searching for: ${query}`, 'info');
    } else {
        showNotification('Please enter a search term', 'warning');
    }
}

function filterSubjects(query) {
    const cards = document.querySelectorAll('.card');
    query = query.toLowerCase();
    
    cards.forEach(card => {
        const subject = card.querySelector('h3').textContent.toLowerCase();
        
        if (subject.includes(query) || query === '') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===========================================
// SUBJECT CARDS INTERACTIONS
// ===========================================

function setupSubjectCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        // Click on card to view details
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking button or icons
            if (!e.target.classList.contains('select-btn') && 
                !e.target.closest('.card-icons')) {
                showSubjectDetails(this);
            }
        });
    });
}

function showSubjectDetails(card) {
    const subject = card.querySelector('h3').textContent;
    const message = `
        <strong>${subject}</strong><br>
        Click SELECT to add to cart<br>
        Click ❤️ to add to wishlist<br>
        Click 📝 to add notes
    `;
    showNotification(message, 'info');
}

// ===========================================
// DROPDOWN MENUS
// ===========================================

function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const link = this.querySelector('a').textContent;
            showNotification(`${link} menu clicked`, 'info');
        });
    });
}

// ===========================================
// FILTERS (City & Class)
// ===========================================

function setupFilters() {
    const cityInput = document.querySelector('.filters input[placeholder*="City"]');
    const classInput = document.querySelector('.filters input[placeholder="Class"]');
    
    if (cityInput) {
        cityInput.addEventListener('change', function() {
            const city = this.value.toUpperCase();
            if (city === 'ISB' || city === 'LHR' || city === 'KHI') {
                showNotification(`Location set to: ${city}`, 'success');
            } else if (city) {
                showNotification('Valid cities: ISB, LHR, KHI', 'warning');
            }
        });
    }
    
    if (classInput) {
        classInput.addEventListener('change', function() {
            const classValue = this.value;
            if (classValue) {
                showNotification(`Class selected: ${classValue}`, 'success');
                filterByClass(classValue);
            }
        });
    }
}

function filterByClass(classValue) {
    // This would filter subjects based on class level
    // For now, just show notification
    console.log(`Filtering subjects for class: ${classValue}`);
}

// ===========================================
// NOTIFICATION SYSTEM
// ===========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.custom-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = message;
    
    // Style the notification
    const colors = {
        success: '#4caf50',
        info: '#2196F3',
        warning: '#ff9800',
        error: '#f44336'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================================
// NAVIGATION & AUTH LINKS
// ===========================================

const authLinks = document.querySelectorAll('.auth-links a');
authLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const action = this.textContent;
        showNotification(`${action} page - Coming soon!`, 'info');
    });
});

const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            const page = this.textContent;
            showNotification(`Navigating to ${page}`, 'info');
        }
    });
});

// ===========================================
// ICON CLICKS (Wishlist & Cart in Nav)
// ===========================================

const wishlistNavIcon = document.querySelector('img[src="wishlist.png"]');
if (wishlistNavIcon) {
    wishlistNavIcon.addEventListener('click', function() {
        showWishlistModal();
    });
}

const cartNavIcon = document.querySelector('img[src="cart.png"]');
if (cartNavIcon) {
    cartNavIcon.addEventListener('click', function() {
        showCartModal();
    });
}

function showWishlistModal() {
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }
    
    const message = `
        <strong>Your Wishlist:</strong><br>
        ${wishlist.join('<br>')}
    `;
    showNotification(message, 'info');
}

function showCartModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    const message = `
        <strong>Your Cart:</strong><br>
        ${cart.join('<br>')}
    `;
    showNotification(message, 'success');
}

// ===========================================
// ANIMATIONS CSS (injected)
// ===========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .select-btn {
        transition: all 0.3s ease;
    }
    
    .card-icons {
        cursor: pointer;
        user-select: none;
    }
`;
document.head.appendChild(style);

// ===========================================
// CONSOLE WELCOME MESSAGE
// ===========================================

console.log('%cTutor Time System Loaded ✓', 'color: #4caf50; font-size: 16px; font-weight: bold;');
console.log('Wishlist:', wishlist);
console.log('Cart:', cart);