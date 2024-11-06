//Walkthrough implementation

function showWalkthrough(stepIndex, walkthroughSteps, toNext, isIndexPage) {
  if (walkthroughSteps) {
    this.walkthroughSteps = walkthroughSteps;
  } else {
    walkthroughSteps = this.walkthroughSteps;
  }

  if (typeof isIndexPage === "boolean") {
    this.isIndexPage = isIndexPage;
  }

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

  // walkThroughDialog.showModal();

  var targetElement = walkthroughSteps[stepIndex].element;

  // if (!document.querySelector(targetElement) && toNext == undefined) {
  //   No first element -  End of the walkthrough
  //   return;
  // }

  if (!document.querySelector(targetElement)) {
    // toNext === "" for first element
    toNext || toNext === ""
      ? showWalkthrough(++walkThroughDialog.dataset.step, "", toNext)
      : showWalkthrough(--walkThroughDialog.dataset.step, "", toNext);
    return;
  }

  walkThroughDialog.showModal();
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

  // temp-fix
  if (
    stepIndex ==
    walkthroughSteps.length - 1
    // || (this.isIndexPage && stepIndex == walkthroughSteps.length - 2)
  ) {
    walkThroughDialog.querySelector("#dialogNextButton").style.visibility =
      "hidden";
    walkThroughDialog.querySelector("#dialogCloseButton").style.display =
      "block";
  } else {
    walkThroughDialog.querySelector("#dialogNextButton").style.visibility =
      "visible";
    walkThroughDialog.querySelector("#dialogCloseButton").style.display =
      "none";
  }
}

function showNextWalkthroughStep(oEvent) {
  var walkThroughDialog = oEvent.target.closest("#walkThroughDialog");
  walkThroughDialog.close();
  showWalkthrough(++walkThroughDialog.dataset.step, "", true);
}

function showPreviousWalkthroughStep(oEvent) {
  var walkThroughDialog = oEvent.target.closest("#walkThroughDialog");
  walkThroughDialog.close();
  showWalkthrough(--walkThroughDialog.dataset.step, "", false);
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

  if (
    elementRect.top > document.documentElement.clientHeight ||
    elementRect.top < 0
  ) {
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
