// DOM Elements
const profileForm = document.getElementById('profileForm');
const notificationsForm = document.getElementById('notificationsForm');
const appSettingsForm = document.getElementById('appSettingsForm');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = localStorage.getItem('dairyFarmUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Load user settings
    loadUserSettings();
});

// Load user settings from localStorage
function loadUserSettings() {
    const user = JSON.parse(localStorage.getItem('dairyFarmUser')) || {};
    const settings = JSON.parse(localStorage.getItem('dairyFarmSettings')) || {
        notifications: {
            email: true,
            sms: false,
            reminders: true
        },
        app: {
            theme: 'light',
            language: 'en',
            timezone: 'local'
        }
    };

    // In a real app, you would:
    // 1. Populate the profile form with user data
    // 2. Set the toggle switches based on notification settings
    // 3. Set the dropdowns based on app settings
}

// Handle profile form submission
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const email = e.target[2].value;
        const phone = e.target[3].value;
        
        // Basic validation
        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Update user data
        const user = JSON.parse(localStorage.getItem('dairyFarmUser')) || {};
        user.name = `${firstName} ${lastName}`;
        user.email = email;
        user.phone = phone;
        
        localStorage.setItem('dairyFarmUser', JSON.stringify(user));
        
        // Show success message
        alert('Profile updated successfully!');
    });
}

// Handle notifications form submission
if (notificationsForm) {
    notificationsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get toggle values
        const emailNotifications = e.target[0].checked;
        const smsNotifications = e.target[1].checked;
        const taskReminders = e.target[2].checked;
        
        // Update settings
        const settings = JSON.parse(localStorage.getItem('dairyFarmSettings')) || {};
        settings.notifications = {
            email: emailNotifications,
            sms: smsNotifications,
            reminders: taskReminders
        };
        
        localStorage.setItem('dairyFarmSettings', JSON.stringify(settings));
        
        // Show success message
        alert('Notification settings updated!');
    });
}

// Handle app settings form submission
if (appSettingsForm) {
    appSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const theme = e.target[0].value;
        const language = e.target[1].value;
        const timezone = e.target[2].value;
        
        // Update settings
        const settings = JSON.parse(localStorage.getItem('dairyFarmSettings')) || {};
        settings.app = {
            theme,
            language,
            timezone
        };
        
        localStorage.setItem('dairyFarmSettings', JSON.stringify(settings));
        
        // Show success message
        alert('App settings updated!');
        
        // In a real app, you would apply the theme immediately
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}