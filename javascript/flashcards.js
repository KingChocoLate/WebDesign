/**
 * JavaScript for Flashcards Page
 * - Create, manage, and view flashcard decks.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Deck Management ---
    const deckNameInput = document.getElementById('deck-name-input');
    const createDeckBtn = document.getElementById('create-deck-btn');
    const deckContainer = document.getElementById('deck-container');

    // --- Flashcard Viewer ---
    const flashcardViewer = document.getElementById('flashcard-viewer');
    const closeViewerBtn = document.getElementById('close-viewer-btn');
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');

    // --- Data ---
    let decks = JSON.parse(localStorage.getItem('studyhub-decks')) || [
        { 
            name: 'Web Development Basics', 
            cards: [
                { q: 'What does HTML stand for?', a: 'HyperText Markup Language' },
                { q: 'What does CSS stand for?', a: 'Cascading Style Sheets' },
                { q: 'What is a "div" in HTML?', a: 'A generic container for flow content.' },
                { q: 'What is the purpose of "git clone"?', a: 'To create a local copy of a remote repository.' },
            ]
        },
        { name: 'Advanced Calculus', cards: [{q: 'What is a derivative?', a:'The rate of change of a function.'}] }
    ];
    
    let currentDeckIndex = -1;
    let currentCardIndex = 0;

    // --- Deck Functions ---
    function saveDecks() {
        localStorage.setItem('studyhub-decks', JSON.stringify(decks));
    }

    function displayDecks() {
        deckContainer.innerHTML = '';
        if (decks.length === 0) {
            deckContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center">No decks yet. Create one to get started!</p>`;
            return;
        }

        decks.forEach((deck, index) => {
            const deckEl = document.createElement('div');
            deckEl.className = 'bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow transform hover:-translate-y-1 cursor-pointer deck';
            deckEl.dataset.index = index;
            deckEl.innerHTML = `
                <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${deck.name}</h3>
                    <p class="text-gray-600">${deck.cards.length} Card${deck.cards.length !== 1 ? 's' : ''}</p>
                </div>
                <div class="text-right mt-4">
                    <button class="text-gray-400 hover:text-red-500 delete-deck-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            deckContainer.appendChild(deckEl);
        });
    }
    
    createDeckBtn.addEventListener('click', () => {
        const deckName = deckNameInput.value.trim();
        if (deckName) {
            decks.push({ name: deckName, cards: [] });
            saveDecks();
            displayDecks();
            deckNameInput.value = '';
            // For now, prompt user to add cards manually or pre-fill.
            // A more advanced version would have a card editor.
            alert(`Deck "${deckName}" created! For this example, cards need to be added programmatically.`);
        } else {
            alert('Please enter a name for the deck.');
        }
    });

    deckContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.delete-deck-btn')) {
             const index = target.closest('.delete-deck-btn').dataset.index;
             if(confirm(`Are you sure you want to delete the deck "${decks[index].name}"?`)){
                decks.splice(index, 1);
                saveDecks();
                displayDecks();
             }
        } else if (target.closest('.deck')) {
            const index = target.closest('.deck').dataset.index;
            openDeck(index);
        }
    });

    // --- Flashcard Viewer Functions ---
    function openDeck(index) {
        currentDeckIndex = index;
        currentCardIndex = 0;
        
        if (decks[currentDeckIndex].cards.length === 0) {
            alert("This deck is empty! A real app would let you add cards here.");
            return;
        }
        
        showCard(currentCardIndex);
        flashcardViewer.classList.remove('hidden');
    }

    function closeDeck() {
        flashcardViewer.classList.add('hidden');
        currentDeckIndex = -1;
    }

    function showCard(index) {
        if (flashcard.classList.contains('is-flipped')) {
            flashcard.classList.remove('is-flipped');
        }
        
        const deck = decks[currentDeckIndex];
        // A short delay to allow the card to flip back before changing content
        setTimeout(() => {
            cardFront.textContent = deck.cards[index].q;
            cardBack.textContent = deck.cards[index].a;
        }, 200);
    }
    
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('is-flipped');
    });

    prevBtn.addEventListener('click', () => {
        const deck = decks[currentDeckIndex];
        currentCardIndex = (currentCardIndex - 1 + deck.cards.length) % deck.cards.length;
        showCard(currentCardIndex);
    });

    nextBtn.addEventListener('click', () => {
        const deck = decks[currentDeckIndex];
        currentCardIndex = (currentCardIndex + 1) % deck.cards.length;
        showCard(currentCardIndex);
    });
    
    closeViewerBtn.addEventListener('click', closeDeck);

    // --- Initial Load ---
    displayDecks();
});