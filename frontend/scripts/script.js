const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const showRegisterLink = document.getElementById("show-register");
const showLoginLink = document.getElementById("show-login");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginSection.style.display = "none";
  registerSection.style.display = "block";
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  registerSection.style.display = "none";
  loginSection.style.display = "block";
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // console.log(localStorage.getItem("token"));
      // alert("Login successful!");
      localStorage.setItem("username", data.user.username);
      window.location.href = `http://127.0.0.1:5500/frontend/user-dashboard.html?username=${encodeURIComponent(
        username
      )}`;
      // Redirect to profile page after successful login
    } else {
      // Display login failed message (this will trigger when the response is not OK)
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Collecting form data
  const userData = {
    username: document.getElementById("reg-username").value,
    name: document.getElementById("reg-name").value,
    phonenumber: document.getElementById("reg-phone").value,
    email: document.getElementById("reg-email").value,
    city: document.getElementById("city").value,
    district: document.getElementById("district").value,
    division: document.getElementById("division").value,
    password: document.getElementById("reg-password").value,
  };

  console.log(userData);

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert("Registration successful! Please login.");
      // Hide registration section and show login section
      registerSection.style.display = "none";
      loginSection.style.display = "block";
    } else {
      const errorResponse = await response.json(); // Read the error message from response
      alert(errorResponse.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});
