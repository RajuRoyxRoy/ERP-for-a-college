// Function to update date and time
function updateDate() {
  const dateTimeElement = document.getElementById("date");
  const now = new Date();
  const date = now.toLocaleDateString();
  dateTimeElement.textContent = `${date}`;

  document.getElementById("current-day").textContent = now.toLocaleDateString(
    "en-US",
    { weekday: "long" }
  );
  document.getElementById("current-date").textContent = date;
}

function updateTime() {
  const dateTimeElement = document.getElementById("time");
  const now = new Date();
  const time = now.toLocaleTimeString();
  dateTimeElement.textContent = `${time}`;

  document.getElementById("current-day").textContent = now.toLocaleDateString(
    "en-US",
    { weekday: "long" }
  );
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  if (taskInput.value.trim()) {
    const li = document.createElement("li");

    li.textContent = taskInput.value.trim();

    const deleteBtn = document.createElement("button");

    // deleteBtn.textContent = "Delete";
    deleteBtn.innerHTML = '<img src="assets/icons/delete.png" alt="Delete"/>';
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
      taskList.removeChild(li);
      saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    saveTasks();
  }

  taskInput.value = "";
}

// Function to save tasks to localStorage
function saveTasks() {
  const taskList = document.getElementById("task-list");
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push(li.childNodes[0].textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task;

      const deleteBtn = document.createElement("button");

      // Set the button's innerHTML to include the image
      deleteBtn.innerHTML =
        '<img src="assets/icons/delete.png" alt="Delete" />';
      deleteBtn.classList.add("delete-btn");

      // Add the delete functionality
      deleteBtn.onclick = function () {
        document.getElementById("task-list").removeChild(li);
        saveTasks();
      };

      // Append the delete button to the list item
      li.appendChild(deleteBtn);

      // Append the list item to the task list
      document.getElementById("task-list").appendChild(li);
    });
  }
}

// Function to render attendance chart
function renderChart() {
  const ctx = document.getElementById("attendance-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Students", "Teachers"],
      datasets: [
        {
          label: "Attendance",
          data: [44, 30], // Replace with actual attendance data
          backgroundColor: ["#4c5bd4", "#d44c5b"],
          borderColor: ["#4c5bd4", "#d44c5b"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      onClick: function (evt, elements) {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const index = elements[0].index;
          const label = this.data.labels[index];
          if (label === "Students") {
            window.location.href = "students.html";
          } else if (label === "Teachers") {
            window.location.href = "teachers.html";
          }
        }
      },
    },
  });
}

//Random notice

function generateNotices(n) {
  const sampleNotices = [
    "University will remain closed on September 5th due to a public holiday.",
    "Midterm exams will commence from October 10th.",
    "New course offerings for the spring semester have been announced.",
    "The annual cultural festival is scheduled for November 20th.",
    "Graduation ceremony will be held on December 15th.",
    "Library hours extended during exam week.",
    "Workshop on data science scheduled for next Friday.",
    "Sports week will start from September 25th.",
    "All students must complete their registration by September 10th.",
    "New parking regulations come into effect from next Monday.",
  ];

  const noticeList = document.getElementById("notice-list");
  noticeList.innerHTML = ""; // Clear previous notices

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * sampleNotices.length);
    const noticeText = sampleNotices[randomIndex];

    const li = document.createElement("li");
    li.textContent = noticeText;
    noticeList.appendChild(li);
  }
}
//Load section
function loadContent(page) {
  const contentDiv = document.getElementById("content");
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      contentDiv.innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Initialize functions on page load
window.onload = function () {
  updateTime();
  updateDate();
  setInterval(updateTime, updateDate, 1000);
  loadTasks();
  renderChart();
  generateNotices(10);
  loadSection("dashboard.html");
};
