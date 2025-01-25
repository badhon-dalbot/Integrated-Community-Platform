// Modal functionality
const modal = document.getElementById("sellModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.getElementById("closeModal");

function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModalFn() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

openModalBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalFn);

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFn();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModalFn();
  }
});

const getCategories = async () => {
  const response = await fetch(`http://localhost:5000/buy-sell/categories`);
  if (response.ok) {
    const categories = await response.json();
    console.log(categories);
    categories.forEach((category) => {
      const li = document.createElement("li");
      li.innerHTML = ` <button class="active" data-category="all">
              ${category.category} ${category.item_count}
            </button>`;

      document.getElementById("categoryList").appendChild(li);
    });
  } else {
    console.error("Failed to fetch data");
    // localStorage.removeItem("token");
    // window.location.href = "http:127.0.0.1:5500/frontend/index.html";
  }
};
getCategories();

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
  const items = document.querySelectorAll(".item-card");
  items.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

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
    // localStorage.removeItem("token");
    // window.location.href = "http:127.0.0.1:5500/frontend/index.html";
  }
};

console.log(localStorage.getItem("username"));

getBuyAndSellItems();

// Add demo items

// Category filter functionality
const categoryButtons = document.querySelectorAll(".category-list button");
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active state
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter items
    filterItems(button.dataset.category);
  });
});

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
