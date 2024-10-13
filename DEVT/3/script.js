// public/script.js
const loginForm = document.getElementById('login-form');
const dashboardForm = document.getElementById('create-task-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.message === 'Logged in successfully') {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
  }
});

dashboardForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('due-date').value;
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate }),
    });
    const data = await response.json();
    if (data.message === 'Task created successfully') {
      window.location.reload();
    } else {
      alert('Failed to create task');
    }
  } catch (error) {
    console.error(error);
  }
});
