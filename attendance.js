const attendanceTable = document.getElementById("attendanceTable");
const attendanceDate = document.getElementById("attendanceDate");
const attendanceMessage = document.getElementById("attendanceMessage");
const saveButton = document.getElementById("saveAttendance");

const students = JSON.parse(
    localStorage.getItem("students") || "[]"
);

let attendanceRecords = JSON.parse(
    localStorage.getItem("attendanceRecords") || "{}"
);

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

attendanceDate.value = getToday();

function displayAttendance() {
    attendanceTable.innerHTML = "";

    if (students.length === 0) {
        attendanceTable.innerHTML = `
            <tr>
                <td colspan="3">
                    No students found. Add students first.
                </td>
            </tr>
        `;
        saveButton.disabled = true;
        return;
    }

    saveButton.disabled = false;

    const date = attendanceDate.value;
    const todayRecords = attendanceRecords[date] || {};

    students.forEach(function(student) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = student.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const statusCell = document.createElement("td");
        const select = document.createElement("select");

        select.dataset.studentId = student.id;
        select.setAttribute(
            "aria-label",
            "Attendance for " + student.name
        );

        const options = [
            { value: "", text: "Select Status" },
            { value: "Present", text: "Present" },
            { value: "Absent", text: "Absent" }
        ];

        options.forEach(function(optionData) {
            const option = document.createElement("option");
            option.value = optionData.value;
            option.textContent = optionData.text;
            select.appendChild(option);
        });

        select.value = todayRecords[student.id] || "";

        statusCell.appendChild(select);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);

        attendanceTable.appendChild(row);
    });
}

attendanceDate.addEventListener("change", function() {
    attendanceMessage.textContent = "";
    displayAttendance();
});

saveButton.addEventListener("click", function() {
    const date = attendanceDate.value;

    if (!date) {
        attendanceMessage.textContent = "Please select a date.";
        return;
    }

    const selects = attendanceTable.querySelectorAll("select");

    if (selects.length === 0) {
        attendanceMessage.textContent = "Please add students first.";
        return;
    }

    const newRecords = {};

    for (const select of selects) {
        if (!select.value) {
            attendanceMessage.textContent =
                "Please select Present or Absent for every student.";
            return;
        }

        newRecords[select.dataset.studentId] = select.value;
    }

    attendanceRecords[date] = newRecords;

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );

    attendanceMessage.textContent =
        "Attendance saved successfully!";

});

function goBack() {
    window.location.href = "faculty.html";
}

displayAttendance();