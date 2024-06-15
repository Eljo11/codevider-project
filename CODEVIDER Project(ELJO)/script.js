document.getElementById('search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = document.getElementById('search-bar').value;
    if (query.trim() === '') {
        alert('Please enter a search term.');
        return;
    }

         const api1 = `https://freetestapi.com/api/dogs`;
        const api2 = `https://freetestapi.com/api/birds`;
        const api3 = `https://freetestapi.com/api/cats`;
    
     Promise.all([
        fetch(api1).then(response => response.json()),
        fetch(api2).then(response => response.json()),
        fetch(api3).then(response => response.json())
    ]).then(data => {
        displayResults(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    data.forEach((apiData, index) => {
        const apiResults = document.createElement('div');
        apiResults.innerHTML = `<h3>API ${index + 1} Results</h3><pre>${JSON.stringify(apiData, null, 2)}</pre>`;
        resultsContainer.appendChild(apiResults);
    });
}
