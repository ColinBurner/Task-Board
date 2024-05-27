// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

$(document).ready(function () {
    renderTaskList();
    // Initialize the date picker
    $('#taskDueDate').datepicker();

    // Handle form submission
    $('#taskForm').submit(function (event) {
        event.preventDefault();
        handleAddTask();
    });
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    var card = $('<div class="card mb-3 task-card" data-task-id="' + task.id + '"></div>');

    var cardBody = $('<div class="card-body"></div>');
    var cardTitle = $('<h5 class="card-title">' + task.title + '</h5>');
    var cardText = $('<p class="card-text">' + task.description + '</p>');

    if (task.dueDate && task.dueDate.trim() !== '') {
        var dueDateText = $('<p class="card-text">Due Date: ' + task.dueDate + '</p>');
        cardBody.append(dueDateText);

        // Used day.js to check due date and apply appropriate class aka color to the card
        var today = dayjs();
        var dueDate = dayjs(task.dueDate);

        if (dueDate.isSame(today, 'day')) {
            cardBody.addClass('due-today');
        } else if (dueDate.isBefore(today, 'day')) {
            cardBody.addClass('overdue');
        } else if (dueDate.diff(today, 'day') <= 2) {
            cardBody.addClass('due-soon');
        }
    }

    // Creates the delete button on the newcard
    var deleteButton = $('<button class="btn btn-danger mt-3">Delete</button>');
    deleteButton.click(function () {
        handleDeleteTask(task.id);
    });

    cardBody.append(cardTitle, cardText, deleteButton);
    card.append(cardBody);

    return card;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    taskList.forEach(function (task) {
        var card = createTaskCard(task);
        $('#' + task.status + '-cards').append(card);
        $(card).draggable({
            revert: 'invalid',
            stack: '.task-card',
            handle: '.card-body',
            zIndex: 1000 // this ensures the dragged cards appear above anything else on the page
        });
    });

    initializeDragAndDrop();
}

// Todo: create a function to handle adding a new task
function handleAddTask() {
    var title = $('#taskTitle').val();
    var description = $('#taskDescription').val();
    var dueDate = $('#taskDueDate').val();

    var newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        dueDate: dueDate,
        status: 'todo'
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    $('#taskForm')[0].reset();
    $('#formModal').modal('hide');
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskId) {
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}


// Todo: create a function to handle dropping a task into a new status lane
function initializeDragAndDrop() {
    $('.lane').droppable({
        accept: '.task-card',
        tolerance: 'intersect',
        drop: function (event, ui) {
            handleDrop($(ui.draggable).data('task-id'), $(this).attr('id').replace('-cards', ''));
        }
    });
}

// Modify the handleDrop function to accept the dropped element and target lane ID
function handleDrop(taskId, targetLane) {
    var taskIndex = taskList.findIndex(task => task.id == taskId);
    if (taskIndex !== -1) {
        taskList[taskIndex].status = targetLane;
        localStorage.setItem('tasks', JSON.stringify(taskList));
        renderTaskList();
    }
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker




