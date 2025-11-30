// Tutor Time - Dashboard Page JavaScript
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// ===========================================
// DATA STORAGE
// ===========================================

let userData = {
    name: 'Student User',
    email: 'student@tutortime.com',
    wishlistCount: 0,
    cartCount: 0,
    favouritesCount: 0
};

let wishlist = [];
let cart = [];
let favourites = [];

// ===========================================
// INITIALIZATION
// ===========================================

function initializeDashboard() {
    setupFeatureBoxes();
    setupSearch();
    setupNavigation();
    setupFooterLinks();
    loadUserData();
    animateFeatureBoxes();
}

// ===========================================
// LOAD USER DATA
// ===========================================

function loadUserData() {
    // Simulate loading data from localStorage or API
    // In real implementation, this would fetch actual user data
    
    // Mock data for demonstration
    wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    
    userData.wishlistCount = wishlist.length;
    userData.cartCount = cart.length;
    userData.favouritesCount = favourites.length;
    
    console.log('User Data Loaded:', userData);
}

// ===========================================
// FEATURE BOXES SETUP
// ===========================================

function setupFeatureBoxes() {
    const wishlistBox = document.querySelector('#wishlistIcon').closest('.feature-box');
    const cartBox = document.querySelector('#cartIcon').closest('.feature-box');
    const profileBox = document.querySelector('#profileIcon').closest('.feature-box');
    const favBox = document.querySelector('#favIcon').closest('.feature-box');
    
    // Wishlist Box
    if (wishlistBox) {
        wishlistBox.addEventListener('click', function() {
            navigateToWishlist();
        });
        addHoverEffect(wishlistBox, '#ff6b6b');
    }
    
    // Cart/Selected Tutor Box
    if (cartBox) {
        cartBox.addEventListener('click', function() {
            navigateToCart();
        });
        addHoverEffect(cartBox, '#4caf50');
    }
    
    // Profile Box
    if (profileBox) {
        profileBox.addEventListener('click', function() {
            navigateToProfile();
        });
        addHoverEffect(profileBox, '#2196F3');
    }
    
    // Favourites Box
    if (favBox) {
        favBox.addEventListener('click', function() {
            navigateToFavourites();
        });
        addHoverEffect(favBox, '#ff4081');
    }
}

function addHoverEffect(box, color) {
    box.style.cursor = 'pointer';
    box.style.transition = 'all 0.3s ease';
    
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.boxShadow = `0 12px 24px ${color}33`;
        this.style.borderColor = color;
        
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        this.style.borderColor = '';
        
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) rotate(0deg)';
        }
    });
}

// ===========================================
// NAVIGATION FUNCTIONS
// ===========================================

function navigateToWishlist() {
    showNotification('Opening your Wishlist...', 'info');
    
    setTimeout(() => {
        if (wishlist.length === 0) {
            showNotification('Your wishlist is empty. Start adding tutors!', 'warning');
        } else {
            showWishlistDetails();
        }
        
        // In real implementation: window.location.href = 'wishlist.html';
    }, 500);
}

function navigateToCart() {
    showNotification('Opening Selected Tutors...', 'info');
    
    setTimeout(() => {
        if (cart.length === 0) {
            showNotification('No tutors selected yet. Browse tutors now!', 'warning');
        } else {
            showCartDetails();
        }
        
        // In real implementation: window.location.href = 'cart.html';
    }, 500);
}

function navigateToProfile() {
    showNotification('Opening your Profile...', 'info');
    
    setTimeout(() => {
        showProfileDetails();
        
        // In real implementation: window.location.href = 'profile.html';
    }, 500);
}

function navigateToFavourites() {
    showNotification('Opening your Favourites...', 'info');
    
    setTimeout(() => {
        if (favourites.length === 0) {
            showNotification('No favourites added yet!', 'warning');
        } else {
            showFavouritesDetails();
        }
        
        // In real implementation: window.location.href = 'favourites.html';
    }, 500);
}

