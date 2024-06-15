document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const resultsContainer = document.getElementById('results');

    let dogsData = [];

    fetch('https://freetestapi.com/api/v1/dogs')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dogsData = data;
            displayDogs(dogsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            gallery.innerHTML = '<p>Failed to load dogs.</p>';
        });

    function displayDogs(dogs) {
        gallery.innerHTML = '';
        if (dogs.length > 0) {
            dogs.forEach(dog => {
                const dogItem = document.createElement('div');
                dogItem.className = 'image-container';

                const dogImage = document.createElement('img');
                dogImage.src = dog.image;
                dogImage.alt = dog.name;

                const dogName = document.createElement('h2');
                dogName.textContent = dog.name;

                dogItem.appendChild(dogImage);
                dogItem.appendChild(dogName);

                dogImage.addEventListener('click', () => showPopup(dog));

                gallery.appendChild(dogItem);
            });
        } else {
            gallery.innerHTML = '<p>No dogs found.</p>';
        }
    }

    function showPopup(dog) {
        const dogImagePopup = document.getElementById('dog-image');
        const dogInfoPopup = document.getElementById('dog-info');

        dogImagePopup.src = dog.image;
        dogInfoPopup.innerHTML = `
            <h2>${dog.name}</h2>
            <p><strong>Breed:</strong> ${dog.breed}</p>
            <p><strong>Age:</strong> ${dog.age}</p>
            <p><strong>Color:</strong> ${dog.color}</p>
            <p><strong>Description:</strong> ${dog.description}</p>
        `;

        document.getElementById('popup').style.display = 'block';
    }

    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    async function searchDogs() {
        const query = document.getElementById('searchBar').value.trim().toLowerCase();
        resultsContainer.innerHTML = '';

        try {
            const response = await fetch('https://freetestapi.com/api/v1/dogs');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const filteredDogs = data.filter(dog => dog.name.toLowerCase().includes(query));

            gallery.innerHTML = '';

            if (filteredDogs.length > 0) {
                filteredDogs.forEach(dog => {
                    const dogItem = document.createElement('div');
                    dogItem.className = 'image-container';

                    const dogImage = document.createElement('img');
                    dogImage.src = dog.image;
                    dogImage.alt = dog.name;

                    const dogName = document.createElement('h2');
                    dogName.textContent = dog.name;

                    dogItem.appendChild(dogImage);
                    dogItem.appendChild(dogName);

                    dogImage.addEventListener('click', () => showPopup(dog));

                    gallery.appendChild(dogItem);
                });
            } else {
                gallery.innerHTML = '<p>No dogs found.</p>';
            }
        } catch (error) {
            resultsContainer.innerHTML = '<p>Error fetching dog data.</p>';
            console.error('Error:', error);
        }
    }
});
