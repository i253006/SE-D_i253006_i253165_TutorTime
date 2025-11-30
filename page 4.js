// Tutor Time - Tutors Page JavaScript
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTutorsPage();
});

function initializeTutorsPage() {
    setupWishlist();
    setupCart();
    setupSearch();
    setupTutorCards();
    setupFilters();
    setupRatingInteraction();
    setupAvailabilityFilter();
}

// ===========================================
// DATA STORAGE
// ===========================================

let wishlist = [];
let cart = [];
let selectedTutors = [];

// ===========================================
// WISHLIST MANAGEMENT
// ===========================================

function setupWishlist() {
    const tutorCards = document.querySelectorAll('.tutor-card');
    
    tutorCards.forEach(card => {
        const heartIcon = card.querySelector('.heart');
        
        if (heartIcon) {
            heartIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleWishlist(card, this);
            });
        }
    });
}

function toggleWishlist(card, heartIcon) {
    const tutorName = card.querySelector('h3').textContent.trim();
    const price = card.querySelector('.price').textContent;
    const rating = card.querySelector('.stars').textContent.length;
    
    const tutorData = {
        name: tutorName,
        price: price,
        rating: rating
    };
    
    const index = wishlist.findIndex(t => t.name === tutorName);
    
    if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        heartIcon.textContent = '♡';
        heartIcon.style.color = '#666';
        card.style.borderColor = '';
        showNotification(`${tutorName} removed from wishlist`, 'info');
    } else {
        // Add to wishlist
        wishlist.push(tutorData);
        heartIcon.textContent = '♥';
        heartIcon.style.color = '#ff6b6b';
        card.style.borderColor = '#ff6b6b';
        showNotification(`${tutorName} added to wishlist!`, 'success');
    }
    
    updateWishlistIcon();
    console.log('Current Wishlist:', wishlist);
}

function updateWishlistIcon() {
    const wishlistIcon = document.querySelector('.icons img[src="wishlist.png"]');
    if (wishlistIcon) {
        if (wishlist.length > 0) {
            wishlistIcon.style.filter = 'brightness(1.5) drop-shadow(0 0 5px #ff6b6b)';
            wishlistIcon.style.transform = 'scale(1.15)';
        } else {
            wishlistIcon.style.filter = '';
            wishlistIcon.style.transform = '';
        }
    }
}

// ===========================================
// CART MANAGEMENT
// ===========================================

function setupCart() {
    const tutorCards = document.querySelectorAll('.tutor-card');
    
    tutorCards.forEach(card => {
        const selectBtn = card.querySelector('.select-btn');
        const docIcon = card.querySelector('.doc');
        
        if (selectBtn) {
            selectBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(card, this);
            });
        }
        
        if (docIcon) {
            docIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                showTutorDetails(card);
            });
        }
    });
}

function addToCart(card, button) {
    const tutorName = card.querySelector('h3').textContent.trim();
    const price = card.querySelector('.price').textContent;
    const rating = card.querySelector('.stars').textContent.length;
    const availability = card.querySelector('.availability').textContent;
    
    // Check if tutor is available
    if (availability.includes('Not Available')) {
        showNotification(`${tutorName} is currently not available`, 'warning');
        return;
    }
    
    const tutorData = {
        name: tutorName,
        price: price,
        rating: rating,
        availability: availability
    };
    
    const index = cart.findIndex(t => t.name === tutorName);
    
    if (index === -1) {
        cart.push(tutorData);
        card.style.backgroundColor = '#e8f5e9';
        button.textContent = 'ADDED ✓';
        button.style.backgroundColor = '#4caf50';
        button.style.color = 'white';
        
        showNotification(`${tutorName} added to cart!`, 'success');
        updateCartIcon();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = 'SELECT';
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 2000);
    } else {
        showNotification(`${tutorName} is already in your cart`, 'info');
    }
    
    console.log('Current Cart:', cart);
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.icons img[src="cart.png"]');
    if (cartIcon) {
        if (cart.length > 0) {
            cartIcon.style.filter = 'brightness(1.5) drop-shadow(0 0 5px #4caf50)';
            cartIcon.style.transform = 'scale(1.15)';
        } else {
            cartIcon.style.filter = '';
            cartIcon.style.transform = '';
        }
    }
}

