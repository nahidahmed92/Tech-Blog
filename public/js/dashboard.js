const newPostBtn = document.querySelector('#newPostBtn');
const createBtn = document.querySelector('#createBtn');

const dbFormHandler = async (event) => {
  event.preventDefault();
  const dbContainer = document.querySelector('#dashboardContainer');

  if (dbContainer.style.display === 'none') {
    dbContainer.style.display = 'block';
  } else if (createBtn) {
    dbContainer.style.display = 'none';
  }
};
// const dbTitle = document.querySelector('#dashboard-title').value.trim();
// const dbContent = document.querySelector('#dashboard-content').value.trim();

newPostBtn.addEventListener('click', dbFormHandler);
createBtn.addEventListener('click', dbFormHandler);
