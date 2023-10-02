const fetch_Todo = async () => {

    const userId = localStorage.getItem('userId');

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        const todos = await res.json();

        const heading = document.querySelector(".container h1");
        heading.textContent = `TodoList of User-${userId}`;
        let tab_todo = document.querySelector("#todo");

        // creating headers of table
        const create = document.createElement("tr");
        create.setAttribute("class", "uppercase bg-gray-200 border-b-2 border-gray-200 rounded-xl");
        ['Id', 'Title', 'Status', 'Edit', 'Delete'].forEach(headerText => {
            const headers = document.createElement("th");
            headers.setAttribute('class', 'p-3 text-xl font-semibold tracking-wide text-left border');
            headers.textContent = headerText;
            create.appendChild(headers);
        })
        tab_todo.appendChild(create);

        // populating table
        todos.forEach((todo) => {

            const tab_row = document.createElement("tr");
            tab_row.setAttribute('class', 'bg-gray-50 border-b-2 border-gray-300 hover:bg-gray-200');

            // id cell
            const id = document.createElement("td");
            id.setAttribute('class', ' p-3 text-lg font-semibold tracking-wide text-left border');
            id.textContent = todo.id;
            tab_row.appendChild(id);

            // name cell
            const title = document.createElement("td");
            title.setAttribute('class', ' p-3 text-lg font-semibold tracking-wide text-left border');
            title.textContent = todo.title;
            tab_row.appendChild(title);

            // status cell
            const status = document.createElement("td");
            status.setAttribute('class', 'status p-3 text-lg font-semibold tracking-wide text-left border');
            status.textContent = `${todo.completed ? 'Completed' : 'Not Completed'}`;
            tab_row.appendChild(status);

            // Edit cell
            const Todo_button = document.createElement("td");
            Todo_button.setAttribute('class', ' p-3 text-lg font-semibold tracking-wide text-left border');
            Todo_button.innerHTML = '<button>+</ button>';
            Todo_button.firstElementChild.setAttribute('class', 'edit_title bg-[#353535] hover:bg-black text-white font-bold py-4 px-6 rounded');
            tab_row.appendChild(Todo_button);

            // delete cell
            const d = document.createElement("td");
            d.setAttribute('class', ' p-3 text-lg font-semibold tracking-wide text-left border');
            d.innerHTML = '<button>delete</ button>';
            d.firstElementChild.setAttribute('class', 'todo_delete bg-[#353535] hover:bg-red-900 text-white font-bold py-4 px-6 rounded');
            tab_row.appendChild(d);
            tab_todo.appendChild(tab_row);
        })
    }
    catch (err) {
        console.log("Error While Fetching " + err);
    }
}

fetch_Todo();

// deleting a todo item
const del_todo = document.querySelector("#todo");
del_todo.addEventListener('click', (e) => {
    if (e.target.classList.contains("todo_delete")) {
        if (confirm("Are you sure !!\nYou Want to delete the task ?")) {
            const user_todo_del = e.target.closest("tr");
            user_todo_del.remove();
        }
    }
})

// Editing task a todo item
const table = document.querySelector("#todo");
table.addEventListener('click', (e) => {
    if (e.target.classList.contains("edit_title")) {
        const new_title = prompt("Enter new Title of this task ");
        if (new_title !== null) {
            const tds = e.target.closest('tr').children;
            const req_td = tds[1];
            req_td.textContent = new_title;
        }
    }
})