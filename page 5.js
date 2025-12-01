// Tutor Time - Checkout/Cart Page JavaScript
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckoutPage();
});

// ===========================================
// DATA STORAGE
// ===========================================

let selectedTutor = {
    name: 'Alina Khan',
    image: 'images/tutor1.png',
    rating: 5,
    charges: 7000.00,
    description: 'Ali Khan is an experienced maths tutor with over 7 years of teaching expertise...'
};

let serviceCharges = 500.00;
let vatRate = 0.035; // 3.5%
let wishlist = [];
let savedForLater = [];

// ===========================================
// INITIALIZATION
// ===========================================

function initializeCheckoutPage() {
    setupWishlist();
    setupTrash();
    setupFeeCalculation();
    setupForm();
    setupButtons();
    setupSearch();
    loadTutorData();
}

// ===========================================
// LOAD TUTOR DATA
// ===========================================

function loadTutorData() {
    // This would typically load from localStorage or API
    // For now, we'll use the default data
    updateTutorDisplay();
    calculateTotal();
}

function updateTutorDisplay() {
    const tutorBox = document.querySelector('.tutor-box');
    if (!tutorBox) return;
    
    const tutorName = tutorBox.querySelector('h3');
    const tutorImg = tutorBox.querySelector('.tutor-img');
    const stars = tutorBox.querySelector('.stars');
    const description = document.querySelector('.tutor-description');
    
    if (tutorName) tutorName.textContent = selectedTutor.name;
    if (tutorImg) tutorImg.src = selectedTutor.image;
    if (stars) stars.textContent = '★'.repeat(selectedTutor.rating);
    if (description) description.textContent = selectedTutor.description;
}

// ===========================================
// WISHLIST MANAGEMENT
// ===========================================

function setupWishlist() {
    const heartIcon = document.querySelector('.heart');
    
    if (heartIcon) {
        heartIcon.addEventListener('click', function() {
            toggleWishlist(this);
        });
        
        // Add hover effect
        heartIcon.style.cursor = 'pointer';
        heartIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
        });
        heartIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function toggleWishlist(heartIcon) {
    const tutorName = selectedTutor.name;
    const index = wishlist.findIndex(t => t.name === tutorName);
    
    if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        heartIcon.textContent = '♡';
        heartIcon.style.color = '#666';
        showNotification(`${tutorName} removed from wishlist`, 'info');
    } else {
        // Add to wishlist
        wishlist.push(selectedTutor);
        heartIcon.textContent = '♥';
        heartIcon.style.color = '#ff6b6b';
        showNotification(`${tutorName} added to wishlist!`, 'success');
    }
    
    updateWishlistIcon();
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
// TRASH/DELETE FUNCTIONALITY
// ===========================================

function setupTrash() {
    const trashIcon = document.querySelector('.trash');
    
    if (trashIcon) {
        trashIcon.addEventListener('click', function() {
            removeTutor();
        });
        
        // Add hover effect
        trashIcon.style.cursor = 'pointer';
        trashIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.filter = 'drop-shadow(0 0 3px #f44336)';
        });
        trashIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = '';
        });
    }
}

function removeTutor() {
    const confirmed = confirm(`Are you sure you want to remove ${selectedTutor.name} from your cart?`);
    
    if (confirmed) {
        showNotification(`${selectedTutor.name} removed from cart`, 'info');
        
        // Animate removal
        const tutorBox = document.querySelector('.tutor-box');
        if (tutorBox) {
            tutorBox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                tutorBox.style.opacity = '0.3';
                tutorBox.style.pointerEvents = 'none';
            }, 300);
        }
        
        // Reset form
        const form = document.querySelector('.checkout-form');
        if (form) form.reset();
        
        // Update total
        selectedTutor.charges = 0;
        calculateTotal();
        
        // Show option to continue shopping
        setTimeout(() => {
            showNotification('Cart is empty. Continue shopping to add tutors!', 'warning');
        }, 1000);
    }
}

// ===========================================
// FEE CALCULATION
// ===========================================

function setupFeeCalculation() {
    calculateTotal();
}

