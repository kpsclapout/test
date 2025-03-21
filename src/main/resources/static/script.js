document
  .getElementById("singleUserForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect user input data
    let user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    // Send the user data to the server via POST request
    fetch("/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.text())
      .then((message) => {
        alert(message); // or display it in a specific element
        fetchUsers(); // Update the user list after adding the new user
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error adding the user!");
      });
  });

function uploadFile() {
  let fileInput = document.getElementById("fileInput").files[0];
  let formData = new FormData();
  formData.append("file", fileInput);

  fetch("/api/users/upload", { method: "POST", body: formData })
    .then((response) => response.text())
    .then(alert)
    .then(() => fetchUsers());
}

function deleteUser() {
  let userId = document.getElementById("userId").value;
  fetch(`/api/users/delete/${userId}`, { method: "DELETE" })
    .then((response) => response.text())
    .then(alert)
    .then(() => fetchUsers());
}

function fetchUsers() {
  fetch("/api/users/summary")
    .then((response) => response.json())
    .then((users) => {
      let tbody = document.querySelector("#userTable tbody");
      tbody.innerHTML = "";
      users.forEach((user) => {
        let row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                </tr>`;
        tbody.innerHTML += row;
      });
    });
}

// Load users on page load
fetchUsers();
