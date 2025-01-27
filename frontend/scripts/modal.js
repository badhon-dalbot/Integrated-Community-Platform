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