// ===========================================
// DETAIL MODALS/NOTIFICATIONS
// ===========================================

function showWishlistDetails() {
    if (wishlist.length === 0) return;
    
    let message = `<div style="text-align: left;">
        <strong>Your Wishlist (${wishlist.length} items):</strong><br><br>`;
    
    wishlist.forEach((item, index) => {
        message += `${index + 1}. ${item.name || item}<br>`;
    });
    
    message += '</div>';
    showNotification(message, 'info');
}

function showCartDetails() {
    if (cart.length === 0) return;
    
    let message = `<div style="text-align: left;">
        <strong>Selected Tutors (${cart.length}):</strong><br><br>`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name || item}<br>`;
    });
    
    message += '</div>';
    showNotification(message, 'success');
}

function showProfileDetails() {
    const message = `<div style="text-align: left;">
        <strong>Profile Information:</strong><br><br>
        <strong>Name:</strong> ${userData.name}<br>
        <strong>Email:</strong> ${userData.email}<br><br>
        <strong>Statistics:</strong><br>
        • Wishlist: ${userData.wishlistCount} items<br>
        • Cart: ${userData.cartCount} tutors<br>
        • Favourites: ${userData.favouritesCount} items
    </div>`;
    
    showNotification(message, 'info');
}

function showFavouritesDetails() {
    if (favourites.length === 0) return;
    
    let message = `<div style="text-align: left;">
        <strong>Your Favourites (${favourites.length}):</strong><br><br>`;
    
    favourites.forEach((item, index) => {
        message += `💖 ${item.name || item}<br>`;
    });
    
    message += '</div>';
    showNotification(message, 'info');
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
        
        // Add focus effect
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#2196F3';
            this.style.boxShadow = '0 0 5px rgba(33, 150, 243, 0.3)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.searchbar input');
    const query = searchInput.value.trim();
    
    if (query) {
        showNotification(`Searching for: "${query}"`, 'info');
        
        // Simulate search
        setTimeout(() => {
            showNotification('Redirecting to search results...', 'success');
            // In real implementation: window.location.href = `search.html?q=${query}`;
        }, 1000);
    } else {
        showNotification('Please enter a search term', 'warning');
    }
}

// ===========================================
// NAVIGATION BAR
// ===========================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    const authLinks = document.querySelectorAll('.auth-links a');
    const wishlistIcon = document.querySelector('.navbar .icons img[src="wishlist.png"]');
    const cartIcon = document.querySelector('.navbar .icons img[src="cart.png"]');
    
    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const page = this.textContent.trim();
                showNotification(`Navigating to ${page}`, 'info');
            }
        });
    });
    
    // Auth Links
    authLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            
            if (action === 'LOGIN') {
                showLoginModal();
            } else if (action === 'REGISTER') {
                showRegisterModal();
            }
        });
    });
    
    // Wishlist Icon
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', function() {
            navigateToWishlist();
        });
        
        addIconHover(wishlistIcon);
    }
    
    // Cart Icon
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            navigateToCart();
        });
        
        addIconHover(cartIcon);
    }
}

function addIconHover(icon) {
    icon.style.cursor = 'pointer';
    icon.style.transition = 'all 0.3s ease';
    
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';
        this.style.filter = 'brightness(1.3)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.filter = '';
    });
}

function showLoginModal() {
    const message = `<div style="text-align: center;">
        <strong style="font-size: 18px;">Login</strong><br><br>
        Please log in to access your account<br><br>
        <small>Redirecting to login page...</small>
    </div>`;
    
    showNotification(message, 'info');
    
    // In real implementation: window.location.href = 'login.html';
}

function showRegisterModal() {
    const message = `<div style="text-align: center;">
        <strong style="font-size: 18px;">Register</strong><br><br>
        Create your free account today!<br><br>
        <small>Redirecting to registration page...</small>
    </div>`;
    
    showNotification(message, 'success');
    
    // In real implementation: window.location.href = 'register.html';
}

// ===========================================
// FOOTER LINKS
// ===========================================

function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    const socialIcons = document.querySelectorAll('.footer-social i');
    
    // Footer Links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim();
            showNotification(`Opening ${page} page...`, 'info');
        });
    });
    
    // Social Icons
    socialIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.3s ease';
        
        icon.addEventListener('click', function() {
            handleSocialClick(this);
        });
        
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function handleSocialClick(icon) {
    let platform = 'Social Media';
    
    if (icon.classList.contains('fa-facebook')) {
        platform = 'Facebook';
    } else if (icon.classList.contains('fa-x-twitter')) {
        platform = 'X (Twitter)';
    } else if (icon.classList.contains('fa-instagram')) {
        platform = 'Instagram';
    } else if (icon.classList.contains('fa-youtube')) {
        platform = 'YouTube';
    }
    
    showNotification(`Opening ${platform}...`, 'info');
    
    // In real implementation: window.open('social-media-url', '_blank');
}

// ===========================================
// ANIMATIONS
// ===========================================

function animateFeatureBoxes() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            box.style.transition = 'all 0.6s ease';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}

// Add badge animations to feature boxes
function addBadgesToFeatureBoxes() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach((box, index) => {
        const p = box.querySelector('p');
        const counts = [
            userData.wishlistCount,
            userData.cartCount,
            0, // Profile doesn't have a count
            userData.favouritesCount
        ];
        
        if (counts[index] > 0 && index !== 2) {
            const badge = document.createElement('span');
            badge.className = 'count-badge';
            badge.textContent = counts[index];
            badge.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: #f44336;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                animation: pulse 2s infinite;
            `;
            
            box.style.position = 'relative';
            box.appendChild(badge);
        }
    });
}

