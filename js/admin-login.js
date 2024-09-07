document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace these credentials with your actual admin credentials
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
        localStorage.setItem('adminAuthenticated', 'true');
        window.location.href = 'admin-dashboard.html';  // Redirect to admin dashboard
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
});
