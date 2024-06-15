document.addEventListener('DOMContentLoaded', async function() {
  try {
      const apiUrl = 'https://freetestapi.com/api/v1/cats';
      const response = await fetch(apiUrl);
      const catsData = await response.json();
      
      const gallery = document.querySelector('.gallery');
      
      catsData.forEach(cat => {
          const imageContainer = document.createElement('div');
          imageContainer.classList.add('image-container');
          
          const img = document.createElement('img');
          img.src = cat.image; 
          img.alt = cat.name;
          img.setAttribute('data-cat-id', cat.id);
          img.addEventListener('click', () => openPopup(cat.id));
          
          const catInfo = document.createElement('div');
          catInfo.innerHTML = `<p><strong>Name:</strong> ${cat.name}</p>
                               <p><strong>Origin:</strong> ${cat.origin}</p>`;
          
          imageContainer.appendChild(img);
          imageContainer.appendChild(catInfo);
          gallery.appendChild(imageContainer);
      });
  } catch (error) {
      console.error('Error fetching cat data:', error);
      alert('Failed to fetch cat data. Please try again later.');
  }
});

async function openPopup(catId) {
  const apiUrl = `https://freetestapi.com/api/v1/cats/${catId}`;
  
  try {
      const response = await fetch(apiUrl);
      const catDetails = await response.json();
      
      document.getElementById('cat-image').src = catDetails.image; 
      
      document.getElementById('cat-info').innerHTML = `
          <h2>${catDetails.name}</h2>
          <p><strong>Origin:</strong> ${catDetails.origin}</p>
          <p><strong>Temperament:</strong> ${catDetails.temperament}</p>
          <p><strong>Color:</strong> ${catDetails.color}</p>
          <p><strong>Description:</strong> ${catDetails.description}</p>
      `;
      
      document.getElementById('popup').style.display = 'block';
  } catch (error) {
      console.error('Error fetching cat details:', error);
      alert('Failed to fetch cat details. Please try again later.');
  }
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

async function searchCats() {
  const query = document.getElementById('searchBar').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  try {
      const response = await fetch('https://freetestapi.com/api/v1/cats');
      const data = await response.json();
      
       const filteredCats = data.filter(cat => cat.name.toLowerCase().includes(query.toLowerCase()));

      if (filteredCats.length > 0) {
          filteredCats.forEach(cat => {
              const catCard = document.createElement('div');
              catCard.className = 'cat-card';
              catCard.innerHTML = `
                  <h2>${cat.name}</h2>
                  <p>${cat.description}</p>
              `;
              resultsContainer.appendChild(catCard);
          });
      } else {
          resultsContainer.innerHTML = '<p>No cats found.</p>';
      }
  } catch (error) {
      resultsContainer.innerHTML = '<p>Error fetching cat data.</p>';
      console.error('Error:', error);
  }
}