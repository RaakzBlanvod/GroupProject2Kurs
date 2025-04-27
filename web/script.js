async function addTask() {
  const title = document.getElementById('taskInput').value;
  await eel.add_task(title)();
  updateTasks();
}

//Обновляем список при загрузке
async function updateTasks() {
  const tasks = await eel.get_all_tasks()();
  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = tasks.map(task => `
      <div class="task">
          ${task[1]} [${task[2]}]
      </div>
  `).join('');
}