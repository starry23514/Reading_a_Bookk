// Form switching functionality
function showSignup() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('forgotForm').classList.remove('active');
    
    const imageContent = document.querySelector('.image-content');
    imageContent.innerHTML = `
        <h2>Welcome!</h2>
        <p>Create an account to get started!</p>
    `;
}

function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('forgotForm').classList.remove('active');
    
    const imageContent = document.querySelector('.image-content');
    imageContent.innerHTML = `
        <h2>Hello!</h2>
        <p>Enter your details</p>
    `;
}

function showForgotPassword() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('forgotForm').classList.add('active');
    
    const imageContent = document.querySelector('.image-content');
    imageContent.innerHTML = `
        <h2>Don't Worry!</h2>
        <p>Reset Password</p>
    `;
}

// Form submission handlers
document.getElementById('loginFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(this, 'Signing in...');
});

document.getElementById('signupFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateSignupForm()) {
        handleFormSubmit(this, 'Creating account...');
    }
});

document.getElementById('forgotFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(this, 'Sending instructions...');
});

function validateSignupForm() {
    const password = document.querySelector('#signupForm input[type="password"]').value;
    const confirmPassword = document.querySelector('#signupForm input[type="password"]:last-of-type').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return false;
    }
    
    return true;
}

function handleFormSubmit(form, loadingText) {
    const button = form.querySelector('.btn-primary');
    const loading = button.querySelector('.loading');
    const btnText = button.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Show loading state
    loading.classList.add('show');
    btnText.textContent = loadingText;
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        loading.classList.remove('show');
        button.disabled = false;
        btnText.textContent = originalText;
        
        if (form.id === 'loginFormSubmit') {
            showSuccessMessage('Login successful!');
        } else if (form.id === 'signupFormSubmit') {
            showSuccessMessage('Account created successfully! Please check your email.');
        } else {
            showSuccessMessage('Password reset instructions sent to your email!');
        }
    }, 2000);
}

function showSuccessMessage(message) {
    // Create a temporary success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Social login handler
function socialLogin(provider) {
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    showSuccessMessage(`${providerName} login initiated! (Demo)`);
}

// Enhanced form interactions
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.querySelector('i').style.color = '#3b82f6';
        this.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentNode.querySelector('i').style.color = '#94a3b8';
        }
        this.classList.remove('focused');
    });

    // Real-time validation
    input.addEventListener('input', function() {
        if (this.type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            this.classList.toggle('success', isValid && this.value.length > 0);
            this.classList.toggle('error', !isValid && this.value.length > 0);
        }
    });
});

// Add interactive hover effects
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth page load animation
window.addEventListener('load', function() {
    document.querySelector('.container').style.animation = 'fadeIn 1s ease';
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        showSignup();
    } else if (e.altKey && e.key === 'l') {
        e.preventDefault();
        showLogin();
    }
});