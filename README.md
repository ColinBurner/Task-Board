# Task Board
This is the repository for a simple Kanban board for task management.

## What I did to accomplish goals in this project
I used jquery and javascript functions including day.js to create a functional task board. I used CSS in conjuction with jquery to create a bit less boring of a task board page without going too overboard on styling. I used jquery to dynamically update the html. I used color properties of gold to show a task that is nearing due, red to show a task thats due that day OR past due. I used .draggable to make cards draggable to new columns as their status changes. I created a delete button that appears on the cards and when clicked, deletes the card permanently from the task board. I created a modal with a form for adding new tasks to the board. The due date portion of the form utilizes jquery datepicker to bring up a calendar for date selection. As cards are dragged to new columns, their status is dynamically updated to match their new column. On refresh or reload of the page, all tasks remain persistent.

## Visuals
![Screenshot 2024-05-27 165933](https://github.com/ColinBurner/Task-board/assets/85810714/1d2b8c1f-4458-4597-802d-98df4b07a625)

In this first screenshot you see the initial landing page with all 3 columns for to do, in progress and done. A button for "add task" exists here.

![Screenshot 2024-05-27 164257](https://github.com/ColinBurner/Task-board/assets/85810714/4b910bd7-19fc-4d87-a034-2d89baff4690)

In this screenshot you see some tasks have been added, their colors match their due dates and if they are near due, past due or not due for a while.

![Screenshot 2024-05-27 164508](https://github.com/ColinBurner/Task-board/assets/85810714/ed7073ca-09e3-4983-8fb3-b3529d99d193)

In this screenshot you can see that a couple of the task cards have been dragged to new columns.

![Screenshot 2024-05-27 170240](https://github.com/ColinBurner/Task-board/assets/85810714/5f825bda-594d-419f-b871-81511d3398ee)

This screenshot shows the form for submitting new tasks along with the datepicker calendar for due date selection.

![Screenshot 2024-05-27 164543](https://github.com/ColinBurner/Task-board/assets/85810714/f10db2a1-adcb-4edf-ac56-e4df1de4671b)

Finally, this screenshot shows some of the html code, specifically the section that creates the modal form.

## Usage
This web page is designed to help someone organize tasks that need to be done, shows which items should be prioritized with a color coding system. Simply click the "add task" button to get started adding task cards to the board. Give your tasks titles, descriptions and due dates using the datepicker. Upon submit each one will appear in the "To do" column. As you transition a task into being in progress, click it's card and drag it into the "in progress" column. As time goes on, the color of the cards will changed based on the due date you selected if you do not complete the tasks. Once a task is done, click and drag it to the "done" column. Notice the legend in the header helping you identify what each color means for a specific card.

## Here is a link to the deployed webpage:

https://colinburner.github.io/Task-board/

## For support issues, contact me at the email below

<a href="mailto: b2rn3r@yahoo.com">b2rn3r@yahoo.com</a>

## Roadmap
This task board is finished.

## License
MIT
