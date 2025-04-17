const btn = document.getElementById('fetchCat')
const img = document.getElementById('randomCat')

btn.addEventListener('click', () => {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(res => res.json())
        .then(data => {
            img.src = data[0].url;
    })
});