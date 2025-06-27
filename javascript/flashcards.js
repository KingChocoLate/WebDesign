document.addEventListener('DOMContentLoaded', () => {
    // Deck Management Elements
    const deckNameInput = document.getElementById('deck-name-input');
    const createDeckBtn = document.getElementById('create-deck-btn');
    const deckContainer = document.getElementById('deck-container');

    // Dynamic Card Form Elements
    const newCardsContainer = document.getElementById('new-cards-container');
    const addCardBtn = document.getElementById('add-card-btn');

    // Flashcard Viewer Elements
    const flashcardViewer = document.getElementById('flashcard-viewer');
    const closeViewerBtn = document.getElementById('close-viewer-btn');
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');

    // Data
    let decks = [
        { 
            name: 'Web Development Basics', 
            cards: [
                { q: 'What does HTML stand for?', a: 'HyperText Markup Language' },
                { q: 'What does CSS stand for?', a: 'Cascading Style Sheets' },
            ]
        },
        { name: 'Advanced Calculus', cards: [{q: 'What is a derivative?', a:'The rate of change of a function.'}] }
    ];
    
    let currentDeckIndex = -1;
    let currentCardIndex = 0;

    // Deck Display Functions
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

    // Dynamic Card Form Logic
    function createCardInputGroup() {
        const cardGroup = document.createElement('div');
        cardGroup.className = 'card-input-group grid grid-cols-1 md:grid-cols-2 gap-4 items-center';
        cardGroup.innerHTML = `
            <input type="text" class="card-term p-3 border-2 border-gray-200 rounded-lg" placeholder="Term (Question)">
            <div class="flex items-center gap-2">
                <input type="text" class="card-definition flex-grow p-3 border-2 border-gray-200 rounded-lg" placeholder="Definition (Answer)">
                <button class="delete-card-btn bg-red-500 hover:bg-red-600 text-white font-bold h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        return cardGroup;
    }

    addCardBtn.addEventListener('click', () => {
        newCardsContainer.appendChild(createCardInputGroup());
    });

    newCardsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.delete-card-btn')) {
            e.target.closest('.card-input-group').remove();
        }
    });

    createDeckBtn.addEventListener('click', () => {
        const deckName = deckNameInput.value.trim();
        if (!deckName) {
            alert('Please enter a title for the deck.');
            return;
        }

        const cardNodes = newCardsContainer.querySelectorAll('.card-input-group');
        const newCards = [];
        let allFieldsFilled = true;

        cardNodes.forEach(node => {
            const term = node.querySelector('.card-term').value.trim();
            const definition = node.querySelector('.card-definition').value.trim();

            if (!term || !definition) {
                allFieldsFilled = false;
            }
            newCards.push({ q: term, a: definition });
        });

        if (!allFieldsFilled) {
            alert('Please make sure all card terms and definitions are filled out before creating the deck.');
            return;
        }

        if (newCards.length === 0) {
            alert('Please add at least one card to the deck.');
            return;
        }

        decks.push({ name: deckName, cards: newCards });
        displayDecks();
        resetCreationForm();
        alert(`Deck "${deckName}" created successfully!`);
    });
    
    function resetCreationForm() {
        deckNameInput.value = '';
        newCardsContainer.innerHTML = ''; // Clear all card inputs
        // Add the first card back
        newCardsContainer.innerHTML = `
            <div class="card-input-group grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" class="card-term p-3 border-2 border-gray-200 rounded-lg" placeholder="Term (Question)">
                <input type="text" class="card-definition p-3 border-2 border-gray-200 rounded-lg" placeholder="Definition (Answer)">
            </div>
        `;
    }

    // Deck Interaction and Viewer Logic
    deckContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.delete-deck-btn')) {
             const index = target.closest('.delete-deck-btn').dataset.index;
             if(confirm(`Are you sure you want to delete the deck "${decks[index].name}"?`)){
                decks.splice(index, 1);
                displayDecks();
             }
        } else if (target.closest('.deck')) {
            const index = target.closest('.deck').dataset.index;
            openDeck(index);
        }
    });

    function openDeck(index) {
        currentDeckIndex = index;
        currentCardIndex = 0;
        if (decks[currentDeckIndex].cards.length === 0) {
            alert("This deck is empty!");
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
        // This ensures the card is always reset to the front-facing state
        if (flashcard.classList.contains('is-flipped')) {
            flashcard.classList.remove('is-flipped');
        }
        const deck = decks[currentDeckIndex];

        // By removing the delay, we ensure the text loads instantly and correctly.
        cardFront.textContent = deck.cards[index].q;
        cardBack.textContent = deck.cards[index].a;
    }
    
    flashcard.addEventListener('click', () => flashcard.classList.toggle('is-flipped'));
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

    // Initial Load
    displayDecks();
});