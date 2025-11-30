// Tutor Time - About/Contact Page JavaScript
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

// ===========================================
// DATA STORAGE
// ===========================================

const contactInfo = {
    email: 'info@tutortime.com',
    phone: '+92-XXX-XXXXXXX',
    address: 'XYZ Road, ABC City, Pakistan'
};

const socialLinks = {
    facebook: 'https://facebook.com/tutortime',
    twitter: 'https://twitter.com/tutortime',
    instagram: 'https://instagram.com/tutortime',
    youtube: 'https://youtube.com/tutortime'
};

// ===========================================
// INITIALIZATION
// ===========================================

function initializeAboutPage() {
    setupLeftSideLinks();
    setupContactInfo();
    setupSocialIcons();
    setupFooterLinks();
    setupNavigation();
    setupSearch();
    setupImageBox();
    animateContent();
}

// ===========================================
// LEFT SIDE NAVIGATION LINKS
// ===========================================

function setupLeftSideLinks() {
    const leftSideLinks = document.querySelectorAll('.left-side a');
    
    leftSideLinks.forEach(link => {
        link.style.transition = 'all 0.3s ease';
        link.style.cursor = 'pointer';
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim().replace('➜ ', '');
            handleLeftSideLinkClick(page, this);
        });
        
        // Hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = '#4caf50';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
}

function handleLeftSideLinkClick(page, element) {
    showNotification(`Loading ${page}...`, 'info');
    
    // Add click animation
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
    }, 200);
    
    setTimeout(() => {
        switch(page) {
            case 'About':
                showAboutContent();
                break;
            case 'FAQs':
                showFAQsContent();
                break;
            case 'Terms and Conditions':
                showTermsContent();
                break;
            case 'Privacy Policy':
                showPrivacyContent();
                break;
            default:
                showNotification(`Opening ${page}...`, 'success');
        }
    }, 500);
}

// ===========================================
// CONTENT DISPLAY FUNCTIONS
// ===========================================

function showAboutContent() {
    const content = `
        <div style="text-align: left;">
            <strong style="font-size: 18px;">About Tutor Time</strong><br><br>
            
            <strong>Our Mission:</strong><br>
            Connecting minds and building futures through quality education.<br><br>
            
            <strong>What We Offer:</strong><br>
            • Expert tutors across all subjects<br>
            • Flexible scheduling<br>
            • Personalized learning plans<br>
            • Affordable pricing<br><br>
            
            <strong>Our Vision:</strong><br>
            Making quality education accessible to everyone.
        </div>
    `;
    
    showNotification(content, 'info');
}

function showFAQsContent() {
    const content = `
        <div style="text-align: left;">
            <strong style="font-size: 18px;">Frequently Asked Questions</strong><br><br>
            
            <strong>Q: How do I book a tutor?</strong><br>
            A: Browse tutors, select one, and click "SELECT".<br><br>
            
            <strong>Q: What are the payment methods?</strong><br>
            A: We accept bank transfer, credit/debit cards.<br><br>
            
            <strong>Q: Can I change my tutor?</strong><br>
            A: Yes, you can switch tutors anytime.<br><br>
            
            <strong>Q: Are there any hidden charges?</strong><br>
            A: No, all fees are transparent and shown upfront.
        </div>
    `;
    
    showNotification(content, 'info');
}

function showTermsContent() {
    const content = `
        <div style="text-align: left;">
            <strong style="font-size: 18px;">Terms and Conditions</strong><br><br>
            
            • Services are subject to availability<br>
            • Payment must be made in advance<br>
            • Cancellation policy: 24 hours notice<br>
            • Refunds processed within 7-10 business days<br>
            • Users must provide accurate information<br><br>
            
            <small>Last updated: November 2025</small>
        </div>
    `;
    
    showNotification(content, 'info');
}

function showPrivacyContent() {
    const content = `
        <div style="text-align: left;">
            <strong style="font-size: 18px;">Privacy Policy</strong><br><br>
            
            <strong>Data Collection:</strong><br>
            We collect personal information for service delivery only.<br><br>
            
            <strong>Data Usage:</strong><br>
            Your data is used to improve services and communicate with you.<br><br>
            
            <strong>Data Protection:</strong><br>
            We implement security measures to protect your information.<br><br>
            
            <strong>Your Rights:</strong><br>
            You can access, modify, or delete your data anytime.
        </div>
    `;
    
    showNotification(content, 'info');
}

