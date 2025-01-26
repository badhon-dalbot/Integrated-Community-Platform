// Modal functionality
const modal = document.getElementById("serviceModal");
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

const getAndRenderCategories = async () => {
  try {
    const response = await fetch("http://localhost:5000/services/categories");
    categories = await response.json();
    console.log(categories);
    categoryList.innerHTML = ""; // Clear existing categories

    // Add 'All Services' button
    const allButton = document.createElement("button");
    allButton.innerText = "All Services";
    allButton.classList.add("active");
    allButton.dataset.category = "all";
    categoryList.appendChild(allButton);

    // Add individual category buttons
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.innerText = `${category.category} (${category.item_count})`;
      button.dataset.category = category.category;
      categoryList.appendChild(button);
    });
    const categoryButtons = document.querySelectorAll("#categoryList button");
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active state
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter services
        filterServices(button.dataset.category);
      });
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    alert("Failed to load services. Please try again later.");
  }
};
getAndRenderCategories();

const getServices = async () => {
  const response = await fetch("http://localhost:5000/services");
  const servicesData = await response.json();
  const servicesTable = document.getElementById("servicesTable");
  servicesTable.innerHTML = ""; // Clear existing services
  servicesData.forEach((service) => {
    servicesTable.appendChild(createServiceCard(service));
  });
};
getServices();
// Function to create service card
function createServiceCard(service) {
  console.log(service);
  const tr = document.createElement("tr");
  tr.dataset.category = service.service_type;
  tr.innerHTML = `
           <td>${service.service_id}</td>
           <td>${service.service_provider_name}</td>
           <td>${service.contact}</td>
        <td>${service.service_type}</td>
        <td>${service.average_rating || "N/A"}</td>
        <td>${service.review_count || 0}</td>
        <td>${service.latest_review_comment || "No reviews yet"}</td>
        <td>${service.latest_review_rating || "N/A"}</td>
        
      `;
  return tr;
}

// Function to filter services
function filterServices(category) {
  const rows = document.querySelectorAll("#servicesTable tr");
  rows.forEach((row) => {
    const rowCategory = row.dataset.category;
    console.log(row);
    console.log(rowCategory);
    console.log(category);
    if (category === "all" || rowCategory === category) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Add demo services

// Form submission
document.getElementById("serviceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newService = {
    user_id: document.getElementById("userId").value,
    service_name: document.getElementById("serviceName").value,
    description: document.getElementById("serviceDescription").value,
    category: document.getElementById("serviceCategory").value,
    price: parseFloat(document.getElementById("servicePrice").value),
    photo_url: document.getElementById("servicePhotoUrl").value,
    location: document.getElementById("serviceLocation").value,
  };

  servicesGrid.insertBefore(
    createServiceCard(newService),
    servicesGrid.firstChild
  );
  this.reset();
  closeModalFn();
});
