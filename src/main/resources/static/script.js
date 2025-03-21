document.addEventListener("DOMContentLoaded", fetchUsers);

function addUser() {
    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUsers();
    })
    .catch(error => console.error("Error:", error));
}

function fetchUsers() {
    fetch("http://localhost:8080/api/users/summary")
    .then(response => response.json())
    .then(users => {
        let tbody = document.querySelector("#userTable tbody");
        tbody.innerHTML = "";
        users.forEach(user => {
            let row = `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button></td>
            </tr>`;
            tbody.innerHTML += row;
        });
    })
    .catch(error => console.error("Error:", error));
}
