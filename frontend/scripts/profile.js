const logoutBtn = document.getElementById("logout-btn");

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  return username;
};
// Fetch user profile data
const getUserProfile = async () => {
  const username = getQueryParams();
  console.log(username);
  const response = await fetch(
    `http://localhost:5000/user/profile/${username}`
  );
  try {
    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      document.getElementById("reg-name").value = userData.user.name;
      document.getElementById("reg-username").value = userData.user.username;
      document.getElementById("reg-phone").value = userData.user.phonenumber;
      document.getElementById("reg-email").value = userData.user.email;
      document.getElementById("city").value = userData.user.city;
      document.getElementById("district").value = userData.user.district;
      document.getElementById("division").value = userData.user.division;
    } else {
      // Redirect to login page if the profile data cannot be fetched
      window.location.href = "http://localhost:5000";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to load profile. Please try again.");
  }
};

document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value;
    const fullName = document.getElementById("reg-name").value;
    const phoneNumber = document.getElementById("reg-phone").value;
    const email = document.getElementById("reg-email").value;
    const city = document.getElementById("city").value;
    const district = document.getElementById("district").value;
    const division = document.getElementById("division").value;
    const currentPassword = document.getElementById("password").value;
    const newPassword = document.getElementById("re-password").value;

    const userData = {
      username,
      fullName,
      phoneNumber,
      email,
      city,
      district,
      division,
      currentPassword,
      newPassword: newPassword || null, // Only send new password if provided
    };
    console.log(userData);
    try {
      const response = await fetch("http://localhost:5000/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

// Logout functionality
logoutBtn.addEventListener("click", async () => {
  try {
   localStorage.removeItem("username");
   sessionStorage.removeItem("username");
    window.location.href = "http://localhost:5000";
  
  } catch (error) {
    console.error("Error:", error);
    alert("Logout failed. Please try again.");
  }
});

getUserProfile();
