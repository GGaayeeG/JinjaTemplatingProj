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
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//Walkthrough
// document.addEventListener("DOMContentLoaded", function () {
//   let banner = document.getElementById("onetrust-banner-sdk");
//   if (banner) {
//     // Observe visibility of the cookie banner
//     const bannerObserver = new MutationObserver(() => {
//       // Check if banner is hidden (display: none)
//       if (window.getComputedStyle(banner).display === "none") {
//         checkWalkthrough(); // Show the dialog only once
//         bannerObserver.disconnect(); // Stop observing once shown
//       }
//     });

//     // Start observing the banner for display changes
//     bannerObserver.observe(banner, {
//       attributes: true, // Listen for changes in attributes like style
//       attributeFilter: ["style"], // Only observe 'style' attribute changes
//     });
//   } else {
//     checkWalkthrough();
//   }
// });