// ===========================================
// CONTACT INFORMATION
// ===========================================

function setupContactInfo() {
    const emailElements = document.querySelectorAll('.left-side p');
    
    emailElements.forEach(element => {
        const strongTag = element.querySelector('strong');
        if (!strongTag) return;
        
        const label = strongTag.textContent.trim();
        
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s ease';
        
        element.addEventListener('click', function() {
            handleContactClick(label, this);
        });
        
        element.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.style.padding = '8px';
            this.style.borderRadius = '5px';
            this.style.transform = 'translateX(5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.padding = '';
            this.style.borderRadius = '';
            this.style.transform = 'translateX(0)';
        });
    });
}

function handleContactClick(type, element) {
    const text = element.textContent;
    
    switch(type) {
        case 'Email:':
            const email = contactInfo.email;
            copyToClipboard(email);
            showNotification(`Email copied: ${email}`, 'success');
            // Open email client
            setTimeout(() => {
                window.location.href = `mailto:${email}`;
            }, 1000);
            break;
            
        case 'Phone:':
            const phone = contactInfo.phone;
            copyToClipboard(phone);
            showNotification(`Phone copied: ${phone}`, 'success');
            break;
            
        case 'Address:':
            const address = contactInfo.address;
            copyToClipboard(address);
            showNotification(`Address copied: ${address}`, 'success');
            break;
    }
}

function copyToClipboard(text) {
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback method
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
    }
}

// ===========================================
// SOCIAL ICONS (LEFT SIDE)
// ===========================================

function setupSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icons i');
    
    socialIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.3s ease';
        icon.style.fontSize = '24px';
        icon.style.margin = '0 10px';
        
        icon.addEventListener('click', function() {
            handleSocialIconClick(this);
        });
        
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(10deg)';
            
            // Color based on platform
            if (this.classList.contains('fa-facebook-square')) {
                this.style.color = '#1877f2';
            } else if (this.classList.contains('fa-x-twitter')) {
                this.style.color = '#000000';
            } else if (this.classList.contains('fa-instagram')) {
                this.style.color = '#e4405f';
            } else if (this.classList.contains('fa-youtube')) {
                this.style.color = '#ff0000';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = '';
        });
    });
}

function handleSocialIconClick(icon) {
    let platform = 'Social Media';
    let url = '#';
    
    if (icon.classList.contains('fa-facebook-square')) {
        platform = 'Facebook';
        url = socialLinks.facebook;
    } else if (icon.classList.contains('fa-x-twitter')) {
        platform = 'X (Twitter)';
        url = socialLinks.twitter;
    } else if (icon.classList.contains('fa-instagram')) {
        platform = 'Instagram';
        url = socialLinks.instagram;
    } else if (icon.classList.contains('fa-youtube')) {
        platform = 'YouTube';
        url = socialLinks.youtube;
    }
    
    showNotification(`Opening ${platform}...`, 'info');
    
    // Simulate opening in new tab
    setTimeout(() => {
        showNotification(`Visit us on ${platform}!`, 'success');
        // In real implementation: window.open(url, '_blank');
    }, 500);
}

// ===========================================
// IMAGE BOX
// ===========================================

function setupImageBox() {
    const imageBox = document.querySelector('.image-box');
    const image = imageBox ? imageBox.querySelector('img') : null;
    
    if (imageBox) {
        imageBox.style.cursor = 'pointer';
        imageBox.style.transition = 'all 0.3s ease';
        
        imageBox.addEventListener('click', function() {
            showServiceInfo();
        });
        
        imageBox.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
            
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        imageBox.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    }
    
    if (image) {
        image.style.transition = 'all 0.3s ease';
    }
}

function showServiceInfo() {
    const content = `
        <div style="text-align: left;">
            <strong style="font-size: 18px;">Our Tutors' Services</strong><br><br>
            
            <strong>What Our Tutors Provide:</strong><br>
            ✓ One-on-one personalized tutoring<br>
            ✓ Group study sessions<br>
            ✓ Homework help and assignment guidance<br>
            ✓ Exam preparation strategies<br>
            ✓ Subject-specific expertise<br>
            ✓ Flexible scheduling options<br><br>
            
            <strong>Subjects Covered:</strong><br>
            Mathematics • Physics • Chemistry • Biology<br>
            Computer Science • Business • Languages<br><br>
            
            <strong>Why Choose Us:</strong><br>
            🎓 Experienced & qualified tutors<br>
            💰 Affordable pricing<br>
            ⏰ Flexible timings<br>
            📈 Proven results
        </div>
    `;
    
    showNotification(content, 'info');
}

