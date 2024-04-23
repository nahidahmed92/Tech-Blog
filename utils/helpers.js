module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  blogPostId: () => {
    const currentURL = window.location.href;
    const splitURL = currentURL.split('/');
    const blogPostId = splitURL[splitURL.length - 1];
    return blogPostId;
  },
};
