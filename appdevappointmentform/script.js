document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointmentForm');
    const formMessage = document.getElementById('formMessage');
    const appointmentsList = document.getElementById('appointmentsList');

    function fetchAppointments() {
        fetch('fetch_appointments.php')
            .then(response => response.json())
            .then(appointments => {
                const table = document.createElement('table');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Age</th>
                            <th>Birthdate</th>
                            <th>Contact Number</th>
                            <th>Home Address</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                appointments.forEach(appointment => {
                    const tr = document.createElement('tr');
                    tr.setAttribute('id', `appointment${appointment.id}`);
                    tr.innerHTML = `
                        <td>${appointment.fullname}</td>
                        <td>${appointment.age}</td>
                        <td>${appointment.birthdate}</td>
                        <td>${appointment.contactnumber}</td>
                        <td>${appointment.homeaddress}</td>
                        <td>${appointment.purpose}</td>
                        <td>
                            <button class="editButton" data-id="${appointment.id}">Retrieve-</button>
                            <div class="editForm" style="display:none;">
                                <div>Full Name: </div>
                                <input type="text" class="editFullname" value="${appointment.fullname}" required>
                                <div>Age: </div>
                                <input type="number" class="editAge" value="${appointment.age}" required>
                                <div>Birthday: </div>
                                <input type="date" class="editBirthdate" value="${appointment.birthdate}" required>
                                <div>Contact No.: </div>
                                <input type="tel" class="editContactnumber" value="${appointment.contactnumber}" required>
                                <div>Home Address: </div>
                                <input type="text" class="editHomeaddress" value="${appointment.homeaddress}" required>
                                <div>Purpose: </div>
                                <textarea class="editPurpose" rows="5" required>${appointment.purpose}</textarea>
                                <button class="updateButton" data-id="${appointment.id}">Update</button>
                            </div>
                            <input type="checkbox" class="deleteCheckbox" value="${appointment.id}">
                        </td>
                    `;
                    table.querySelector('tbody').appendChild(tr);
                });
                table.innerHTML += `</tbody>`;
                appointmentsList.innerHTML = '';
                appointmentsList.appendChild(table);
            })
            .catch(error => console.error('Error:', error));
    }
    fetchAppointments();

    appointmentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(appointmentForm);
        fetch('index.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            formMessage.textContent = "Create Appointment Successfully";
            appointmentForm.reset();
            fetchAppointments();
        })
        .catch(error => console.error('Error:', error));
    });

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.deleteCheckbox:checked');
        if (checkboxes.length === 0) {
            alert('Please select appointments to delete.');
            return;
        }
        if (confirm('Are you sure you want to delete selected appointments?')) {
            const ids = Array.from(checkboxes).map(checkbox => checkbox.value);
            fetch('index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id=${ids}&action=delete`,
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                formMessage.textContent = "Delete Appointment Successfully";
                fetchAppointments();
            })
            .catch(error => console.error('Error:', error));
        }
    });

appointmentsList.addEventListener('click', function(event) {
    if (event.target.classList.contains('retrieveButton')) {
        const appointmentId = event.target.getAttribute('data-id');
        const retrieveForm = document.querySelector(`#appointment${appointmentId} .retrieveForm`);
        if (retrieveForm) {
            retrieveForm.style.display = 'block';
        } else {
            console.error('Retrieve form not found');
        }
    }
});

    appointmentsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('editButton')) {
            const appointmentId = event.target.getAttribute('data-id');
            const editForm = document.querySelector(`#appointment${appointmentId} .editForm`);
            if (editForm) {
                editForm.style.display = 'block';
                

            } else {
                console.error('Edit form not found');
            }
        }
    
        if (event.target.classList.contains('updateButton')) {
            const appointmentId = event.target.getAttribute('data-id');
            const editFullnameElement = document.querySelector(`#appointment${appointmentId} .editFullname`);
            const editFullname = editFullnameElement ? editFullnameElement.value : '';
            
            const editAgeElement = document.querySelector(`#appointment${appointmentId} .editAge`);
            const editAge = editAgeElement ? editAgeElement.value : '';
            
            const editBirthdateElement = document.querySelector(`#appointment${appointmentId} .editBirthdate`);
            const editBirthdate = editBirthdateElement ? editBirthdateElement.value : '';
            
            const editContactnumberElement = document.querySelector(`#appointment${appointmentId} .editContactnumber`);
            const editContactnumber = editContactnumberElement ? editContactnumberElement.value : '';
            
            const editHomeaddressElement = document.querySelector(`#appointment${appointmentId} .editHomeaddress`);
            const editHomeaddress = editHomeaddressElement ? editHomeaddressElement.value : '';
            
            const editPurposeElement = document.querySelector(`#appointment${appointmentId} .editPurpose`);
            const editPurpose = editPurposeElement ? editPurposeElement.value : '';
            
            const formData = new FormData();
            formData.append('action', 'update');
            formData.append('id', appointmentId);
            formData.append('fullname', editFullname);
            formData.append('age', editAge);
            formData.append('birthdate', editBirthdate);
            formData.append('contactnumber', editContactnumber);
            formData.append('homeaddress', editHomeaddress);
            formData.append('purpose', editPurpose);
            
            fetch('index.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                formMessage.textContent = "Update Appointment Successfully";
                fetchAppointments();
            })
            .catch(error => console.error('Error:', error));
        }
    });
    
});
