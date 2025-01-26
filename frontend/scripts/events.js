// Fetch and display events from the database
function fetchEvents() {
  // Replace with your API call to fetch events
  fetch("http://localhost:5000/events/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const eventsDiv = document.getElementById("events");
      // Reset events
      data.forEach((event) => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `
                            <h3>${event.event_name}</h3>
                            <p>${event.description}</p>
                            <p><strong>Date:</strong> ${event.date}</p>
                            <p><strong>Time:</strong> ${event.time}</p>
                            <p><strong>Location:</strong> ${event.street_or_house}, ${event.town}, ${event.district}, ${event.division}</p>
                            <p class="event-contact"><strong>Contact:</strong> ${event.contact_details}</p>
                        `;
        eventsDiv.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching events:", error));
}

// Add a new event to the database
document.getElementById("addEventBtn").addEventListener("click", () => {
  const event_name = document.getElementById("event_name").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const street_or_house = document.getElementById("street_or_house").value;
  const town = document.getElementById("town").value;
  const district = document.getElementById("district").value;
  const division = document.getElementById("division").value;
  const contact_details = document.getElementById("contact_details").value;

  const event = {
    event_name,
    description,
    date,
    time,
    street_or_house,
    town,
    district,
    division,
    contact_details,
  };

  // Replace with your API call to add the event
  fetch("/api/addEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (response.ok) {
        alert("Event added successfully!");
        fetchEvents(); // Refresh events
      } else {
        alert("Failed to add event.");
      }
    })
    .catch((error) => console.error("Error adding event:", error));
});

// Initial fetch of events
fetchEvents();