function calculateTotal() {
    const tutorCharges = selectedTutor.charges;
    const vat = (tutorCharges + serviceCharges) * vatRate;
    const total = tutorCharges + serviceCharges + vat;
    
    // Update display
    const feeBox = document.querySelector('.fee-box');
    if (feeBox) {
        const tutorChargesElem = feeBox.querySelector('p:nth-child(1) strong');
        const serviceChargesElem = feeBox.querySelector('p:nth-child(2) strong');
        const vatElem = feeBox.querySelector('p:nth-child(3) strong');
        const totalElem = feeBox.querySelector('.total strong');
        
        if (tutorChargesElem) {
            tutorChargesElem.nextSibling.textContent = ` ${tutorCharges.toFixed(2)} Rs.`;
        }
        if (serviceChargesElem) {
            serviceChargesElem.nextSibling.textContent = ` ${serviceCharges.toFixed(2)} Rs.`;
        }
        if (vatElem) {
            vatElem.nextSibling.textContent = ` ${vat.toFixed(2)} Rs.`;
        }
        if (totalElem) {
            totalElem.textContent = `Total: ${total.toFixed(2)} Rs.`;
        }
    }
    
    return total;
}

// ===========================================
// FORM HANDLING
// ===========================================

function setupForm() {
    const form = document.querySelector('.checkout-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSubmit();
        });
        
        // Add input validation
        const nameInput = form.querySelector('input[placeholder="Name"]');
        const mobileInput = form.querySelector('input[placeholder="Mobile Number"]');
        const addressInput = form.querySelector('textarea[placeholder="Address"]');
        
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateName(this);
            });
        }
        
        if (mobileInput) {
            mobileInput.addEventListener('blur', function() {
                validateMobile(this);
            });
            // Allow only numbers
            mobileInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9+\-\s]/g, '');
            });
        }
        
        if (addressInput) {
            addressInput.addEventListener('blur', function() {
                validateAddress(this);
            });
        }
    }
}

function validateName(input) {
    const value = input.value.trim();
    if (value.length < 3) {
        input.style.borderColor = '#f44336';
        showNotification('Name must be at least 3 characters', 'warning');
        return false;
    } else {
        input.style.borderColor = '#4caf50';
        return true;
    }
}

function validateMobile(input) {
    const value = input.value.trim();
    const mobileRegex = /^[\+]?[0-9]{10,15}$/;
    
    if (!mobileRegex.test(value.replace(/[\s\-]/g, ''))) {
        input.style.borderColor = '#f44336';
        showNotification('Please enter a valid mobile number', 'warning');
        return false;
    } else {
        input.style.borderColor = '#4caf50';
        return true;
    }
}

function validateAddress(input) {
    const value = input.value.trim();
    if (value.length < 10) {
        input.style.borderColor = '#f44336';
        showNotification('Please enter a complete address', 'warning');
        return false;
    } else {
        input.style.borderColor = '#4caf50';
        return true;
    }
}

function handleSubmit() {
    const form = document.querySelector('.checkout-form');
    const nameInput = form.querySelector('input[placeholder="Name"]');
    const mobileInput = form.querySelector('input[placeholder="Mobile Number"]');
    const addressInput = form.querySelector('textarea[placeholder="Address"]');
    
    // Validate all fields
    const nameValid = validateName(nameInput);
    const mobileValid = validateMobile(mobileInput);
    const addressValid = validateAddress(addressInput);
    
    if (!nameValid || !mobileValid || !addressValid) {
        showNotification('Please fill all fields correctly', 'error');
        return;
    }
    
    // Check if cart is not empty
    if (selectedTutor.charges === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Collect form data
    const formData = {
        name: nameInput.value.trim(),
        mobile: mobileInput.value.trim(),
        address: addressInput.value.trim(),
        tutor: selectedTutor.name,
        total: calculateTotal()
    };
    
    // Show success message
    showNotification(`Order confirmed! Total: Rs. ${formData.total.toFixed(2)}`, 'success');
    
    // Simulate order processing
    setTimeout(() => {
        showNotification('Redirecting to payment...', 'info');
        
        // Log order details
        console.log('Order Details:', formData);
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            showNotification('Thank you for your order!', 'success');
        }, 2000);
    }, 1500);
}

// ===========================================
// BUTTON ACTIONS
// ===========================================

function setupButtons() {
    const continueBtn = document.querySelector('.light-btn:nth-of-type(1)');
    const saveBtn = document.querySelector('.light-btn:nth-of-type(2)');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            continueShopping();
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveForLater();
        });
    }
}

function continueShopping() {
    showNotification('Redirecting to tutors page...', 'info');
    
    // Simulate navigation
    setTimeout(() => {
        showNotification('Continue browsing tutors!', 'success');
        // In real implementation: window.location.href = 'tutors.html';
    }, 1000);
}

