
window.onload = function() {
    fetch('http://localhost:3000/inhibitors')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById('dropdown');
            data.forEach(inhibitor => {
                const option = document.createElement('option');
                option.value = inhibitor.name;
                option.text = inhibitor.name;
                dropdown.appendChild(option);
            });
        });
};

function searchInhibitor() {
    const selected = document.getElementById('dropdown').value;
    if (!selected) {
        alert('Please select an inhibitor!');
        return;
    }
    fetch(`http://localhost:3000/inhibitor/${selected}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<h3>Details for ${selected}:</h3><p>${JSON.stringify(data)}</p>`;
        });
}
