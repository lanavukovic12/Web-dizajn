document.addEventListener("DOMContentLoaded", function () {
    const firebaseUrl = "https://webdizajn-8576a-default-rtdb.firebaseio.com";
    
    const editUserForm = document.getElementById('edit-user-form');
    const deleteUserForm = document.getElementById('delete-user-form');
    const imeInput = document.getElementById('ime');
    const emailInput = document.getElementById('email');
    const deleteUserSelect = document.getElementById('brisanje-korisnika');
    
    let selectedUserId = null;

    
    fetch(`${firebaseUrl}/korisnici.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                displayUsers(data);
            } else {
                console.error("No user data found.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    
    function displayUsers(users) {
        const userList = document.getElementById('user-list');
        
        for (const userId in users) {
            const user = users[userId];
            
            
            const userCard = document.createElement('div');
            userCard.className = 'col-md-6';
            userCard.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h2 class="card-title">Detalji Korisnika</h2>
                        <p class="card-text">Ime: ${user.ime} ${user.prezime}</p>
                        <p class="card-text">Email: ${user.email}</p>
                        <button class="btn btn-warning edit-user-btn" data-user-id="${userId}">Izmeni</button>
                    </div>
                </div>
            `;
            userList.appendChild(userCard);
            
            
            const option = document.createElement('option');
            option.value = userId;
            option.textContent = `${user.ime} ${user.prezime}`;
            deleteUserSelect.appendChild(option);
        }

       
        document.querySelectorAll('.edit-user-btn').forEach(button => {
            button.addEventListener('click', function () {
                selectedUserId = this.getAttribute('data-user-id');
                const user = users[selectedUserId];
                imeInput.value = user.ime;
                emailInput.value = user.email;
            });
        });
    }

    
    editUserForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (selectedUserId) {
            const updatedUser = {
                ime: imeInput.value,
                email: emailInput.value
            };
            fetch(`${firebaseUrl}/korisnici/${selectedUserId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            .then(response => response.json())
            .then(data => {
                alert('Podaci korisnika su uspešno ažurirani.');
                location.reload(); 
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
        }
    });

    
    deleteUserForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userIdToDelete = deleteUserSelect.value;
        fetch(`${firebaseUrl}/korisnici/${userIdToDelete}.json`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Korisnik je uspešno obrisan.');
            location.reload(); 
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    });
});
