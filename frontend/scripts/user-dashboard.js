const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  return username;
};
const username = getQueryParams();
localStorage.setItem("username", username);
const fetchUserProfile = async () => {
  console.log("username", username);

  const response = await fetch(
    `http://localhost:5000/user/profile/${username}`
    // {
    //   method: "GET",
    //   // headers: { Authorization: "Bearer " + getCookie("token") },
    //   headers: { "Content-Type": "application/json" },
    // }
  );
  if (response.ok) {
    const userData = await response.json();
    const date = new Date(userData.user?.time);
    document.getElementById("user-name").textContent = userData.user?.username;
    document.getElementById("profile-name").textContent =
      userData.user?.fullName;
    document.getElementById("profile-email").textContent = userData.user?.email;
    document.getElementById("member-since").textContent =
      date.toLocaleDateString("en-GB");

    // Update activity counts
    document.getElementById(
      "lost-found-count"
    ).textContent = `${userData.activities.lostAndFound} items`;
    document.getElementById(
      "marketplace-count"
    ).textContent = `${userData.activities.marketplace} listings`;
    document.getElementById(
      "alerts-count"
    ).textContent = `${userData.activities.alerts} active`;
    document.getElementById(
      "events-count"
    ).textContent = `${userData.activities.events} attending`;
  } else {
    console.error("Failed to fetch user profile");
    // localStorage.removeItem("token");
    // window.location.href = "http:127.0.0.1:5500/frontend/index.html";
  }
};

fetchUserProfile();

// Event listeners for buttons and links
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("username");
  sessionStorage.removeItem("username");
  window.location.href = "http://localhost:5000";
});

document
  .getElementById("edit-profile-btn")
  .addEventListener("click", function () {
    window.location.href = `/frontend/profile.html?username=${encodeURIComponent(
      username
    )}`;
  });

const quickAccessLinks = [
  "lost-found",
  "marketplace",
  "emergency",
  "events",
  "services",
];
quickAccessLinks.forEach((linkId) => {
  document.getElementById(linkId).addEventListener("click", function (e) {
    e.preventDefault();
    // alert(`Navigate to ${this.querySelector("h3").textContent} page`);
    console.log(this.querySelector("h3").textContent);
    window.location.href = `http://127.0.0.1:5500/frontend/${linkId}.html`;
  });
});
