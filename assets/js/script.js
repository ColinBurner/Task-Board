// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

$(document).ready(function () {
    renderTaskList();

    // Initialize the date picker
    $('#taskDueDate').datepicker();

    // Handle form submission
    $('#taskForm').submit(function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Retrieve the values from the input fields
        var taskTitle = $('#taskTitle').val();
        var taskDescription = $('#taskDescription').val();
        var taskDueDate = $('#taskDueDate').val();

        // Create a task object with the retrieved values
        var task = {
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate
        };

        // Get the existing tasks from local storage or create an empty array
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task to the array
        tasks.push(task);

        // Store the updated tasks array back to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Reset the form and hide the modal
        $('#taskForm')[0].reset();
        $('#formModal').modal('hide');

        // Re-render the task list
        renderTaskList();
    });
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // Retrieve existing tasks from local storage or initialize an empty array
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // If there are no existing tasks or if any task's ID is not numeric, return 0 as the first ID
    if (tasks.length === 0 || tasks.some(task => typeof task.id !== 'number' || isNaN(task.id))) {
        return 0;
    }

    // Otherwise, find the maximum ID in the existing tasks and increment it by 1
    var maxId = Math.max(...tasks.map(task => task.id));
    return maxId + 1;
}

// Todo: create a function to create a task card
function createTaskCard(task, taskIndex) {
    console.log('Creating task card:', task);

    // Create a new <div> element for the task card
    var card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Create the card body
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Set the task title as the card title
    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = task.title;

    // Set the task description as the card text
    var cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = task.description;

    // Append the card title and text to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    // Conditionally add "Due Date:" section if a valid due date is provided
    if (task.dueDate && task.dueDate.trim() !== '') {
        var dueDateText = document.createElement('p');
        dueDateText.classList.add('card-text');
        dueDateText.textContent = 'Due Date: ' + task.dueDate;
        cardBody.appendChild(dueDateText);
    }

    // Create a "delete task" button
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'mt-3');
    deleteButton.textContent = 'Delete Task';

    // Attach an event listener to the "delete task" button
    deleteButton.addEventListener('click', function () {
        handleDeleteTask(taskIndex); // Call handleDeleteTask with the task index
    });

    // Append the delete button to the card body
    cardBody.appendChild(deleteButton);

    // Append the card body to the card
    card.appendChild(cardBody);

    console.log('Task card created:', card);

    // Return the created task card
    return card;
}

// Todo: create a function to render the task list and make cards draggable
$(document).ready(function () {
    // Make the "In Progress" lane droppable
    $('#in-progress-cards').droppable({
        accept: '.card', // Only accept elements with the 'card' class
        drop: function(event, ui) {
            // Handle the drop event here
            handleDrop(ui.draggable, 'in-progress');
        }
    });

    // Make the "Done" lane droppable
    $('#done-cards').droppable({
        accept: '.card', // Only accept elements with the 'card' class
        drop: function(event, ui) {
            // Handle the drop event here
            handleDrop(ui.draggable, 'done');
        }
    });

    // Make the cards draggable
    $('.card').draggable({
        revert: false,
        start: function () {
            $(this).css('z-index', 1000);
        },
        stop: function () {
            $(this).css('z-index', '');
        }
    });
});


// Function to render the task list
function renderTaskList() {
    // Retrieve tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Get the "to do" section container
    var todoSection = document.getElementById('todo-cards');
    // Clears existing task cards
    todoSection.innerHTML = '';
    // Iterate through tasks and create task cards
    tasks.forEach(function (task, index) {
        // Create a new task card element
        var card = createTaskCard(task, index);
        // Append the task card to the "to do" section container
        todoSection.appendChild(card);
    });
}




// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // Prevents the default form submission behavior
    event.preventDefault();

    // Get the values of the task inputs
    var title = document.getElementById('taskTitle').value;
    var description = document.getElementById('taskDescription').value;
    var dueDate = document.getElementById('taskDueDate').value;

    // Creates a task object with the input values
    var newTask = {
        title: title,
        description: description,
        // Add the retrieved due date value to the task object
        dueDate: dueDate,
        status: 'todo'
    };

    // Retrieves existing tasks from local storage or initialize an empty array
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Adds the new task to the tasks array
    tasks.push(newTask);

    // Store the updated tasks array in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clears the input fields after adding the task
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';

    // Renders the updated task list
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskIndex) {
    // Retrieve existing tasks from local storage or initialize an empty array
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove the task at the specified index
    tasks.splice(taskIndex, 1);

    // Store the updated tasks array in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Re-render the task list
    renderTaskList();
}



// Todo: create a function to handle dropping a task into a new status lane
$('.card').droppable({
    drop: function (event, ui) {
        console.log('Dropped onto:', $(this).attr('id'));
        handleDrop(ui.draggable, $(this).closest('.lane').attr('id'));
    }
});

// Modify the handleDrop function to accept the dropped element and target lane ID
function handleDrop(droppedElement, targetLane) {
    console.log('Handling drop:', droppedElement, targetLane);

    // Retrieve the task index from the dropped element's data attribute
    var taskIndex = droppedElement.data('task-index');
    console.log('Task index:', taskIndex);

    // Re-render the task list
    renderTaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
function renderTaskList() {
    // Retrieves tasks from local storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Get the "to do" section container
    var todoSection = document.getElementById('todo-cards');

    // Clears existing task cards
    todoSection.innerHTML = '';

    // Iterate through tasks and create task cards
    tasks.forEach(function (task, index) {
        // Create a new task card element
        var card = createTaskCard(task, index);

        // Append the task card to the "to do" section container
        todoSection.appendChild(card);
    });
}

$(document).ready(function () {
    // Initialize datepicker
    $('#taskDueDate').datepicker();
});


