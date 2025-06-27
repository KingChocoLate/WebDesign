document.addEventListener('DOMContentLoaded', () => {
    // Timer DOM Elements
    const minutesDisplay = document.getElementById('minutes-display');
    const secondsDisplay = document.getElementById('seconds-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timerModeDisplay = document.getElementById('timer-mode');
    const increaseMinBtn = document.getElementById('increase-min-btn');
    const decreaseMinBtn = document.getElementById('decrease-min-btn');
    const increaseSecBtn = document.getElementById('increase-sec-btn');
    const decreaseSecBtn = document.getElementById('decrease-sec-btn');

    let timer;
    let isRunning = false;
    let seconds = 1500; // 25 minutes
    let isBreak = false;

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
        showAdjustmentButtons(false); // Hide adjustment buttons when timer starts

        timer = setInterval(() => {
            seconds--;
            updateDisplay();
            if (seconds < 0) {
                clearInterval(timer);
                isRunning = false;
                
                if (isBreak) {
                    seconds = 1500; // Reset to 25 mins focus
                    timerModeDisplay.textContent = 'Time to focus!';
                    startBtn.textContent = 'Start Focus';
                } else {
                    seconds = 300; // Set to 5 mins break
                    timerModeDisplay.textContent = 'Time for a break!';
                    startBtn.textContent = 'Start Break';
                }
                isBreak = !isBreak;
                updateDisplay();
                alert(timerModeDisplay.textContent); // Notify user of mode change
            }
        }, 1000);
    }
    
    function pauseTimer() {
        isRunning = false;
        clearInterval(timer);
        startBtn.textContent = 'Resume';
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isBreak = false;
        seconds = 1500; // Reset to 25 minutes
        updateDisplay();
        startBtn.textContent = 'Start Focus';
        timerModeDisplay.textContent = 'Time to focus!';
        showAdjustmentButtons(true); // Show adjustment buttons on reset
    }
    
    startBtn.addEventListener('click', () => {
        if(isRunning){
            pauseTimer();
        } else {
            startTimer();
        }
    });
    resetBtn.addEventListener('click', resetTimer);

    // Time Adjustment Functionality
    increaseMinBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds < 3540) { // Max 59 minutes
            seconds += 60;
            updateDisplay();
        }
    });
    
    decreaseMinBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds >= 60) { // Min 1 minute
            seconds -= 60;
            updateDisplay();
        }
    });

    increaseSecBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds < 3599) { // Max 59:59
            seconds += 1;
            updateDisplay();
        }
    });

    decreaseSecBtn.addEventListener('click', () => {
        if (isRunning) return;
        if (seconds > 0) { // Min 0:00
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

    updateDisplay(); // Initial display on load
});