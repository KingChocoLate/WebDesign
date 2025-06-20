/**
 * JavaScript for Flashcards Page
 * - Flip card, navigate between cards.
 */
document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');

    const flashcardsData = [
        { q: 'What does HTML stand for?', a: 'HyperText Markup Language' },
        { q: 'What does CSS stand for?', a: 'Cascading Style Sheets' },
        { q: 'What is a "div" in HTML?', a: 'A generic container for flow content.' },
        { q: 'What is the purpose of "git clone"?', a: 'To create a local copy of a remote repository.' },
    ];

    let currentCardIndex = 0;

    function showCard(index) {
        if (flashcard.classList.contains('is-flipped')) {
            flashcard.classList.remove('is-flipped');
        }
        // A short delay to allow the card to flip back before changing content
        setTimeout(() => {
            cardFront.textContent = flashcardsData[index].q;
            cardBack.textContent = flashcardsData[index].a;
        }, 200);
    }
    
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('is-flipped');
    });

    prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
        showCard(currentCardIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
        showCard(currentCardIndex);
    });
    
    // Initialize first card
    showCard(currentCardIndex);
});
