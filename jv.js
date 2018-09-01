//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item Function
var createNewTaskElement = function(taskString) {
  //Create list item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");

  //each element needs modifing
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;

}

//Add a new task function
var addTask = function() {
  console.log("Add Task..");

  //create new list item witht text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);

  //append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task function
var editTask = function() {
  console.log("Edit Task..");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  //if the class of the parent is .editMode
  if(containsClass) {
    //switch to .editMode
    //label text become the input value
    label.innerText = editInput.value;
  } else {
    //swith to .editmode
    //inpit value becomes the label's text
    editInput.value = label.innerText;
  }

    //Toggle .editMode on the li
    listItem.classList.toggle("editMode");
  }

//Delete an exsisting task function
var deleteTask = function() {
  console.log("Delete Task..");

  //remove parent li from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Task Complete ..");

  //append task li to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Incomplete Task..");

  //append task li to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");

  //select children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;

}

//Ajax Function
var ajaxRequest = function() {
  console.log("Ajax request");
}


//set click handler
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//cycle over incompleteTaskHolder
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {

  //bind events to li children (taskIncomplete)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completeTaskHolder
for(var i = 0; i < completedTasksHolder.children.length; i++) {

  //bind events to li children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
