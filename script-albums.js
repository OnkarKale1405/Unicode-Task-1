const fetch_albums = async () => {

    const userId = localStorage.getItem('userId');

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/Albums?userId=${userId}`)
        const albums = await res.json();

        const heading = document.querySelector(".container h1");
        heading.textContent =`Albums of User-${userId}` ;
        const tab_album = document.querySelector("#albums");

        // creating headers of table
        const create = document.createElement("tr");
        create.setAttribute("class","uppercase bg-gray-200 border-b-2 border-gray-200 rounded-xl");
        ['Id', 'Title', 'Album'].forEach(headerText => {
            const headers = document.createElement("th");
            headers.setAttribute('class','p-3 text-xl font-semibold tracking-wide text-left border');
            headers.textContent = headerText;
            create.appendChild(headers);
        })
        tab_album.appendChild(create);

        // populating table
        albums.forEach((album) => {

            const tab_row = document.createElement("tr");
            tab_row.setAttribute('class','bg-gray-50 border-b-2 border-gray-300 hover:bg-gray-200');

            // id cell
            const id = document.createElement("td");
            id.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border');
            id.textContent = album.id;
            tab_row.appendChild(id);

            // Title cell
            const title = document.createElement("td");
            title.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border');
            title.textContent = album.title;
            tab_row.appendChild(title);

            // Photos button cell
            const photos_button = document.createElement("td");
            photos_button.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border');
            photos_button.innerHTML = '<button>view photos</ button>';
            photos_button.firstElementChild.setAttribute('class','album_photos bg-[#353535] hover:bg-black text-white font-bold py-4 px-6 rounded');
            
            tab_row.appendChild(photos_button);
            tab_row.setAttribute("id", `${album.id}`)
            tab_album.appendChild(tab_row);
        })
    }
    catch (err) {
        console.log("Error While Fetching " + err);
    }
}

fetch_albums();

// fetching Photos of the albums
const photos = document.querySelector("#albums");
console.log(photos);
photos.addEventListener('click', (e) => {
    if (e.target.classList.contains("album_photos")) {
        const photo_album = e.target.closest("tr").id;
        localStorage.setItem("albumId",photo_album);
        location.href = "photos.html" ;
    }
})