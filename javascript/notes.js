/**
 * JavaScript for Notes Page
 * - Add, save, and delete notes.
 */
document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const notesContainer = document.getElementById('notes-container');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');

    // --- Load notes from localStorage ---
    let notes = JSON.parse(localStorage.getItem('studyhub-notes')) || [];

    function displayNotes() {
        notesContainer.innerHTML = '';
        if (notes.length === 0) {
             notesContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center">No notes yet. Add one!</p>`;
             return;
        }
        
        notes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            noteEl.className = 'bg-yellow-200 rounded-lg shadow-md p-5 flex flex-col justify-between transform hover:scale-105 transition-transform';
            noteEl.innerHTML = `
                <div>
                    <h3 class="font-bold text-lg mb-2 text-gray-800">${note.title}</h3>
                    <p class="text-gray-700 text-sm">${note.content}</p>
                </div>
                <div class="text-right mt-4">
                     <button class="text-gray-500 hover:text-red-500 delete-note-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            notesContainer.appendChild(noteEl);
        });
    }

    function saveNotes() {
        localStorage.setItem('studyhub-notes', JSON.stringify(notes));
    }
    
    function showModal() {
        noteTitleInput.value = '';
        noteContentInput.value = '';
        noteModal.classList.remove('hidden');
    }
    
    function hideModal() {
         noteModal.classList.add('hidden');
    }

    addNoteBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', hideModal);
    
    saveNoteBtn.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();
        
        if(title && content) {
            notes.push({ title, content });
            saveNotes();
            displayNotes();
            hideModal();
        } else {
            alert("Please fill in both title and content.");
        }
    });

    notesContainer.addEventListener('click', (e) => {
        if (e.target.closest('.delete-note-btn')) {
            const button = e.target.closest('.delete-note-btn');
            const index = button.dataset.index;
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        }
    });

    displayNotes();
});
