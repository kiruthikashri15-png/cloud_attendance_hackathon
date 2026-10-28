const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const studentMessage = document.getElementById("studentMessage");

// Load students saved in this browser
let students = JSON.parse(
    localStorage.getItem("students") || "[]"
);

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents() {
    studentTable.innerHTML = "";

    if (students.length === 0) {
        studentTable.innerHTML = `
            <tr>
                <td colspan="4">No students added yet.</td>
            </tr>
        `;
        return;
    }

    students.forEach(function(student, index) {
        const row = document.createElement("tr");

        [student.id, student.name, student.email].forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.style.marginTop = "0";
        deleteButton.style.width = "auto";
        deleteButton.style.padding = "8px 12px";

        deleteButton.addEventListener("click", function() {
            deleteStudent(index);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        studentTable.appendChild(row);
    });
}

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    if (students.some(student => student.id.toLowerCase() === id.toLowerCase())) {
        studentMessage.textContent = "This student ID already exists.";
        return;
    }

    students.push({ id, name, email });

    saveStudents();
    displayStudents();

    studentMessage.textContent = "Student added successfully!";

    studentForm.reset();
});

function deleteStudent(index) {
    const confirmed = confirm("Do you want to delete this student?");

    if (!confirmed) return;

    students.splice(index, 1);

    saveStudents();
    displayStudents();

    studentMessage.textContent = "Student deleted successfully.";
}

function goBack() {
    window.location.href = "faculty.html";
}

displayStudents();