// ===========================================
// FOOTER LINKS & SOCIAL ICONS
// ===========================================

function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    const footerSocialIcons = document.querySelectorAll('.footer-socials a');
    
    // Footer Navigation Links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim();
            showNotification(`Opening ${page}...`, 'info');
            
            // Handle based on page
            const href = this.getAttribute('href');
            if (href === '#faqs') showFAQsContent();
            else if (href === '#privacy') showPrivacyContent();
            else if (href === '#about') showAboutContent();
            else if (href === '#terms') showTermsContent();
        });
    });
    
    // Footer Social Icons
    footerSocialIcons.forEach(icon => {
        const img = icon.querySelector('img');
        
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const alt = img ? img.getAttribute('alt') : 'Social Media';
            showNotification(`Opening ${alt}...`, 'info');
        });
        
        if (img) {
            img.style.transition = 'all 0.3s ease';
            
            icon.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.2) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
}

// ===========================================
// NAVIGATION & SEARCH
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
            showNotification(`${action} page - Coming soon!`, 'info');
        });
    });
    
    // Wishlist & Cart Icons
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', function() {
            showNotification('Opening Wishlist...', 'info');
        });
        addIconAnimation(wishlistIcon);
    }
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showNotification('Opening Cart...', 'info');
        });
        addIconAnimation(cartIcon);
    }
}

function addIconAnimation(icon) {
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
        setTimeout(() => {
            showNotification('Redirecting to search results...', 'success');
        }, 1000);
    } else {
        showNotification('Please enter a search term', 'warning');
    }
}

// ===========================================
// ANIMATIONS
// ===========================================

function animateContent() {
    const leftSide = document.querySelector('.left-side');
    const imageBox = document.querySelector('.image-box');
    
    if (leftSide) {
        leftSide.style.opacity = '0';
        leftSide.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            leftSide.style.transition = 'all 0.6s ease';
            leftSide.style.opacity = '1';
            leftSide.style.transform = 'translateX(0)';
        }, 100);
    }
    
    if (imageBox) {
        imageBox.style.opacity = '0';
        imageBox.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            imageBox.style.transition = 'all 0.6s ease';
            imageBox.style.opacity = '1';
            imageBox.style.transform = 'translateX(0)';
        }, 300);
    }
}

// ===========================================
// KEYBOARD SHORTCUTS
// ===========================================

document.addEventListener('keydown', function(e) {
    // Alt + A: About
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        showAboutContent();
    }
    
    // Alt + F: FAQs
    if (e.altKey && e.key === 'f') {
        e.preventDefault();
        showFAQsContent();
    }
    
    // Alt + T: Terms
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        showTermsContent();
    }
    
    // Alt + P: Privacy
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        showPrivacyContent();
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
    const existing = document.querySelector('.custom-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = message;
    
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
        max-width: 400px;
        line-height: 1.6;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
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
    
    .left-side a {
        display: inline-block;
    }
    
    input:focus {
        outline: none;
    }
`;
document.head.appendChild(style);

// ===========================================
// CONSOLE WELCOME MESSAGE
// ===========================================

console.log('%c📚 Tutor Time - About/Contact Page Loaded ✓', 'color: #4caf50; font-size: 18px; font-weight: bold;');
console.log('%cContact Information:', 'color: #2196F3; font-weight: bold;');
console.log('  Email:', contactInfo.email);
console.log('  Phone:', contactInfo.phone);
console.log('  Address:', contactInfo.address);
console.log('\n%cKeyboard Shortcuts:', 'color: #ff9800; font-weight: bold;');
console.log('  Alt + A → About');
console.log('  Alt + F → FAQs');
console.log('  Alt + T → Terms and Conditions');
console.log('  Alt + P → Privacy Policy');
console.log('  Ctrl/Cmd + K → Focus Search');
console.log('\n%cFeatures:', 'color: #4caf50; font-weight: bold;');
console.log('  ✓ Interactive Navigation');
console.log('  ✓ Copy Contact Info (click to copy)');
console.log('  ✓ Social Media Integration');
console.log('  ✓ Animated Content');
console.log('  ✓ Keyboard Shortcuts');