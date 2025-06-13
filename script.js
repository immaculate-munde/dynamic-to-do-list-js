document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Avoid saving again
    }

    // Function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get all tasks from the DOM
    function getAllTasks() {
        const items = document.querySelectorAll('#task-list li');
        const tasks = [];
        items.forEach(item => {
            const text = item.firstChild.textContent.trim();
            tasks.push(text);
        });
        return tasks;
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const updatedTasks = getAllTasks();
            saveTasks(updatedTasks);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const currentTasks = getAllTasks();
            saveTasks(currentTasks);
        }

        taskInput.value = '';
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => addTask());

    // Event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
