// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// Toggle between login/signup forms
if (showSignup && showLogin) {
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
}

// Form submission handlers
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Mock authentication
        localStorage.setItem('dairyFarmUser', JSON.stringify({
            email,
            lastLogin: new Date().toISOString()
        }));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Mock registration
        localStorage.setItem('dairyFarmUser', JSON.stringify({
            name,
            email,
            registeredAt: new Date().toISOString()
        }));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('dairyFarmUser');
    if (user && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }
});