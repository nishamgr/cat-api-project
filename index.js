document.addEventListener('DOMContentLoaded', () => {

    const apikey = 'live_MRTf4SZ9fabgeJtmqy3c3qfVNCDrbM6mYprA2uXqeQrOX0IsAtYW4q75HLlTAFOr';
    const breedSelect = document.getElementById('selectBreed');
    const catImg  = document.getElementById('catImage');
    const infoDiv = document.getElementById('breedInfo');
    
    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: { 'x-api-key': apikey }
    })
    .then(response => response.json())
    .then(breeds => {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.reference_image_id; 
            option.textContent = breed.name; 
            breedSelect.appendChild(option);
        });
    });
    
    //Selection Event
    breedSelect.addEventListener('change', () => {
        const breedId = breedSelect.value;
        if (breedId) {
            fetchcatimage(breedId); 
        } else {
            catImg.src = '';
            infoDiv.innerHTML = '';
        }
    });
    
    /// Function to fetch breed image and info
    function fetchcatimage(catid) {
        const apiUrl = `https://api.thecatapi.com/v1/images/${catid}`;
        fetch(apiUrl, {
            headers: { 'x-api-key': apikey }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(catData => {
            catImg.src = catData.url;
    
            if (catData.breeds && catData.breeds.length > 0) {
                const breed = catData.breeds[0];
                infoDiv.innerHTML = `
                    <h2>${breed.name}</h2>
                    <p><strong>Origin:</strong> ${breed.origin}</p>
                    <p><strong>Temperament:</strong> ${breed.temperament}</p>
                    <p><strong>Description:</strong> ${breed.description}</p>
                `;
            } else {
                infoDiv.innerHTML = '<p>No additional information available for this breed.</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching cat image:", error);
            alert("Failed to fetch cat image. Please check your connection and try again.");
        });
    }
    });
    
    