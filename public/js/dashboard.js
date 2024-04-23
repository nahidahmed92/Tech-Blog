const newPostBtn = document.querySelector('#newPostBtn');
const createBtn = document.querySelector('#createBtn');

const dbFormHandler = async (event) => {
  event.preventDefault();
  const dbContainer = document.querySelector('#dashboardContainer');

  if (dbContainer.style.display === 'none') {
    dbContainer.style.display = 'block';
    dbContainer.scrollIntoView({ behavior: 'smooth' });
  } else if (createBtn) {
    dbContainer.style.display = 'none';
  }
};

const createBlogHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#dashboard-title').value.trim();
  const content = document.querySelector('#dashboard-content').value.trim();

  try {
    const response = await fetch('api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      console.error('Error submitting comment:', response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

newPostBtn.addEventListener('click', dbFormHandler);
createBtn.addEventListener('click', dbFormHandler);
createBtn.addEventListener('click', createBlogHandler);
