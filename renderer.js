// Timer logic
let timerInterval;
let timerRunning = false;
let timeRemaining = 1500; // 25 minutes in seconds by default

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const setTimerButton = document.getElementById('set-timer');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

// Start/Stop button functionality
startStopButton.addEventListener('click', () => {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    startStopButton.textContent = 'Start';
  } else {
    timerRunning = true;
    startStopButton.textContent = 'Stop';
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimeDisplay();
      } else {
        clearInterval(timerInterval);
        alert('Time is up!');
      }
    }, 1000);
  }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timeRemaining = 1500; // Default 25 minutes
  updateTimeDisplay();
  startStopButton.textContent = 'Start';
});

// Set custom timer functionality
setTimerButton.addEventListener('click', () => {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  timeRemaining = minutes * 60 + seconds;
  updateTimeDisplay();
});

// Update the timer display
function updateTimeDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
}

// Task List logic
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    renderTaskList();
    taskInput.value = '';
  }
});

function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTaskList();
    });
    li.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTaskList();
    });
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}
