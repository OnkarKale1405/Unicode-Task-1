
const fetchUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const tab_user = document.querySelector("#user").firstElementChild;
        //console.log(tab_user);

        // creating headers of table
        const create = document.createElement("tr");
        create.setAttribute("class","uppercase bg-gray-200 border-b-2 border-gray-200 rounded-xl");
        ['Id', 'Name', 'Email', 'Todos', 'Albums'].forEach(headerText => {
            const headers = document.createElement("th");
            headers.setAttribute('class','p-3 text-xl font-semibold tracking-wide text-left border');
            headers.textContent = headerText;
            create.appendChild(headers);
        })
        tab_user.appendChild(create);

        users.forEach(user => {

            const tab_row = document.createElement("tr");
            tab_row.setAttribute('class','bg-gray-50 hover:bg-gray-200');

            // id cell
            const id = document.createElement("td");
            id.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border');
            id.textContent = user.id;
            tab_row.appendChild(id);

            // name cell
            const name = document.createElement("td");
            name.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border');
            name.textContent = user.name;
            tab_row.appendChild(name);

            // email cell
            const email = document.createElement("td");
            email.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border');
            email.textContent = user.email.toLowerCase();
            tab_row.appendChild(email);

            // TODO button cell
            const Todo_button = document.createElement("td");
            Todo_button.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border')
            Todo_button.innerHTML = '<button>todoLists</ button>';
            Todo_button.firstElementChild.setAttribute('class','todo_lists bg-[#353535] hover:bg-black text-white font-bold py-4 px-6 rounded');
            tab_row.appendChild(Todo_button);

            // albums cell
            const albums = document.createElement("td");
            albums.setAttribute('class',' p-3 text-lg font-semibold tracking-wide text-left border')
            albums.innerHTML = '<button>albums</ button>';
            albums.firstElementChild.setAttribute("class", "user_albums bg-[#353535] hover:bg-black text-white font-bold py-4 px-6 rounded");
            
            tab_row.appendChild(albums);
            tab_row.setAttribute("id", `${user.id}`)
            tab_user.appendChild(tab_row);
        })
    }
    catch (err) {
        console.log(err);
    }
}
fetchUsers();

// fetching todo of the user
const tab_todo = document.querySelector("#user");
console.log(tab_todo);
tab_todo.addEventListener('click', (e) => {
    if (e.target.classList.contains("todo_lists")) {
        const user_todo = e.target.closest("tr").id;
        localStorage.setItem("userId",user_todo)
        location.href = "todo.html";
    }
})

// fetching Albums of the user
const tab_albums = document.querySelector("#user");
console.log(tab_albums);
tab_albums.addEventListener('click', (e) => {
    if (e.target.classList.contains("user_albums")) {
        const user_todo = e.target.closest("tr").id;
        localStorage.setItem("userId",user_todo)
        location.href = "albums.html";
    }
})