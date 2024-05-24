//Index Page menu selection
function onTabChange(oEvent, tabId) {
  let tabs = ["allArticles", "newest", "groupedArticles"];
  // let tabLinkBar = oEvent.target.parentElement.parentElement; //fetching ul element
  let tabLinkBar = document.querySelector(".indexPageMenu");

  tabs.forEach(function (tab) {
    let content = document.getElementById(tab + "-content");

    if (tab === tabId) {
      content.classList.add("active-content");
      tabLinkBar
        .querySelector('li[onclick*="' + tab + '"]')
        .classList.add("selectedTab");
    } else {
      content.classList.remove("active-content");
      tabLinkBar
        .querySelector('li[onclick*="' + tab + '"]')
        .classList.remove("selectedTab");
    }
  });

  if (oEvent) {
    const newURL =
      window.location.href.split("?")[0] + `?tab=${tabId.replace(/ /g, "_")}`;
    window.history.pushState({ tab: tabId.replace(/ /g, "_") }, "", newURL);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the tab parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");

  // Set the selected tab based on the tab parameter
  if (tabParam) {
    onTabChange("", tabParam);
  }
});

//Dropdown related code-----------------------------------------------------
function toggleDropdown(event) {
  //   event.stopPropagation();
  var dropdownMenu = event.currentTarget.nextElementSibling;
  dropdownMenu.classList.toggle("show");
}

function closeDropdown(event) {
  var dropdownMenu = document.querySelector(".format-dropdown-menu.show");

  if (dropdownMenu && !dropdownMenu.contains(event.target)) {
    // Clicked outside the dropdown, close it
    dropdownMenu.classList.remove("show");
  }
}

document.addEventListener("click", closeDropdown);

//Article tile click
function onArticleTileClick(htmlLink) {
  window.open(htmlLink, "_self");
}

// Task based articles ----------------------------------------------------
function onPressExpandAll(oEvent) {
  oEvent.target.classList.toggle("active");
  oEvent.target.nextElementSibling.classList.toggle("active");
  var accordions = document.querySelectorAll(".accordion-title");
  accordions.forEach(function (accordion) {
    expandAccordion(accordion);
  });
}

// Function to collapse all accordions
function onPressCollapseAll(oEvent) {
  oEvent.target.classList.toggle("active");
  oEvent.target.previousElementSibling.classList.toggle("active");
  var accordions = document.querySelectorAll(".accordion-title");
  accordions.forEach(function (accordion) {
    collapseAccordion(accordion);
  });
}

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

function onFilterAccordionClick(oEvent) {
  oEvent.stopPropagation();
}

function onFilterAccordionList(oEvent) {
  oEvent.stopPropagation();
  var filterInput = oEvent.target;
  var filterValue = filterInput.value.toUpperCase();
  var accordionContent = filterInput
    .closest(".accordion-item")
    .querySelector(".accordion-content");
  var listItems = accordionContent.querySelectorAll(".articleText a");
  var listItemsDescriptions = accordionContent.querySelectorAll(
    ".articleText .articleDescription"
  );

  var visibleArticlesCount = 0;

  // Loop through the list items and hide/show based on the filter
  for (var i = 0; i < listItems.length; i++) {
    var itemText = listItems[i].textContent || listItems[i].innerText;
    var itemDesc = listItemsDescriptions[i]?.innerText;

    // Case-insensitive comparison
    if (
      itemText.toUpperCase().indexOf(filterValue) > -1 ||
      itemDesc.toUpperCase().indexOf(filterValue) > -1
    ) {
      listItems[i].closest(".articleRow").style.display = "";
      visibleArticlesCount++;
    } else {
      listItems[i].closest(".articleRow").style.display = "none";
    }
  }

  if (!visibleArticlesCount) {
    accordionContent.querySelector(".no-match-text").style.display = "block";
  } else {
    accordionContent.querySelector(".no-match-text").style.display = "none";
  }
}

