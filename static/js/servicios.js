document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-button");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      card.classList.toggle("visible");
      if (card.classList.contains("visible")) {
        button.textContent = "-";
      } else {
        button.textContent = "+";
      }
    });
  });
});
