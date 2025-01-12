// Fetch and display lost and found items
const getLostItems = async () => {
  // Replace with API endpoints for fetching items
  const response = await fetch(
    "http://localhost:5000/lost-and-found/lost-item",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    const items = await response.json();
    console.log(items);
    const lostItemsDiv = document.getElementById("lostItems");
    lostItemsDiv.innerHTML = ""; // Reset
    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                            <img src="${item.photo_url}" alt="${item.item_name}">
                            <h3>${item.item_name}</h3>
                            <p>${item.description}</p>
                            <p><strong>Contact:</strong> ${item.contact}</p>
                            <p><strong>Date Lost:</strong> ${item.date_lost}</p>
                            <p><strong>Location Lost:</strong> ${item.location_lost}</p>
                        `;
      lostItemsDiv.appendChild(card);
    });
  }
};

const getFoundItems = async () => {
  // Replace with API endpoints for fetching items
  const response = await fetch(
    "http://localhost:5000/lost-and-found/found-item",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    const items = await response.json();
    console.log(items);
    const foundItemsDiv = document.getElementById("foundItems");
    foundItemsDiv.innerHTML = ""; // Reset
    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                            <img src="${item.photo_url}" alt="${item.item_name}">
                            <h3>${item.item_name}</h3>
                            <p>${item.description}</p>
                            <p><strong>Contact:</strong> ${item.contact}</p>
                            <p><strong>Date Found:</strong> ${item.date_found}</p>
                            <p><strong>Location Found:</strong> ${item.location_found}</p>
                        `;
      foundItemsDiv.appendChild(card);
    });
  }
};

// Add item to the selected table
document.getElementById("addItemBtn").addEventListener("click", () => {
  const table = document.getElementById("table").value;
  const item_name = document.getElementById("item_name").value;
  const description = document.getElementById("description").value;
  const photo_url = document.getElementById("photo_url").value;
  const contact = document.getElementById("contact").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;

  if (!table) {
    document.getElementById("error").textContent = "Please select a table.";
    return;
  }

  const item = { item_name, description, photo_url, contact, date, location };

  // Replace with your API endpoint for adding items
  fetch(`/api/addItem?table=${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => {
    if (response.ok) {
      alert("Item added successfully!");
      fetchItems(); // Refresh items
    } else {
      alert("Failed to add item.");
    }
  });
});

// Initial fetch
getLostItems();
getFoundItems();
