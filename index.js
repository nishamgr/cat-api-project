const apikey = 'live_MRTf4SZ9fabgeJtmqy3c3qfVNCDrbM6mYprA2uXqeQrOX0IsAtYW4q75HLlTAFOr'; //API KEY
const breedSelect = document.getElementById('selectBreed');
const catImg  = document.getElementById('catImage');
const infoDiv = document.getElementById('BreedInfo');

//fetching data from the first end-point and load breeds on pagae 
fetch('https://api.thecatapi.com/v1/breeds')
.then(response => response.json())
.then(breeds => {
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        selectBreed.appendChild (option);
});

//user side of slection for breeds
selectBreed.addEventListener('change', () =>{
    const breedId = selectBreed.value;
    if (!breedId) return;
});

//Fetch img and info 
fetch('https://api.thecatapi.com/v1/images')
.then(response => response.json())
.then(data => {
    const catData = data[0];
    catImg.src = catData.url;

    const breed = catData.breeds[0];
    infoDiv.innerHTML = `
    <h2>${breed.name}</h2>
        <p><strong>Origin:</strong> ${breed.origin}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p><strong>Description:</strong> ${breed.description}</p>
      `;
    });
});

