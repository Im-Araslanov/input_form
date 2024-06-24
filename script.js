document.addEventListener("DOMContentLoaded", function() {
  const switchToLoginLink = document.getElementById("switch-to-login");
  const switchToRegisterLink = document.getElementById("switch-to-register");
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  switchToLoginLink.addEventListener("click", function() {
      registerForm.classList.remove("active");
      loginForm.classList.add("active");
  });

  switchToRegisterLink.addEventListener("click", function() {
      loginForm.classList.remove("active");
      registerForm.classList.add("active");
  });

  document.getElementById("register").addEventListener("submit", function(event) {
      event.preventDefault();
      
      const emailField = document.getElementById("register-email");
      const passwordField = document.getElementById("register-password");
      const subscribeCheckbox = document.getElementById("subscribe-newsletter");

      clearErrors([emailField, passwordField, subscribeCheckbox]);

      let hasError = false;

      if (!emailField.value) {
          showError(emailField, document.querySelector('.regist-mail'), "Поле обязательно для заполнения");
          hasError = true;
      } else if (!validateEmail(emailField.value)) {
          showError(emailField, document.querySelector('.regist-mail'), "Некорректный email");
          hasError = true;
      }

      if (!passwordField.value) {
          showError(passwordField, document.querySelector('.regist-pass'), "Поле обязательно для заполнения");
          hasError = true;
      } else if (!validatePassword(passwordField.value)) {
          showError(passwordField, document.querySelector('.regist-pass'), "Пароль должен содержать минимум 8 символов");
          hasError = true;
      }

      if (!subscribeCheckbox.checked) {
          showError(subscribeCheckbox, document.querySelector('.sub-newsletter'), "Необходимо согласиться на получение обновлений");
          hasError = true;
      }

      if (hasError) {
          return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ email: emailField.value, password: passwordField.value, subscribe: subscribeCheckbox.checked });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Регистрация успешна");
      document.getElementById("register").reset();
  });

  document.getElementById("login").addEventListener("submit", function(event) {
      event.preventDefault();
      
      const emailField = document.getElementById("login-email");
      const passwordField = document.getElementById("login-password");

      clearErrors([emailField, passwordField]);

      let hasError = false;

      if (!emailField.value) {
          showError(emailField, document.querySelector('.log-mail'), "Поле обязательно для заполнения");
          hasError = true;
      } else if (!validateEmail(emailField.value)) {
          showError(emailField, document.querySelector('.log-mail'), "Некорректный email");
          hasError = true;
      }

      if (!passwordField.value) {
          showError(passwordField, document.querySelector('.log-password'), "Поле обязательно для заполнения");
          hasError = true;
      } else if (!validatePassword(passwordField.value)) {
          showError(passwordField, document.querySelector('.log-password'), "Пароль должен содержать минимум 8 символов");
          hasError = true;
      }

      if (hasError) {
          return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(user => user.email === emailField.value && user.password === passwordField.value);

      if (user) {
          alert("Авторизация успешна");
          window.location.href = "main.html";
      } else {
          showError(emailField, document.querySelector('.log-mail'), "Email или пароль неверный");
          showError(passwordField, document.querySelector('.log-password'), "Email или пароль неверный");
      }
  });
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function showError(element, labelElement, message) {
  element.classList.add("error");
  labelElement.classList.add("label-error");
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.innerText = message;
  element.parentNode.insertBefore(errorMessage, element.nextSibling);
  errorMessage.style.display = "block";
}

function clearErrors(elements) {
  elements.forEach(element => {
      element.classList.remove("error");
      const labelElement = element.parentNode.querySelector('label');
      if (labelElement) {
          labelElement.classList.remove("label-error");
      }
      const errorMessages = element.parentNode.querySelectorAll(".error-message");
      errorMessages.forEach(errorMessage => errorMessage.remove());
  });
}
