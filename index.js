const formContainer = document.getElementById("formContainer");
const viewContainer = document.getElementById("viewContainer");
const entriesTableBody = document.getElementById("entriesTableBody");

//parsing data from localStorage so that we can use them in tables to show data
const entriesArray =
    JSON.parse(localStorage.getItem("todoEntries")) || [];



//creating a object based on the entries;
class TodoEntry {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

document.getElementById("todoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    if (entriesArray.some((entry) => entry.email === email)) {
        alert("Email must be unique!");
        return;
    }
    const newEntry = new TodoEntry(firstName, lastName, email);
    entriesArray.push(newEntry);
    localStorage.setItem("todoEntries", JSON.stringify(entriesArray));
    alert("Entry added successfully!");
    document.getElementById("todoForm").reset();
});


// for toggling from table(users data) to form itself
document.getElementById('formButton').addEventListener("click", () => {
    formContainer.classList.remove("d-none");
    viewContainer.classList.add("d-none");
})


// for toggling between form and table(user data);
document
    .getElementById("viewButton")
    .addEventListener("click", () => {
        formContainer.classList.add("d-none");
        viewContainer.classList.remove("d-none");
        entriesTableBody.innerHTML = "";
        entriesArray.forEach((entry) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                    <td>${entry.firstName}</td>
                    <td>${entry.lastName}</td>
                    <td style="display: flex; flex-direction:column;"
                    >${entry.email}
                    <button className="btn btn-danger">
                    Delete</button>
                    <button className="btn btn-success">
                    Edit</button></td>
                `;

            entriesTableBody.appendChild(row);
        });
    });