// Call this after loading user data
setTimeout(addBadgesToFeatureBoxes, 500);

// ===========================================
// KEYBOARD SHORTCUTS
// ===========================================

document.addEventListener('keydown', function(e) {
    // Alt + W: Wishlist
    if (e.altKey && e.key === 'w') {
        e.preventDefault();
        navigateToWishlist();
    }
    
    // Alt + C: Cart
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        navigateToCart();
    }
    
    // Alt + P: Profile
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        navigateToProfile();
    }
    
    // Alt + F: Favourites
    if (e.altKey && e.key === 'f') {
        e.preventDefault();
        navigateToFavourites();
    }
    
    // Ctrl/Cmd + K: Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.searchbar input');
        if (searchInput) {
            searchInput.focus();
            showNotification('Search activated', 'info');
        }
    }
});

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
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================================
// STYLES & ANIMATIONS
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    .feature-box img {
        transition: all 0.3s ease;
    }
    
    .feature-box {
        position: relative;
    }
    
    input:focus {
        outline: none;
    }
    
    footer i {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===========================================
// CONSOLE WELCOME MESSAGE
// ===========================================

console.log('%c🎓 Tutor Time - Dashboard Loaded ✓', 'color: #4caf50; font-size: 18px; font-weight: bold;');
console.log('%cWelcome to Tutor Time!', 'color: #2196F3; font-size: 14px;');
console.log('User Data:', userData);
console.log('\n%cKeyboard Shortcuts:', 'color: #ff9800; font-weight: bold;');
console.log('  Alt + W → Wishlist');
console.log('  Alt + C → Cart');
console.log('  Alt + P → Profile');
console.log('  Alt + F → Favourites');
console.log('  Ctrl/Cmd + K → Focus Search');
console.log('\n%cFeatures:', 'color: #4caf50; font-weight: bold;');
console.log('  ✓ Interactive Dashboard');
console.log('  ✓ Quick Navigation');
console.log('  ✓ Search Functionality');
console.log('  ✓ Keyboard Shortcuts');
console.log('  ✓ Responsive Notifications');