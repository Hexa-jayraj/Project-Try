$(document).ready(function() {
  function toggleTaskForm() {
    $('#task-form').toggle(); // Show/Hide the task form
  }

  $('#create-task-btn').click(toggleTaskForm);

  $('#new-task-form').submit(function(event) {
    event.preventDefault(); // Prevent default form submission

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
          <div class="task" data-id="${data.insertId}">
            <h3>${taskName}</h3>
            <p>${taskDesc}</p>
            <p>Due: ${dueDate}</p>
            <p>Status: <span class="status pending">Pending</span></p>
            <button class="delete-task-btn">Delete</button>
            <button class="update-task-status-btn">Update Status</button>
          </div>
        `;
        $('#task-list').append(taskHtml);
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });

  $(document).on('click', '.delete-task-btn', function() {
    const taskId = $(this).closest('.task').data('id');
    $.ajax({
      type: 'DELETE',
      url: `/delete-task/${taskId}`,
      success: function(data) {
        console.log(data);
        $(this).closest('.task').remove();
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });

  $(document).on('click', '.update-task-status-btn', function() {
    const taskId = $(this).closest('.task').data('id');
    const status = prompt('Enter new status (e.g., "in_progress", "completed"): ');
    $.ajax({
      type: 'PUT',
      url: `/update-task-status/${taskId}`,
      data: { status },
      success: function(data) {
        console.log(data);
        $(this).closest('.task').find('.status').text(status);
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });
});