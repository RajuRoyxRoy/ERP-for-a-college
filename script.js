// Function to update date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    dateTimeElement.textContent = `${date} ${time}`;
    
    document.getElementById('current-day').textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('current-date').textContent = date;
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim()) {
        const li = document.createElement('li');
        li.textContent = taskInput.value.trim();
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    taskInput.value = '';
}

// Function to save tasks to localStorage
function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push(li.childNodes[0].textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = function() {
                document.getElementById('task-list').removeChild(li);
                saveTasks();
            };
            
            li.appendChild(deleteBtn);
            document.getElementById('task-list').appendChild(li);
        });
    }
}

// Function to render attendance chart
function renderChart() {
    const ctx = document.getElementById('attendance-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Students', 'Teachers'],
            datasets: [{
                label: 'Attendance',
                data: [44, 30], // Replace with actual attendance data
                backgroundColor: ['#4c5bd4', '#d44c5b'],
                borderColor: ['#4c5bd4', '#d44c5b'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: function(evt, elements) {
                if (elements.length > 0) {
                    const datasetIndex = elements[0].datasetIndex;
                    const index = elements[0].index;
                    const label = this.data.labels[index];
                    if (label === 'Students') {
                        window.location.href = 'students.html';
                    } else if (label === 'Teachers') {
                        window.location.href = 'teachers.html';
                    }
                }
            }
        }
    });
}

// Initialize functions on page load
window.onload = function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadTasks();
    renderChart();
};
