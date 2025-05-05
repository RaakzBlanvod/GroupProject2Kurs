async function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) return;

  try {
    await eel.add_task(title)();
    input.value = '';
    updateTasks();
  } catch (err) {
    console.error("Ошибка при добавлении задачи:", err);
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
        ${task[1]}
        <button onclick="deleteTask(${task[0]})" style="margin-left:10px;">❌</button>
      </div>
    `).join('');
  } catch (err) {
    console.error("Ошибка при получении задач:", err);
  }
}

window.onload = function () {
  updateTasks();
};
