/**
 * JavaScript for Home Page
 * - Pomodoro Timer functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timerModeDisplay = document.getElementById('timer-mode');

    let timer;
    let isRunning = false;
    let seconds = 1500; // 25 minutes
    let isBreak = false;

    function updateDisplay() {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startBtn.textContent = 'Pause';
        timer = setInterval(() => {
            seconds--;
            updateDisplay();
            if (seconds <= 0) {
                clearInterval(timer);
                isRunning = false;
                // Switch between focus and break
                if (isBreak) {
                    // Back to focus
                    seconds = 1500; // 25 mins
                    timerModeDisplay.textContent = 'Time to focus!';
                    startBtn.textContent = 'Start Focus';
                } else {
                    // Start break
                    seconds = 300; // 5 mins
                    timerModeDisplay.textContent = 'Time for a break!';
                    startBtn.textContent = 'Start Break';
                }
                isBreak = !isBreak;
                updateDisplay();
                alert(timerModeDisplay.textContent);
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
        seconds = 1500;
        updateDisplay();
        startBtn.textContent = 'Start Focus';
        timerModeDisplay.textContent = 'Time to focus!';
    }
    
    startBtn.addEventListener('click', () => {
        if(isRunning){
            pauseTimer();
        } else {
            startTimer();
        }
    });
    resetBtn.addEventListener('click', resetTimer);

    updateDisplay(); // Initial display
});
