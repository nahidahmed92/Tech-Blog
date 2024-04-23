const newPostBtn = document.querySelector('#newPostBtn');
const createBtn = document.querySelector('#createBtn');
const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');

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
    const response = await fetch('/api/dashboard', {
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

const updateBlogHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#dashboard-title').value.trim();
  const content = document.querySelector('#dashboard-content').value.trim();
  const blogPostId = getBlogPostIdFromURL();

  try {
    const response = await fetch(`/api/dashboard/${blogPostId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      console.error('Error updating blog:', response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteBlogHandler = async (event) => {
  event.preventDefault();
  const blogPostId = getBlogPostIdFromURL();
  const response = await fetch(`/api/dashboard/${blogPostId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    window.location.href = '/dashboard';
  } else {
    console.error('Error deleting blog:', response.statusText);
  }
};

// Function to extract the blog post ID from the URL
const getBlogPostIdFromURL = () => {
  const currentURL = window.location.href;
  const splitURL = currentURL.split('/');
  const blogPostId = splitURL[splitURL.length - 1];
  return blogPostId;
};
if (newPostBtn || createBtn) {
  newPostBtn.addEventListener('click', dbFormHandler);
  createBtn.addEventListener('click', dbFormHandler);
  createBtn.addEventListener('click', createBlogHandler);
} else {
  updateBtn.addEventListener('click', updateBlogHandler);
  deleteBtn.addEventListener('click', deleteBlogHandler);
}
