/**
 * JavaScript for Planner Page
 * - Calendar functionality and date-specific tasks.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const monthYearHeader = document.getElementById('month-year-header');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const tasksDateHeader = document.getElementById('tasks-date-header');

    // --- Utility Functions ---
    const toISODateString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // --- State ---
    // Tasks are now hardcoded instead of using localStorage
    let tasks = {
        [toISODateString(new Date())]: [
            { text: 'Submit the project report', completed: false },
            { text: 'Study for the upcoming exam', completed: true }
        ]
    };
    let currentDate = new Date();
    let selectedDate = new Date();

    // --- Data Functions ---
    function saveTasks() {
        // Data is not persisted in this version.
    }

    // --- Core Functions ---
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        monthYearHeader.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add day names
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            calendarGrid.innerHTML += `<div class="font-semibold text-gray-600 text-sm">${day}</div>`;
        });

        // Add blank days for start of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.innerHTML += '<div></div>';
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            const date = new Date(year, month, day);
            const dateStr = toISODateString(date);
            
            dayEl.textContent = day;
            dayEl.dataset.date = dateStr;
            dayEl.className = 'p-2 cursor-pointer rounded-full relative flex items-center justify-center';

            // Style today's date
            if (dateStr === toISODateString(new Date())) {
                dayEl.classList.add('text-indigo-600', 'font-bold');
            }

            // Style selected date
            if (dateStr === toISODateString(selectedDate)) {
                 dayEl.classList.add('bg-indigo-600', 'text-white');
            }
            
            // Add dot if tasks exist
            if (tasks[dateStr] && tasks[dateStr].length > 0) {
                 const dot = document.createElement('span');
                 dot.className = 'absolute bottom-1 h-1 w-1 bg-red-500 rounded-full';
                 dayEl.appendChild(dot);
            }

            calendarGrid.appendChild(dayEl);
        }
        
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const selectedDateStr = toISODateString(selectedDate);
        const dailyTasks = tasks[selectedDateStr] || [];

        // Update header
        tasksDateHeader.textContent = `Tasks for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}`;

        if (dailyTasks.length === 0) {
            taskList.innerHTML = `<p class="text-gray-500 text-center">No tasks for this day.</p>`;
            return;
        }

        dailyTasks.forEach((task, index) => {
            const taskEl = document.createElement('div');
            taskEl.className = `flex items-center justify-between p-4 rounded-lg shadow-sm transition-colors ${task.completed ? 'bg-green-100' : 'bg-gray-50'}`;
            taskEl.innerHTML = `
                <div class="flex items-center min-w-0">
                    <input type="checkbox" class="flex-shrink-0 h-5 w-5 text-indigo-600 rounded-sm border-gray-300 focus:ring-indigo-500 task-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                    <span class="min-w-0 ml-4 text-gray-700 break-words ${task.completed ? 'line-through' : ''}">${task.text}</span>
                </div>
                <button class="text-gray-400 hover:text-red-500 transition-colors delete-task-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            `;
            taskList.appendChild(taskEl);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const selectedDateStr = toISODateString(selectedDate);
            if (!tasks[selectedDateStr]) {
                tasks[selectedDateStr] = [];
            }
            tasks[selectedDateStr].push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderCalendar(); // Re-render to show task dot
        }
    }
    
    // --- Event Listeners ---
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    calendarGrid.addEventListener('click', (e) => {
        if (e.target.dataset.date) {
            // CORRECTED: Removed the extra 'new' keyword
            selectedDate = new Date(e.target.dataset.date + 'T00:00:00'); // Set time to midnight
            renderCalendar();
        }
    });

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const selectedDateStr = toISODateString(selectedDate);

        if (target.matches('.task-checkbox')) {
            const index = target.dataset.index;
            tasks[selectedDateStr][index].completed = target.checked;
        }
        
        if (target.closest('.delete-task-btn')) {
            const index = target.closest('.delete-task-btn').dataset.index;
            tasks[selectedDateStr].splice(index, 1);
        }

        saveTasks();
        renderTasks();
    });
    
    // --- Initial Load ---
    renderCalendar();
});