// ===========================================
// TUTOR DETAILS
// ===========================================

function showTutorDetails(card) {
    const tutorName = card.querySelector('h3').textContent.trim();
    const price = card.querySelector('.price').textContent;
    const rating = card.querySelector('.stars').textContent;
    const availability = card.querySelector('.availability').textContent;
    
    const details = `
        <div style="text-align: left;">
            <strong style="font-size: 16px;">${tutorName}</strong><br>
            <span style="color: gold;">${rating}</span><br>
            <span style="color: ${availability.includes('Available') ? '#4caf50' : '#f44336'}">
                ${availability}
            </span><br>
            ${price}
        </div>
    `;
    
    showNotification(details, 'info');
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
        
        // Real-time search
        searchInput.addEventListener('input', function() {
            filterTutors(this.value);
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.searchbar input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        filterTutors(query);
        showNotification(`Searching for: ${query}`, 'info');
    }
}

function filterTutors(query) {
    const tutorCards = document.querySelectorAll('.tutor-card');
    query = query.toLowerCase();
    let visibleCount = 0;
    
    tutorCards.forEach(card => {
        const tutorName = card.querySelector('h3').textContent.toLowerCase();
        const price = card.querySelector('.price').textContent.toLowerCase();
        
        if (tutorName.includes(query) || price.includes(query) || query === '') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (visibleCount === 0 && query !== '') {
        showNotification('No tutors found matching your search', 'warning');
    }
}

// ===========================================
// TUTOR CARDS INTERACTIONS
// ===========================================

function setupTutorCards() {
    const tutorCards = document.querySelectorAll('.tutor-card');
    
    tutorCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Click on tutor image to view full details
        const tutorImg = card.querySelector('img.social-icon');
        if (tutorImg) {
            tutorImg.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showTutorDetails(card);
            });
        }
    });
}

// ===========================================
// RATING INTERACTION
// ===========================================

function setupRatingInteraction() {
    const starRatings = document.querySelectorAll('.stars');
    
    starRatings.forEach(stars => {
        stars.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.tutor-card');
            const tutorName = card.querySelector('h3').textContent.trim();
            const rating = this.textContent.length;
            
            showNotification(`${tutorName} has a ${rating}/5 rating`, 'info');
        });
        
        // Hover effect on stars
        stars.style.cursor = 'pointer';
        stars.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        stars.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===========================================
// AVAILABILITY FILTER
// ===========================================

function setupAvailabilityFilter() {
    // Create filter buttons dynamically
    const tutorGrid = document.querySelector('.tutor-grid');
    if (!tutorGrid) return;
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';
    filterContainer.style.cssText = `
        text-align: center;
        margin: 20px 0;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 8px;
    `;
    
    filterContainer.innerHTML = `
        <button class="filter-btn" data-filter="all">All Tutors</button>
        <button class="filter-btn" data-filter="available">Available Only</button>
        <button class="filter-btn" data-filter="not-available">Not Available</button>
        <button class="filter-btn" data-filter="high-rated">5 Star Rated</button>
        <button class="filter-btn" data-filter="price-low">Price: Low to High</button>
    `;
    
    tutorGrid.parentNode.insertBefore(filterContainer, tutorGrid);
    
    // Add click handlers
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            applyFilter(filter);
        });
    });
    
    // Set "All Tutors" as active by default
    filterButtons[0].classList.add('active');
}

