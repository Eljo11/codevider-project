document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('closePopup'); 
    let birdsData = [];

    fetch('https://freetestapi.com/api/v1/birds')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            birdsData = data;
            displayBirds(birdsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            gallery.innerHTML = '<p>Failed to load birds.</p>';
        });

    function displayBirds(birds) {
        gallery.innerHTML = '';
        if (birds.length > 0) {
            birds.forEach(bird => {
                const birdItem = document.createElement('div');
                birdItem.className = 'gallery-item';

                const birdImage = document.createElement('img');
                birdImage.src = bird.image;
                birdImage.alt = bird.name;

                birdImage.addEventListener('click', () => showPopup(bird));

                const detailsContainer = document.createElement('div');
                detailsContainer.classList.add('details');

                const birdName = document.createElement('h3');
                birdName.textContent = bird.name;

                const birdPlaceOfFound = document.createElement('p');
                birdPlaceOfFound.textContent = `Found in: ${bird.place_of_found}`;

                detailsContainer.appendChild(birdName);
                detailsContainer.appendChild(birdPlaceOfFound);

                birdItem.appendChild(birdImage);
                birdItem.appendChild(detailsContainer);

                gallery.appendChild(birdItem);
            });
        } else {
            gallery.innerHTML = '<p>No birds found.</p>';
        }
    }

    function showPopup(bird) {
        const birdImagePopup = document.getElementById('bird-image');
        const birdInfoPopup = document.getElementById('bird-info');

        birdImagePopup.src = bird.image;
        birdInfoPopup.innerHTML = `
            <h2>${bird.name}</h2>
            <p><strong>Species:</strong> ${bird.species}</p>
            <p><strong>Habitat:</strong> ${bird.habitat}</p>
            <p><strong>Color:</strong> ${bird.color}</p>
            <p><strong>Description:</strong> ${bird.description}</p>
        `;

        popup.style.display = 'block';
    }

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
