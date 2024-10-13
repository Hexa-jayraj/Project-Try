$(document).ready(function() {
    // Get task list from API
    $.ajax({
        type: "GET",
        url: "/api/tasks",
        success: function(tasks) {
            $.each(tasks, function(index, task) {
                $("#task-list").append("<li>" + task.name + " - " + task.description + "</li>");
            });
        }
    });

    // Create task form submission
    $("#submit-task-btn").click(function(event) {
        event.preventDefault();
        var taskName = $("#task-name").val();
        var taskDesc = $("#task-desc").val();
        var dueDate = $("#due-date").val();
        $.ajax({
            type: "POST",
            url: "/api/tasks",
            data: { name: taskName, description: taskDesc, dueDate: dueDate },
            success: function(task) {
                $("#task-list").append("<li>" + task.name + " - " + task.description + "</li>");
                $("#task-form").hide();
            }
        });
    });

    // Show/hide create task form
    $("#create-task-btn").click(function() {
        $("#task-form").toggle();
    });
});
