
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Login successful!');
            window.location.href = 'main.html';
        } else {
            alert('Invalid credentials. Try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Server issue.');
    });
});
