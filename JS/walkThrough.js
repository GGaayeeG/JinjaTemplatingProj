//Walkthrough implementation
document.addEventListener("DOMContentLoaded", function () {
  // Call the function to start the walkthrough
  if (!sessionStorage.getItem("walkthroughShown")) {
    sessionStorage.setItem("walkthroughShown", "true");
    startWalkthrough();
  }
});

function startWalkthrough() {
  // Show the walkthrough for each step
  showWalkthrough(0);
}

function showWalkthrough(stepIndex) {
  var walkthroughSteps = [
    {
      element: "#searchform",
      content:
        "Use the global search to search for keywords across the entire SUSE documentation. The search results can further be filtered using product, version and category filters",
    },
    {
      element: "#prod_solution_tab",
      content:
        "Select this tab to get the documentation of various SUSE products and solutions.You can also use the sorting options to sort the products and solutions tiles. ",
    },
    {
      element: "#sbp_tab",
      content:
        "Select this tab to find SUSE best practises across different categories. ",
    },
    {
      element: "#trd_tab",
      content:
        "Select this tab to get the technical reference documents for different partners. The alphabet bar in the section can be used to sort the partner list . ",
    },
    {
      element: "#newest_tab",
      content:
        "Select this tab to find the newest articles on the SUSE documentation website ",
    },
    {
      element: "#popular_tab",
      content:
        "Select this tab to find the most popular articles on the SUSE documentation website ",
    },
    {
      element: "#featured_tab",
      content: "Find the featured articles here",
    },
  ];

  if (stepIndex >= walkthroughSteps.length || stepIndex < 0) {
    // End of the walkthrough
    return;
  }

  var step = walkthroughSteps[stepIndex];

  // Display a popup or tooltip for the current step
  var walkThroughDialog = document.getElementById("walkThroughDialog");

  walkThroughDialog.querySelector("p").innerText =
    walkthroughSteps[stepIndex].content;
  walkThroughDialog.dataset.step = stepIndex;

  walkThroughDialog.showModal();

  var targetElement = walkthroughSteps[stepIndex].element;
  walkThroughDialog.style.left = getWalkthroughDialogCoordinates(
    targetElement,
    walkThroughDialog
  ).left;
  walkThroughDialog.style.top = getWalkthroughDialogCoordinates(
    targetElement,
    walkThroughDialog
  ).top;

  if (stepIndex == 0) {
    walkThroughDialog.querySelector("#dialogPrevButton").style.visibility =
      "hidden";
  } else {
    walkThroughDialog.querySelector("#dialogPrevButton").style.visibility =
      "visible";
  }

  if (stepIndex == walkthroughSteps.length - 1) {
    walkThroughDialog.querySelector("#dialogNextButton").style.visibility =
      "hidden";
  } else {
    walkThroughDialog.querySelector("#dialogNextButton").style.visibility =
      "visible";
  }
}

function showNextWalkthroughStep(oEvent) {
  var walkThroughDialog = oEvent.target.closest("#walkThroughDialog");
  walkThroughDialog.close();
  showWalkthrough(++walkThroughDialog.dataset.step);
}

function showPreviousWalkthroughStep(oEvent) {
  var walkThroughDialog = oEvent.target.closest("#walkThroughDialog");
  walkThroughDialog.close();
  showWalkthrough(--walkThroughDialog.dataset.step);
}

function closeWalkThroughDialog(oEvent) {
  var walkThroughDialog = oEvent.target.closest("#walkThroughDialog");
  walkThroughDialog.close();
}

function getWalkthroughDialogCoordinates(targetElementID, dialog) {
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;

  // Get element dimensions
  const targetElement = document.querySelector(targetElementID);
  const elementRect = targetElement.getBoundingClientRect();

  if (elementRect.top > document.documentElement.clientHeight) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Calculate center coordinates using tile dimensions and scroll offset
  let centerX =
    elementRect.left +
    elementRect.width / 2 -
    dialog.offsetWidth / 2 +
    scrollX +
    "px";
  let centerY = elementRect.top + elementRect.height / 2 + scrollY + 16 + "px";

  return { left: centerX, top: centerY };
}
