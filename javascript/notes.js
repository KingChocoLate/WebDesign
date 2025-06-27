document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const notesContainer = document.getElementById('notes-container');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');

    // Data Management
    let notes = [
        { title: 'Sample Note 1', content: 'This is the first sample note. It demonstrates how a note appears on the page.' },
        { title: 'Sample Note 2', content: 'This is another example note to show the grid layout of the notes.' }
    ];
    let currentlyEditingIndex = null; // null for new note, index for editing

    // UI Functions
    function displayNotes() {
        notesContainer.innerHTML = '';
        if (notes.length === 0) {
             notesContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center">No notes yet. Add one to get started!</p>`;
             return;
        }
        
        notes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            // Added 'note-card' class and data-index for click handling
            noteEl.className = 'note-card bg-yellow-200 rounded-lg shadow-md p-5 flex flex-col h-64 justify-between transform hover:scale-105 transition-transform cursor-pointer';
            noteEl.dataset.index = index;
            
            const sanitizedContent = note.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const sanitizedTitle = note.title.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            noteEl.innerHTML = `
                <div class="flex-grow overflow-hidden">
                    <h3 class="font-bold text-lg mb-2 text-gray-800 truncate">${sanitizedTitle}</h3>
                    <p class="text-gray-700 text-sm note-content-preview">${sanitizedContent}</p>
                </div>
                <div class="text-right mt-4 flex-shrink-0">
                     <button class="text-gray-500 hover:text-red-500 delete-note-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            notesContainer.appendChild(noteEl);
        });
    }

    function openModalForNew() {
        currentlyEditingIndex = null;
        noteTitleInput.value = 'Untitled';
        noteContentInput.value = '';
        noteModal.classList.remove('hidden');
        noteTitleInput.focus();
        noteTitleInput.select();
    }
    
    function openModalForEdit(index) {
        currentlyEditingIndex = index;
        const note = notes[index];
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        noteModal.classList.remove('hidden');
        noteTitleInput.focus();
    }

    function hideModal() {
         noteModal.classList.add('hidden');
         currentlyEditingIndex = null; // Reset editing state
    }

    // Event Listeners
    addNoteBtn.addEventListener('click', openModalForNew);
    closeModalBtn.addEventListener('click', hideModal);
    
    saveNoteBtn.addEventListener('click', () => {
        const title = noteTitleInput.value.trim() || 'Untitled';
        const content = noteContentInput.value.trim();
        
        if (!content) {
            alert("Please write some content for your note.");
            return;
        }

        const newNote = { title, content };

        if (currentlyEditingIndex !== null) {
            // Editing existing note
            notes[currentlyEditingIndex] = newNote;
        } else {
            // Creating new note
            notes.push(newNote);
        }
        
        displayNotes();
        hideModal();
    });

    notesContainer.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-note-btn');
        const card = e.target.closest('.note-card');

        if (deleteBtn) {
            const index = deleteBtn.dataset.index;
            if (confirm(`Are you sure you want to delete the note "${notes[index].title}"?`)) {
                notes.splice(index, 1);
                displayNotes();
            }
        } else if (card) {
            // If a card was clicked (but not the delete button)
            const index = card.dataset.index;
            openModalForEdit(index);
        }
    });

    // Initial Load
    displayNotes();
});