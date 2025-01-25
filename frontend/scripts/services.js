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

// Demo services data
const demoServices = [
  {
    user_id: "12345",
    service_name: "Expert Plumbing Services",
    description:
      "Professional plumber with 10+ years of experience. Available for repairs, installations, and maintenance.",
    category: "plumbing",
    price: 75,
    photo_url: "/placeholder.svg?height=200&width=300",
    location: "New York, NY",
  },
  {
    user_id: "67890",
    service_name: "Electrical Repairs and Installations",
    description:
      "Licensed electrician offering a wide range of electrical services for residential and commercial properties.",
    category: "electrical",
    price: 85,
    photo_url: "/placeholder.svg?height=200&width=300",
    location: "Los Angeles, CA",
  },
  {
    user_id: "24680",
    service_name: "Professional House Cleaning",
    description:
      "Thorough and efficient house cleaning services. Eco-friendly products used upon request.",
    category: "cleaning",
    price: 30,
    photo_url: "/placeholder.svg?height=200&width=300",
    location: "Chicago, IL",
  },
  {
    user_id: "13579",
    service_name: "Math and Science Tutoring",
    description:
      "Experienced tutor offering personalized lessons in mathematics and sciences for high school and college students.",
    category: "tutoring",
    price: 40,
    photo_url: "/placeholder.svg?height=200&width=300",
    location: "Boston, MA",
  },
];

// Function to create service card
function createServiceCard(service) {
  const card = document.createElement("div");
  card.className = "service-card";
  card.dataset.category = service.category;
  card.innerHTML = `
          <img src="${service.photo_url}" alt="${
    service.service_name
  }" class="service-image">
          <div class="service-info">
              <h3 class="service-title">${service.service_name}</h3>
              <p class="service-price">$${service.price.toFixed(2)} per hour</p>
              <p class="service-category">${
                service.category.charAt(0).toUpperCase() +
                service.category.slice(1)
              }</p>
              <p class="service-location">${service.location}</p>
          </div>
      `;
  return card;
}

// Function to filter services
function filterServices(category) {
  const services = document.querySelectorAll(".service-card");
  services.forEach((service) => {
    if (category === "all" || service.dataset.category === category) {
      service.style.display = "block";
    } else {
      service.style.display = "none";
    }
  });
}

// Add demo services
const servicesGrid = document.getElementById("servicesGrid");
demoServices.forEach((service) => {
  servicesGrid.appendChild(createServiceCard(service));
});

// Category filter functionality
const categoryButtons = document.querySelectorAll(".category-list button");
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active state
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter services
    filterServices(button.dataset.category);
  });
});

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
