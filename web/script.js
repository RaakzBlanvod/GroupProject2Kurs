async function addTask() {
  const input = document.getElementById('taskInput');
  const errorDiv = document.getElementById('errorMessage');
  const title = input.value.trim();
  errorDiv.textContent = '';
  if (!title) return;

  try {
    await eel.add_task(title)();
    input.value = '';
    updateTasks();
  } catch (err) {
    console.error("Ошибка при добавлении задачи:", err);
    if (err.errorText && err.errorText.includes('value too long')) {
      errorDiv.textContent = 'Максимальная длина задачи — 50 символов.';
    }
  }
}

async function deleteTask(id) {
  await eel.delete_task(id)();
  updateTasks();
}

async function updateTasks() {
  try {
    const tasks = await eel.get_all_tasks()();
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = tasks.map(task => `
      <div class="task">
        <span title="${task[1]}">${task[1]}</span>
        <button onclick="deleteTask(${task[0]})">❌</button>
      </div>
    `).join('');
  } catch (err) {
    console.error("Ошибка при получении задач:", err);
  }
}

window.onload = function () {
  updateTasks();
};
