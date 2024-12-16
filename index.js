const formContainer = document.getElementById("formContainer");
const viewContainer = document.getElementById("viewContainer");
const entriesTableBody = document.getElementById("entriesTableBody");

// Parsing data from localStorage so that we can use them in tables to show data
const entriesArray = JSON.parse(localStorage.getItem("todoEntries")) || [];

// Creating an object based on the entries
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
        alert("This Email has already been registered!");
        return;
    }
    const newEntry = new TodoEntry(firstName, lastName, email);
    entriesArray.push(newEntry);

    localStorage.setItem("todoEntries", JSON.stringify(entriesArray));
    
    alert("User Registered Successfully!");
    document.getElementById("todoForm").reset();
});

document.getElementById("viewButton").addEventListener("click", () => {
    formContainer.classList.add("d-none");
    viewContainer.classList.remove("d-none");
    updateTable();
});

document.getElementById("formButton").addEventListener("click", () => {
    formContainer.classList.remove("d-none");
    viewContainer.classList.add("d-none");
});

function updateTable() {
    entriesTableBody.innerHTML = "";
    entriesArray.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${entry.firstName}</td>
                    <td>${entry.lastName}</td>
                    <td style="display: flex; flex-direction: column;">
                        ${entry.email}
                        <div style="display: flex; flex-direction: row; gap:10px;">
                            <button class="btn btn-danger btn-sm mt-2 delete-button" data-index="${index}">Delete</button>
                            <button class="btn btn-success btn-sm mt-2 edit-button" data-index="${index}">Edit</button>
                        </div>
                    </td>
                `;

        entriesTableBody.appendChild(row);
    });

    // Add event listeners for delete and edit buttons
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            entriesArray.splice(index, 1);
            localStorage.setItem("todoEntries", JSON.stringify(entriesArray));
            updateTable();
        });
    });

    document.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            const entry = entriesArray[index];

            // Populate the form with existing data
            document.getElementById("firstName").value = entry.firstName;
            document.getElementById("lastName").value = entry.lastName;
            document.getElementById("email").value = entry.email;

            // Remove the entry being edited
            entriesArray.splice(index, 1);
            localStorage.setItem("todoEntries", JSON.stringify(entriesArray));

            // Switch back to the form
            formContainer.classList.remove("d-none");
            viewContainer.classList.add("d-none");
        });
    });
}