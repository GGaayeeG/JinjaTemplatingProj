// Function to handle individual accordion click
function onAccordionTileClick(oEvent) {
  let accordion = oEvent.target.closest(".accordion-title");
  var isActive = accordion.classList.contains("active");
  if (isActive) {
    collapseAccordion(accordion);
  } else {
    expandAccordion(accordion);
  }
}

// Helper function to expand an accordion
function expandAccordion(accordion) {
  accordion.classList.add("active");
  var content = accordion.nextElementSibling;
  content.style.display = "block";
}

// Helper function to collapse an accordion
function collapseAccordion(accordion) {
  accordion.classList.remove("active");
  var content = accordion.nextElementSibling;
  content.style.display = "none";
}
