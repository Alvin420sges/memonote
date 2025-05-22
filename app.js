document.addEventListener('DOMContentLoaded', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesList = document.getElementById('notes-list');
    const newNoteBtn = document.getElementById('new-note-btn');
    const noteEditor = document.querySelector('.note-editor');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const cancelNoteBtn = document.getElementById('cancel-note-btn');
    
    let currentNoteId = null;
    let isEditing = false;
    
    function renderNotes() {
        notesList.innerHTML = '';
        
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-card';
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
            `;
            
            noteElement.addEventListener('click', () => {
                openNoteForEditing(index);
            });
            
            notesList.appendChild(noteElement);
        });
    }
    
    function openNoteForEditing(id) {
        currentNoteId = id;
        isEditing = true;
        
        const note = notes[id];
        noteTitle.value = note.title;
        noteContent.value = note.content;
        
        noteEditor.classList.remove('hidden');
    }
    
    function openNewNote() {
        currentNoteId = null;
        isEditing = false;
        
        noteTitle.value = '';
        noteContent.value = '';
        
        noteEditor.classList.remove('hidden');
        noteTitle.focus();
    }
    
    function saveNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (!title || !content) {
            alert('Please enter both title and content');
            return;
        }
        
        const note = { title, content };
        
        if (isEditing) {
            notes[currentNoteId] = note;
        } else {
            notes.push(note);
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        noteEditor.classList.add('hidden');
        renderNotes();
    }
    
    function cancelEditing() {
        noteEditor.classList.add('hidden');
    }
    
    newNoteBtn.addEventListener('click', openNewNote);
    saveNoteBtn.addEventListener('click', saveNote);
    cancelNoteBtn.addEventListener('click', cancelEditing);
    
    renderNotes();
});

// Modal logic for sign up (previously sign in)
document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('userIcon');
    const signUpModal = document.getElementById('signUpModal');
    const closeSignUpModalBtn = document.getElementById('closeSignUpModal');
    const signUpForm = document.getElementById('signUpForm');
    const signUpMessage = document.getElementById('signUpMessage');
    const successModal = document.getElementById('successModal');
    const continueBtn = document.getElementById('continueBtn');
    const welcomePage = document.getElementById('welcomePage');
    const mainCard = document.querySelector('.main-card:not(.welcome-page)');
    const profileUserName = document.getElementById('profileUserName');
    const welcomeUserName = document.getElementById('welcomeUserName');
    
    // Store user data
    let userData = {
        firstName: '',
        lastName: ''
    };

    if (userIcon && signUpModal && closeSignUpModalBtn && signUpForm && signUpMessage && successModal && continueBtn) {
        userIcon.onclick = function() {
            signUpModal.style.display = 'flex';
            signUpMessage.textContent = '';
            signUpForm.reset();
        };

        closeSignUpModalBtn.onclick = function() {
            signUpModal.style.display = 'none';
        };

        // Add user account/logout functionality
        const welcomeUserIcon = document.getElementById('welcomeUserIcon');
        const userAccountModal = document.getElementById('userAccountModal');
        const closeUserAccountModal = document.getElementById('closeUserAccountModal');
        const logoutBtn = document.getElementById('logoutBtn');
        const displayFirstName = document.getElementById('displayFirstName');
        const displayLastName = document.getElementById('displayLastName');
        const displayEmail = document.getElementById('displayEmail');
        
        if (welcomeUserIcon && userAccountModal && closeUserAccountModal && logoutBtn) {
            // Add cursor pointer style to welcomeUserIcon for better UX
            welcomeUserIcon.style.cursor = 'pointer';
            
            welcomeUserIcon.onclick = function() {
                // Fill in the user account details
                if (displayFirstName && displayLastName && displayEmail) {
                    displayFirstName.value = userData.firstName;
                    displayLastName.value = userData.lastName;
                    displayEmail.value = userData.email || 'juandelacruz@gmail.com'; // Fallback if email not stored
                }
                
                // Show the user account modal
                userAccountModal.style.display = 'flex';
            };
            
            closeUserAccountModal.onclick = function() {
                userAccountModal.style.display = 'none';
            };
            
            logoutBtn.onclick = function() {
                // Hide all modals
                userAccountModal.style.display = 'none';
                welcomePage.style.display = 'none';
                
                // Show the main card (initial state)
                if (mainCard) {
                    mainCard.style.display = 'block';
                }
                
                // Reset user data
                userData = {
                    firstName: '',
                    lastName: '',
                    email: ''
                };
            };
            
            // Close modal when clicking outside
            window.onclick = function(event) {
                if (event.target === signUpModal) {
                    signUpModal.style.display = 'none';
                }
                if (event.target === successModal) {
                    successModal.style.display = 'none';
                }
                if (event.target === userAccountModal) {
                    userAccountModal.style.display = 'none';
                }
            };
        }

        // Update the signUpForm.onsubmit function to also store email
        if (signUpForm) {
            signUpForm.onsubmit = function(e) {
                e.preventDefault();
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('passwordSignUp').value;
    
                if (!firstName || !lastName || !email || !password) {
                    signUpMessage.style.color = '#E57373';
                    signUpMessage.textContent = 'Please fill in all fields.';
                    return;
                }
    
                // Store user data for welcome page and account page
                userData.firstName = firstName;
                userData.lastName = lastName;
                userData.email = email;
                
                console.log('Attempting to sign up:', { firstName, lastName, email, password });
                
                // Hide sign-up modal and show success modal
                signUpModal.style.display = 'none';
                successModal.style.display = 'flex'; 
                signUpForm.reset();
            };
        }

        // Handle "Continue" button click on success modal
        continueBtn.onclick = function() {
            successModal.style.display = 'none';
            
            // Update welcome page with user's name
            if (profileUserName) {
                profileUserName.textContent = userData.firstName + ' ' + userData.lastName;
            }
            
            if (welcomeUserName) {
                welcomeUserName.textContent = userData.firstName.toUpperCase();
            }
            
            // Hide main card and show welcome page
            if (mainCard) {
                mainCard.style.display = 'none';
            }
            
            if (welcomePage) {
                welcomePage.style.display = 'block';
            }
        };

        // Handle clicks outside of modals to close them
        window.onclick = function(event) {
            if (event.target === signUpModal) {
                signUpModal.style.display = 'none';
            }
            if (event.target === successModal) {
                successModal.style.display = 'none';
            }
        };
    } else {
        console.error('One or more modal elements not found.');
    }
});