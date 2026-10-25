const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.button--add');
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task-list__item';

  checkBox.type = 'checkbox';
  checkBox.className = 'task-list__checkbox';
  checkBox.setAttribute('aria-label', `Mark ${taskText} as completed`);

  label.innerText = taskText;
  label.className = 'task-list__label';

  editInput.type = 'text';
  editInput.className = 'task-list__input';

  editButton.type = 'button';
  editButton.innerText = 'Edit';
  editButton.className = 'button button--edit';

  deleteButton.type = 'button';
  deleteButton.className = 'button button--delete';
  deleteButtonImg.className = 'button__icon';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete task';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task-list__input');
  const label = listItem.querySelector('.task-list__label');
  const editButton = listItem.querySelector('.button--edit');
  const isEditing = listItem.classList.contains('task-list__item--editing');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }
  listItem.classList.toggle('task-list__item--editing');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTask = function (event, targetList, checkboxHandler) {
  const listItem = event.currentTarget.parentNode;
  const label = listItem.querySelector('.task-list__label');
  label.classList.toggle(
    'task-list__label--completed',
    targetList === completedTasksHolder,
  );
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, checkboxHandler);
};

const taskCompleted = function (event) {
  moveTask(event, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function (event) {
  moveTask(event, incompleteTaskHolder, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxHandler) {
  const checkBox = taskListItem.querySelector('.task-list__checkbox');
  const editButton = taskListItem.querySelector('.button--edit');
  const deleteButton = taskListItem.querySelector('.button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
