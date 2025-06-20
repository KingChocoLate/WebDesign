/**
 * JavaScript for Home Page
 * - Pomodoro Timer functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    // Timer Display Elements
    const minutesDisplay = document.getElementById('minutes-display');
    const secondsDisplay = document.getElementById('seconds-display');
    
    // Control Buttons
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timerModeDisplay = document.getElementById('timer-mode');
    
    // Time Adjustment Buttons
    const increaseMinBtn = document.getElementById('increase-min-btn');
    const decreaseMinBtn = document.getElementById('decrease-min-btn');
    const increaseSecBtn = document.getElementById('increase-sec-btn');
    const decreaseSecBtn = document.getElementById('decrease-sec-btn');

    let timer;
    let isRunning = false;
    let seconds = 1500; // 25 minutes
    let isBreak = false;

    // Helper function to show/hide adjustment buttons
    function showAdjustmentButtons(show) {
        if (show) {
            increaseMinBtn.classList.remove('hidden');
            decreaseMinBtn.classList.remove('hidden');
            increaseSecBtn.classList.remove('hidden');
            decreaseSecBtn.classList.remove('hidden');
        } else {
            increaseMinBtn.classList.add('hidden');
            decreaseMinBtn.classList.add('hidden');
            increaseSecBtn.classList.add('hidden');
            decreaseSecBtn.classList.add('hidden');
        }
    }

    function updateDisplay() {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        minutesDisplay.textContent = mins.toString().padStart(2, '0');
        secondsDisplay.textContent = secs.toString().padStart(2, '0');
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startBtn.textContent = 'Pause';
        showAdjustmentButtons(false); // --- HIDE the buttons when the timer starts

        timer = setInterval(() => {
            seconds--;
            updateDisplay();
            if (seconds < 0) {
                clearInterval(timer);
                isRunning = false;
                
                if (isBreak) {
                    seconds = 1500; 
                    timerModeDisplay.textContent = 'Time to focus!';
                    startBtn.textContent = 'Start Focus';
                } else {
                    seconds = 300; 
                    timerModeDisplay.textContent = 'Time for a break!';
                    startBtn.textContent = 'Start Break';
                }
                isBreak = !isBreak;
                updateDisplay();
                // We don't show buttons here, user must reset to edit
                alert(timerModeDisplay.textContent);
            }
        }, 1000);
    }
    
    function pauseTimer() {
        isRunning = false;
        clearInterval(timer);
        startBtn.textContent = 'Resume';
        // Buttons remain hidden during pause
    }


    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isBreak = false;
        seconds = 1500;
        updateDisplay();
        startBtn.textContent = 'Start Focus';
        timerModeDisplay.textContent = 'Time to focus!';
        showAdjustmentButtons(true); // --- SHOW the buttons when reset
    }
    
    startBtn.addEventListener('click', () => {
        if(isRunning){
            pauseTimer();
        } else {
            startTimer();
        }
    });
    resetBtn.addEventListener('click', resetTimer);

    // --- Functionality for Editing Time ---

    increaseMinBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds < 3540) {
            seconds += 60;
            updateDisplay();
        }
    });
    
    decreaseMinBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds >= 60) {
            seconds -= 60;
            updateDisplay();
        }
    });

    increaseSecBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds < 3599) {
            seconds += 1;
            updateDisplay();
        }
    });

    decreaseSecBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds > 0) {
            seconds -= 1;
            updateDisplay();
        }
    });

    minutesDisplay.addEventListener('click', () => {
        if (isRunning) return;
        const currentMinutes = Math.floor(seconds / 60);
        const newMinutes = prompt("Enter new minutes (1-59):", currentMinutes);

        if (newMinutes !== null) {
            const parsedMinutes = parseInt(newMinutes, 10);
            if (!isNaN(parsedMinutes) && parsedMinutes > 0 && parsedMinutes < 60) {
                const currentSeconds = seconds % 60;
                seconds = (parsedMinutes * 60) + currentSeconds;
                updateDisplay();
            } else {
                alert("Please enter a valid number between 1 and 59.");
            }
        }
    });

    secondsDisplay.addEventListener('click', () => {
        if (isRunning) return;
        const currentSeconds = seconds % 60;
        const newSeconds = prompt("Enter new seconds (0-59):", currentSeconds);

        if (newSeconds !== null) {
            const parsedSeconds = parseInt(newSeconds, 10);
            if (!isNaN(parsedSeconds) && parsedSeconds >= 0 && parsedSeconds < 60) {
                const currentMinutes = Math.floor(seconds / 60);
                seconds = (currentMinutes * 60) + parsedSeconds;
                updateDisplay();
            } else {
                alert("Please enter a valid number between 0 and 59.");
            }
        }
    });


    updateDisplay(); // Initial display
});