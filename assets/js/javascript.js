const textInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const totalCounter = document.getElementById('total-counter');
const completedCounter = document.getElementById('completed-counter');

let tasks = [
  { id: 1, text: 'Cocinar', completed: false },
  { id: 2, text: 'Lavar', completed: false },
  { id: 3, text: 'Estudiar', completed: false }
];
let taskId = 4;

addButton.addEventListener('click', function() {
  const taskText = textInput.value.trim();

  if (taskText !== '') {
    // crear objeto para nueva tarea
    const task = {
      id: taskId,
      text: taskText,
      completed: false
    };

    tasks.push(task);
    taskId++;

// actualizamr contadores
    renderTasks();
    updateCounters();

    textInput.value = '';
  }
});

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const row = document.createElement('tr');
// celda ID 
    const taskIdCell = document.createElement('td');
    taskIdCell.textContent = task.id;
// celda tareas
    const taskDetailCell = document.createElement('td');
    taskDetailCell.textContent = task.text;
    if (task.completed) {
      taskDetailCell.style.textDecoration = 'line-through'; 
    }
//celda acciones
    const actionsCell = document.createElement('td');
//checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
// tachar tarea realizada
    checkbox.addEventListener('change', function() {
      task.completed = checkbox.checked;
      if (task.completed) {
        taskDetailCell.style.textDecoration = 'line-through'; 
      } else {
        taskDetailCell.style.textDecoration = 'none';
      }
      updateCounters();
    });
// boton eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '✖';

    deleteButton.addEventListener('click', function() {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      updateCounters();
    });
// botones de acciones
    actionsCell.appendChild(checkbox);
    actionsCell.appendChild(deleteButton);

    row.appendChild(taskIdCell);
    row.appendChild(taskDetailCell);
    row.appendChild(actionsCell);

    taskList.appendChild(row);
  });
}
// actualizar los contadores
function updateCounters() {
  totalCounter.textContent = tasks.length;
  const completedCount = tasks.filter(task => task.completed).length;
  completedCounter.textContent = completedCount;
}

renderTasks();
updateCounters();
