
document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'main.html';
        } else {
            alert('Registration failed. Try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Server issue.');
    });
});
