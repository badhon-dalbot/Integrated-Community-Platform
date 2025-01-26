// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModalFn();
  }
});

// Function to create item card
function createItemCard(item) {
  const card = document.createElement("div");
  card.className = "item-card";
  card.dataset.category = item.category;
  card.innerHTML = `
          <img src="${item.photo_url}" alt="${
    item.item_name
  }" class="item-image">
          <div class="item-info">
              <h3 class="item-title">${item.item_name}</h3>
              <p class="item-price">$${item.price.toFixed(2)}</p>
              <p class="item-category">${
                item.category.charAt(0).toUpperCase() + item.category.slice(1)
              }</p>
          </div>
      `;
  return card;
}

// Function to filter items
function filterItems(category) {
  console.log(category);
  const items = document.querySelectorAll(".item-card");
  items.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

const getCategories = async () => {
  const response = await fetch(`http://localhost:5000/buy-sell/categories`);
  if (response.ok) {
    const categories = await response.json();
    console.log(categories);

    const allButton = document.createElement("button");
    allButton.innerText = "All Products";
    allButton.classList.add("active");
    allButton.dataset.category = "all";
    categoryList.appendChild(allButton);

    categories.forEach((category) => {
      const li = document.createElement("li");
      li.innerHTML = ` <button class="category-btn" data-category="${category.category}">
              ${category.category} ${category.item_count}
            </button>`;

      document.getElementById("categoryList").appendChild(li);
    });
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active state
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter items by category
        filterItems(button.dataset.category);
      });
    });
  } else {
    console.error("Failed to fetch data");
  }
};
getCategories();

const getBuyAndSellItems = async () => {
  const response = await fetch(`http://localhost:5000/buy-sell/`);
  if (response.ok) {
    const items = await response.json();
    const itemsGrid = document.getElementById("itemsGrid");
    items.forEach((item) => {
      itemsGrid.appendChild(createItemCard(item));
    });
  } else {
    console.error("Failed to fetch data");
  }
};

console.log(localStorage.getItem("username"));

getBuyAndSellItems();

// Add demo items

// Form submission
document.getElementById("sellForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newItem = {
    user_id: localStorage.getItem("username"),
    item_name: document.getElementById("itemName").value,
    description: document.getElementById("itemDescription").value,
    category: document.getElementById("itemCategory").value,
    price: parseFloat(document.getElementById("itemPrice").value),
    photo_url: document.getElementById("itemPhotoUrl").value,
    location: document.getElementById("itemLocation").value,
    contact: document.getElementById("itemContact").value,
  };
  try {
    const response = await fetch("http://localhost:5000/buy-sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
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

  itemsGrid.insertBefore(createItemCard(newItem), itemsGrid.firstChild);
  //   this.reset();
  closeModalFn();
});