function saveForLater() {
    if (selectedTutor.charges === 0) {
        showNotification('No tutor to save!', 'warning');
        return;
    }
    
    savedForLater.push({...selectedTutor});
    showNotification(`${selectedTutor.name} saved for later!`, 'success');
    
    // Show saved count
    setTimeout(() => {
        showNotification(`You have ${savedForLater.length} item(s) saved for later`, 'info');
    }, 1500);
    
    console.log('Saved for later:', savedForLater);
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
    }
}

function performSearch() {
    const searchInput = document.querySelector('.searchbar input');
    const query = searchInput.value.trim();
    
    if (query) {
        showNotification(`Searching for: ${query}`, 'info');
        // In real implementation, this would search and redirect
    } else {
        showNotification('Please enter a search term', 'warning');
    }
}

// ===========================================
// NAVIGATION ICONS
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
        message += `📚 ${tutor.name}<br>Rs. ${tutor.charges}<br><br>`;
    });
    message += '</div>';
    
    showNotification(message, 'info');
}

function showCartModal() {
    if (selectedTutor.charges === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    const total = calculateTotal();
    const message = `
        <div style="text-align: left;">
            <strong>Current Cart:</strong><br><br>
            📚 ${selectedTutor.name}<br>
            Rs. ${selectedTutor.charges}<br><br>
            <strong>Total: Rs. ${total.toFixed(2)}</strong>
        </div>
    `;
    
    showNotification(message, 'success');
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
// KEYBOARD SHORTCUTS
// ===========================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S: Save for later
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveForLater();
    }
    
    // Ctrl/Cmd + Enter: Submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.querySelector('.checkout-form');
        if (form) {
            handleSubmit();
        }
    }
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
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0.3; }
    }
    
    .heart, .trash {
        transition: all 0.2s ease;
        display: inline-block;
    }
    
    input:focus, textarea:focus {
        outline: none;
        border-color: #2196F3;
        box-shadow: 0 0 5px rgba(33, 150, 243, 0.3);
    }
    
    input.valid {
        border-color: #4caf50 !important;
    }
    
    input.invalid {
        border-color: #f44336 !important;
    }
    
    button {
        transition: all 0.3s ease;
    }
    
    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    button:active {
        transform: translateY(0);
    }
    
    .tutor-box {
        transition: all 0.3s ease;
    }
    
    .fee-box {
        animation: slideIn 0.5s ease;
    }
    
    .checkout-form {
        animation: slideIn 0.6s ease;
    }
`;
function selectAndGo(url) {
    window.location.href = url;
}
const wishlistNavIcon = document.querySelector('.icons img[src="wishlist.png"]');
if (wishlistNavIcon) {
    wishlistNavIcon.addEventListener('click', function() {
        selectAndGo("wishlist.html");
    });
}
const cartNavIcon = document.querySelector('.icons img[src="cart.png"]');
if (cartNavIcon) {
    cartNavIcon.addEventListener('click', function() {
        selectAndGo("cart.html");
    });
}
const heartIcon = document.querySelector('.heart');
if (heartIcon) {
    heartIcon.addEventListener('click', function() {
        toggleWishlist(this);
        selectAndGo("wishlist.html");
    });
}
const trashIcon = document.querySelector('.trash');
if (trashIcon) {
    trashIcon.addEventListener('click', function() {
        removeTutor();
        selectAndGo("tutors.html");
    });
}
const tutorImage = document.querySelector('.tutor-img');
if (tutorImage) {
    tutorImage.addEventListener('click', function() {
        selectAndGo("tutor-profile.html");
    });
}
const continueBtn = document.querySelector('.light-btn:nth-of-type(1)');
if (continueBtn) {
    continueBtn.addEventListener('click', function() {
        selectAndGo("tutors.html");
    });
}
const submitBtn = document.querySelector('.dark-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleSubmit();
        selectAndGo("payment.html");
    });
}

document.head.appendChild(style);

// ===========================================
// CONSOLE WELCOME MESSAGE
// ===========================================

console.log('%cTutor Time - Checkout Page Loaded ✓', 'color: #4caf50; font-size: 16px; font-weight: bold;');
console.log('Selected Tutor:', selectedTutor);
console.log('Total Amount:', calculateTotal().toFixed(2), 'Rs.');
console.log('Keyboard Shortcuts:');
console.log('  - Ctrl/Cmd + S: Save for later');
console.log('  - Ctrl/Cmd + Enter: Submit order');