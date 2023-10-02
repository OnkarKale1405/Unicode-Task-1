const fetchPhotos = async () => {

    const albumId = localStorage.getItem('albumId');
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const photos = await response.json();

        const heading = document.querySelector(".container h1");
        console.log(heading);
        heading.textContent = `Photos of Album-${albumId}` ;
        const photoGrid = document.querySelector('.grid');

        // Create a photo card for each photo
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.classList.add('p-4', 'border-gray-300', 'rounded-lg', 'text-center');

            // images of the album
            const img = document.createElement('img');
            img.classList.add('mx-auto', 'mb-4');
            img.src = photo.url;

            photoCard.appendChild(img);
            photoGrid.appendChild(photoCard);
        })
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

fetchPhotos();