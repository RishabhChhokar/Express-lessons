let isEditing = false;
let currentEditId = null;

document.addEventListener("DOMContentLoaded", getAppointments);

function getAppointments() {
  axios
    .get("/api/appointments")
    .then((response) => {
      const appointments = response.data;
      document.getElementById("output").innerHTML =
        "<h2>Existing Appointments:</h2>";
      appointments.forEach((appointment) => {
        const editIcon = `<span class="edit-icon" onclick="editAppointment('${appointment.id}')">&#9998;</span>`;
        document.getElementById("output").innerHTML += `
              <p>ID: ${appointment.id} ${editIcon}</p>
              <p>Name: ${appointment.name}</p>
              <p>Age: ${appointment.age}</p>
              <p>Date: ${appointment.date}</p>
              <p>Time: ${appointment.time}</p>
              <button onclick="deleteAppointment('${appointment.id}')">Delete</button>
              <hr>
            `;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function bookOrUpdateAppointment() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const selectedDate = document.getElementById("date").value;
  const selectedTime = document.getElementById("time").value;
  if (age < 1 || age > 120) {
    alert("Age should be between 1 and 120");
    return;
  }
  if (name && age && selectedDate && selectedTime) {
    const appointment = {
      name,
      age,
      date: selectedDate,
      time: selectedTime,
    };

    if (isEditing && currentEditId) {
      axios
        .put(`/api/appointments/${currentEditId}`, appointment)
        .then(() => {
          alert("Appointment updated successfully!");
          resetForm();
          getAppointments();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      axios
        .post("/api/appointments", appointment)
        .then(() => {
          resetForm();
          getAppointments();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } else {
    alert("Please fill in all fields.");
  }
}

function deleteAppointment(id) {
  axios
    .delete(`/api/appointments/${id}`)
    .then(() => {
      getAppointments();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editAppointment(id) {
  axios
    .get(`/api/appointments/${id}`)
    .then((response) => {
      const appointment = response.data;
      document.getElementById("name").value = appointment.name;
      document.getElementById("age").value = appointment.age;
      document.getElementById("date").value = appointment.date;
      document.getElementById("time").value = appointment.time;

      isEditing = true;
      currentEditId = id;
      document.getElementById("bookBtn").innerText = "Update Appointment";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  isEditing = false;
  currentEditId = null;
  document.getElementById("bookBtn").innerText = "Book Appointment";
}
