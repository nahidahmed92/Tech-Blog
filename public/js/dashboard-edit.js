const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');

const updateBlogHandler = async (event) => {
  event.preventDefault();
  console.log('update button pressed');
  // const dbBlog = document.querySelector('#dashboard-blog');
  const title = document.querySelector('#dashboard-title').value.trim();
  const content = document.querySelector('#dashboard-content').value.trim();
  const blogPostId = getBlogPostIdFromURL();

  console.log('title:', title);
  console.log('content:', content);

  console.log('blog id: ', blogPostId);
  try {
    const response = await fetch(`/api/dashboard/${blogPostId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('dash response: ', response);
    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      console.error('Error submitting comment:', response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

// Function to extract the blog post ID from the URL
const getBlogPostIdFromURL = () => {
  const currentURL = window.location.href;
  const splitURL = currentURL.split('/');
  const blogPostId = splitURL[splitURL.length - 1];
  return blogPostId;
};

updateBtn.addEventListener('click', updateBlogHandler);