function onFilterAllArticlesList(oEvent) {
  oEvent.preventDefault();
  var filterInput = oEvent.target.parentElement.querySelector(".filterInput");
  var filterValue = filterInput.value.toUpperCase();
  var allArticlesContainer = filterInput.closest(".tab-content");
  var listItems = allArticlesContainer.querySelectorAll(".articleText a");
  var listItemsDescriptions = allArticlesContainer.querySelectorAll(
    ".articleText .articleDescription"
  );
  var visibleArticlesCount = 0;

  // Loop through the list items and hide/show based on the filter
  for (var i = 0; i < listItems.length; i++) {
    var itemText = listItems[i].textContent || listItems[i].innerText;
    var itemDesc = listItemsDescriptions[i]?.innerText;

    // Case-insensitive comparison
    if (
      itemText.toUpperCase().indexOf(filterValue) > -1 ||
      itemDesc.toUpperCase().indexOf(filterValue) > -1
    ) {
      listItems[i].closest(".articleRow").style.display = "flex";
      visibleArticlesCount++;
    } else {
      listItems[i].closest(".articleRow").style.display = "none";
    }
  }

  if (!visibleArticlesCount) {
    allArticlesContainer.querySelector(".no-match-text").style.display =
      "block";
  } else {
    allArticlesContainer.querySelector(".no-match-text").style.display = "none";
  }
}

function onFilterTRDAllSections(oEvent) {
  oEvent.preventDefault();
  var filterInput = oEvent.target.parentElement.querySelector(".filterInput");
  var filterValue = filterInput.value.toUpperCase();
  var visibleSections = 0;

  var mainContainer = filterInput.closest(".main-container");
  var articleSections = mainContainer.querySelectorAll(".section");

  Array.from(articleSections).forEach((section) => {
    var listItems = section.querySelectorAll(".articleText a");
    var listItemsDescriptions = section.querySelectorAll(
      ".articleText .articleDescription"
    );
    var sectionVisible = false;

    for (var i = 0; i < listItems.length; i++) {
      var itemText = listItems[i].textContent || listItems[i].innerText;
      var itemDesc = listItemsDescriptions[i]?.innerText;

      // Case-insensitive comparison
      if (
        itemText.toUpperCase().indexOf(filterValue) > -1 ||
        itemDesc.toUpperCase().indexOf(filterValue) > -1
      ) {
        listItems[i].closest(".articleRow").style.display = "flex";
        sectionVisible = true;
        visibleSections++;
      } else {
        listItems[i].closest(".articleRow").style.display = "none";
      }
    }

    if (sectionVisible) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });

  if (!visibleSections) {
    mainContainer.querySelector(".no-match-text").style.display = "block";
  } else {
    mainContainer.querySelector(".no-match-text").style.display = "none";
  }
}

function onArticleClick(oEvent) {
  let articleLink = oEvent.target
    .closest(".articleText")
    .getAttribute("data-article-link");
  location.href = articleLink;
}

function onBackToHome(oEvent) {
  //based on the current page set the tab on the home page
  // oEvent.preventDefault();
  // if (isSBP) {
  //   window.location.href = "../?tab=sbp";
  // } else if (isTRD) {
  //   window.location.href = "../?tab=trd";
  // } else {
  //   window.location.href = "../?tab=products";
  // }
}

// Walkthrough
document.addEventListener("DOMContentLoaded", function () {
  // Call the function to start the walkthrough
  if (!localStorage.getItem("walkthroughShownIndexPage")) {
    localStorage.setItem("walkthroughShownIndexPage", "true");
    startWalkthrough();
  }
});

function onStartIndexpageWalkthrough() {
  startWalkthrough();
}

function startWalkthrough() {
  // Show the walkthrough for each step

  var walkthroughSteps = [
    {
      element: "#all_articles_tab",
      content:
        "This list contains all documents published for this category/product.",
    },

    {
      element: "#newest_tab",
      content:
        "This list contains the most recently published or updated documents.",
    },
    {
      element: "#filter_by_tasks_tab",
      content:
        "Explore the articles based on the task you want to perform. Expand or collapse all task listings at once or use the > icons to expand just the selected one. Further, filter the grouped articles by keywords contained in the article title or description.",
    },
    {
      element: "#filter_by_products_tab",
      content:
        "Explore the articles related to a particular product. Expand or collapse all product listings at once or use the > icons to expand just the selected one. Further, filter the grouped articles by keywords contained in the article title or description.",
    },
    {
      element: "#all_articles_filter",
      content:
        "Filter the list of articles by keywords contained in the article title or description.",
    },
  ];

  showWalkthrough(0, walkthroughSteps);
}
