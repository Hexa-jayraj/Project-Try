const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        const task = await response.json();
        const taskHTML = `
            <li data-id="${task.id}">
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button class="update-status ">Update Status</button>
                <button class="delete-task">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    } catch (error) {
        console.error(error);
    }
});

taskList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('update-status')) {
        const taskId = e.target.parentNode.dataset.id;
        try {
            const response = await fetch(/tasks/$,{taskId}, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: true })
            });
            const task = await response.json();
            console.log(task);
        } catch (error) {
            console.error(error);
        }
    } else if (e.target.classList.contains('delete-task')) {
        const taskId = e.target.parentNode.dataset.id;
        try {
            const response = await fetch(/tasks/$,{taskId}, {
                method: 'DELETE'
            });
            const task = await response.json();
            console.log(task);
            e.target.parentNode.remove();
        } catch (error) {
            console.error(error);
        }
    }
});