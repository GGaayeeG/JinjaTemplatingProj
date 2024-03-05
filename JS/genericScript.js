//scroll to the top functionality
window.onscroll = function () {
  scrollCheck(); // applying to all pages?
};

function scrollCheck() {
  let scrollToTopButton = document.querySelector(".go-to-top-button");
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

function onPressGoToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
