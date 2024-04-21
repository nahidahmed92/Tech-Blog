const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
