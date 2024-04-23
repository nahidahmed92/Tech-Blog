const commentBtn = document.querySelector('#commentBtn');
const submitBtn = document.querySelector('#submitBtn');

const commentFormHandler = async (event) => {
  event.preventDefault();
  const commentContainer = document.querySelector('#commentContainer');
  const comment = document.querySelector('#commentInput').value.trim();

  if (commentContainer.style.display === 'none') {
    commentContainer.style.display = 'block';
    commentContainer.scrollIntoView({ behavior: 'smooth' });
  } else if (submitBtn) {
    commentContainer.style.display = 'none';
  }
};

const submitCommentHandler = async () => {
  const comment = document.querySelector('#commentInput').value.trim();
  const blogPostId = getBlogPostIdFromURL();

  try {
    const response = await fetch(`/api/comment/${blogPostId}`, {
      method: 'POST',
      body: JSON.stringify({ comment, blogId: blogPostId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = `/blogs/${blogPostId}`;
    } else {
      console.error('Error submitting comment:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting comment:', error.message);
  }
};

// Function to extract the blog post ID from the URL
const getBlogPostIdFromURL = () => {
  const currentURL = window.location.href;
  const splitURL = currentURL.split('/');
  const blogPostId = splitURL[splitURL.length - 1];
  return blogPostId;
};

commentBtn.addEventListener('click', commentFormHandler);
submitBtn.addEventListener('click', commentFormHandler);
submitBtn.addEventListener('click', submitCommentHandler);
