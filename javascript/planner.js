/**
 * JavaScript for Planner Page
 * - Add, complete, and delete tasks.
 */
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // --- Load tasks from localStorage ---
    let tasks = JSON.parse(localStorage.getItem('studyhub-tasks')) || [];

    function saveTasks() {
        localStorage.setItem('studyhub-tasks', JSON.stringify(tasks));
    }

    function displayTasks() {
        taskList.innerHTML = '';
         if (tasks.length === 0) {
             taskList.innerHTML = `<p class="text-gray-500 text-center">No tasks for today. Add one!</p>`;
             return;
        }
        
        tasks.forEach((task, index) => {
            const taskEl = document.createElement('div');
            taskEl.className = `flex items-center justify-between p-4 rounded-lg shadow-sm transition-colors ${task.completed ? 'bg-green-100' : 'bg-gray-50'}`;
            taskEl.innerHTML = `
                <div class="flex items-center">
                    <input type="checkbox" class="h-5 w-5 text-indigo-600 rounded-sm border-gray-300 focus:ring-indigo-500 task-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                    <span class="ml-4 text-gray-700 ${task.completed ? 'line-through' : ''}">${task.text}</span>
                </div>
                <button class="text-gray-400 hover:text-red-500 transition-colors delete-task-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            `;
            taskList.appendChild(taskEl);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            displayTasks();
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.matches('.task-checkbox')) {
            const index = target.dataset.index;
            tasks[index].completed = target.checked;
            saveTasks();
            displayTasks();
        }
        if (target.closest('.delete-task-btn')) {
            const index = target.closest('.delete-task-btn').dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    });
    
    displayTasks();
});