function applyFilter(filter) {
    const tutorCards = document.querySelectorAll('.tutor-card');
    let cardsArray = Array.from(tutorCards);
    
    // Reset display
    tutorCards.forEach(card => {
        card.style.display = 'block';
        card.style.order = '0';
    });
    
    switch(filter) {
        case 'all':
            showNotification('Showing all tutors', 'info');
            break;
            
        case 'available':
            tutorCards.forEach(card => {
                const availability = card.querySelector('.availability');
                if (!availability.classList.contains('available')) {
                    card.style.display = 'none';
                }
            });
            showNotification('Showing available tutors only', 'success');
            break;
            
        case 'not-available':
            tutorCards.forEach(card => {
                const availability = card.querySelector('.availability');
                if (!availability.classList.contains('not-available')) {
                    card.style.display = 'none';
                }
            });
            showNotification('Showing unavailable tutors', 'info');
            break;
            
        case 'high-rated':
            tutorCards.forEach(card => {
                const stars = card.querySelector('.stars').textContent.length;
                if (stars < 5) {
                    card.style.display = 'none';
                }
            });
            showNotification('Showing 5-star rated tutors only', 'success');
            break;
            
        case 'price-low':
            sortByPrice();
            showNotification('Sorted by price: Low to High', 'info');
            break;
    }
}

function sortByPrice() {
    const tutorGrid = document.querySelector('.tutor-grid');
    const tutorCards = Array.from(document.querySelectorAll('.tutor-card'));
    
    tutorCards.sort((a, b) => {
        const priceA = extractPrice(a.querySelector('.price').textContent);
        const priceB = extractPrice(b.querySelector('.price').textContent);
        return priceA - priceB;
    });
    
    // Re-append in sorted order
    tutorCards.forEach(card => tutorGrid.appendChild(card));
}

function extractPrice(priceText) {
    const match = priceText.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}

// ===========================================
// NAVIGATION ICONS (Wishlist & Cart)
// ===========================================

const wishlistNavIcon = document.querySelector('.icons img[src="wishlist.png"]');
if (wishlistNavIcon) {
    wishlistNavIcon.addEventListener('click', function() {
        showWishlistModal();
    });
}

const cartNavIcon = document.querySelector('.icons img[src="cart.png"]');
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
    
    let message = '<div style="text-align: left;"><strong>Your Wishlist:</strong><br><br>';
    wishlist.forEach(tutor => {
        message += `📚 ${tutor.name}<br>${tutor.price}<br><br>`;
    });
    message += '</div>';
    
    showNotification(message, 'info');
}

function showCartModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    let message = '<div style="text-align: left;"><strong>Your Cart:</strong><br><br>';
    let total = 0;
    
    cart.forEach(tutor => {
        message += `✓ ${tutor.name}<br>${tutor.price}<br><br>`;
        total += extractPrice(tutor.price);
    });
    
    message += `<strong>Estimated Total: Rs. ${total}</strong></div>`;
    
    showNotification(message, 'success');
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
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        line-height: 1.6;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===========================================
// AUTH & NAVIGATION LINKS
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
            const page = this.textContent.trim();
            showNotification(`Navigating to ${page}`, 'info');
        }
    });
});

// ===========================================
// ANIMATIONS & STYLES
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
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    
    .tutor-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .select-btn {
        transition: all 0.3s ease;
    }
    
    .heart, .doc {
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
    }
    
    .heart:hover {
        transform: scale(1.3);
        filter: drop-shadow(0 0 3px #ff6b6b);
    }
    
    .doc:hover {
        transform: scale(1.3);
        filter: drop-shadow(0 0 3px #2196F3);
    }
    
    .stars {
        transition: all 0.2s ease;
    }
    
    .filter-btn {
        padding: 10px 20px;
        margin: 5px;
        border: 2px solid #ddd;
        background: white;
        border-radius: 25px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        transition: all 0.3s ease;
        outline: none;
    }
    
    .filter-btn:hover {
        background: #f0f0f0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .filter-btn.active {
        background: #4caf50;
        color: white;
        border-color: #4caf50;
    }
    
    .icons img {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===========================================
// CONSOLE WELCOME MESSAGE
// ===========================================

console.log('%cTutor Time - Tutors Page Loaded ✓', 'color: #4caf50; font-size: 16px; font-weight: bold;');
console.log('Features: Wishlist, Cart, Search, Filters, Rating System');
console.log('Current Wishlist:', wishlist);
console.log('Current Cart:', cart);