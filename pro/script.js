$(document).ready(function() {
    $('#create-task-btn').click(function() {
        $('#task-form').toggle(); // Show/Hide the task form
    });

    $('#new-task-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        const taskName = $('#task-name').val();
        const taskDesc = $('#task-desc').val();
        const dueDate = $('#due-date').val();

        // Create a new task element
        const taskHtml = `
            <div class="task">
                <h3>${taskName}</h3>
                <p>${taskDesc}</p>
                <p>Due: ${dueDate}</p>
            </div>
        `;

        // Append the new task element to the task list
        $('#task-list').append(taskHtml); // Assuming #task-list is the ID of the task list container
    });
});

$('#new-task-form').submit(function(event) {
    event.preventDefault();
  
    const taskName = $('#task-name').val();
    const taskDesc = $('#task-desc').val();
    const dueDate = $('#due-date').val();
  
    $.ajax({
      type: 'POST',
      url: '/create-task',
      data: { taskName, taskDesc, dueDate },
      success: function(data) {
        console.log(data);
        // Update the task list UI
        const taskHtml = `
          <div class="task">
            <h3>${taskName}</h3>
            <p>${taskDesc}</p>
            <p>Due: ${dueDate}</p>
          </div>
        `;
        $('#task-list').append(taskHtml);
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });