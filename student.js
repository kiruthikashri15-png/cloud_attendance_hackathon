const students = JSON.parse(
    localStorage.getItem("students") || "[]"
);

const attendanceRecords = JSON.parse(
    localStorage.getItem("attendanceRecords") || "{}"
);

// Temporary demo: select a student ID here.
const studentId = new URLSearchParams(
    window.location.search
).get("id") || (students[0] ? students[0].id : "");

const student = students.find(function(item) {
    return item.id === studentId;
});

const historyTable = document.getElementById("historyTable");
const historyMessage = document.getElementById("historyMessage");

if (!student) {
    document.getElementById("studentInfo").textContent =
        "Student not found. Please add a student first.";

    historyMessage.textContent = "No student details available.";

} else {
    document.getElementById("studentInfo").textContent =
        "Student: " + student.name + " | ID: " + student.id;

    let total = 0;
    let present = 0;
    let absent = 0;

    const dates = Object.keys(attendanceRecords).sort().reverse();

    dates.forEach(function(date) {
        const status = attendanceRecords[date][student.id];

        if (status !== "Present" && status !== "Absent") {
            return;
        }

        total++;

        if (status === "Present") {
            present++;
        } else {
            absent++;
        }

        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        const statusCell = document.createElement("td");

        dateCell.textContent = date;
        statusCell.textContent = status;

        row.appendChild(dateCell);
        row.appendChild(statusCell);

        historyTable.appendChild(row);
    });

    const percentage = total > 0
        ? ((present / total) * 100).toFixed(1)
        : "0.0";

    document.getElementById("totalClasses").textContent = total;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("percentage").textContent =
        percentage + "%";

    if (total === 0) {
        historyMessage.textContent =
            "No attendance records available yet.";
    }
}

function logout() {
    window.location.href = "index.html";
}