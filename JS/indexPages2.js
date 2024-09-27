// Sort article list -------------------------------------------------------
function onSortDocuments(oEvent) {
  let selectedOption = oEvent.target.value;
  let articleTilesContainer = document.querySelector(".articleTilesContainer");
  let docRows = Array.from(
    articleTilesContainer.querySelectorAll(".articleRow")
  );
  let rearrangedDocRows = [];
  if (selectedOption === "Alphabetically") {
    // ascending order
    docRows.sort((a, b) =>
      a
        .querySelector(".articleTitle")
        .innerText.localeCompare(b.querySelector(".articleTitle").innerText)
    );
  } else if (selectedOption === "Newest") {
    //descending order
    docRows.sort((a, b) =>
      b
        .querySelector(".date-modified")
        .innerText.localeCompare(a.querySelector(".date-modified").innerText)
    );
  } else if (selectedOption === "Popular") {
    // ascending order
    docRows.sort(
      (a, b) => a.getAttribute("data-rank") - b.getAttribute("data-rank")
    );
  }
  articleTilesContainer.innerHTML = "";
  docRows.forEach((articleRow) =>
    articleTilesContainer.appendChild(articleRow)
  );
}

// Filtering ---------------------------------------------------
function onApplyFilters() {
  let topicFilter = document.querySelector("#topic-select")?.value;
  let productFilter = document.querySelector("#product-select")?.value;
  let docTypeFilter = document.querySelector("#doctype-select")?.value;
  let keyword =
    document.querySelector("#type-filter").value?.toUpperCase() || "";
  let visibleDocCount = 0;

  let documentRowsContainer = document.querySelector("#allArticles-content ");
  let documentRows = documentRowsContainer.querySelectorAll(".articleRow");

  documentRows.forEach((documentRow) => {
    let topics =
      JSON.parse(documentRow.getAttribute("data-topics").replace(/'/g, '"')) ||
      [];
    let products =
      JSON.parse(
        documentRow.getAttribute("data-products").replace(/'/g, '"')
      ) || [];
    let docTypes =
      JSON.parse(
        documentRow.getAttribute("data-doctypes").replace(/'/g, '"')
      ) || [];

    let title = documentRow
      .querySelector(".articleTitle")
      .innerText.toUpperCase();
    let description = documentRow
      .querySelector(".articleDescription")
      .innerText.toUpperCase();
    let appliesToText =
      documentRow.querySelector(".applies-to-text")?.innerText.toUpperCase() ||
      "";

    let show = true;

    if (
      topicFilter &&
      !(topicFilter === "All" || topics.includes(topicFilter))
    ) {
      show = false;
    }

    if (
      productFilter &&
      !(productFilter == "All" || products.includes(productFilter))
    ) {
      show = false;
    }

    if (
      docTypeFilter &&
      !(docTypeFilter == "All" || docTypes.includes(docTypeFilter))
    ) {
      show = false;
    }

    if (
      title.indexOf(keyword) > -1 ||
      description.indexOf(keyword) > -1 ||
      appliesToText.indexOf(keyword) > -1
    ) {
      show = show && true;
    } else {
      show = false;
    }

    if (show) {
      documentRow.style.display = "flex";
      visibleDocCount++;
    } else {
      documentRow.style.display = "none";
    }
  });

  if (!visibleDocCount) {
    documentRowsContainer.querySelector(".no-match-text").style.display =
      "block";
  } else {
    documentRowsContainer.querySelector(".no-match-text").style.display =
      "none";
  }

  documentRowsContainer.querySelector(".article-count").innerText =
    visibleDocCount;
}

/*function onApplyFiltersO() {
  let topicFilter = document.querySelector("#topic-select")?.value;
  let productFilter = document.querySelector("#product-select")?.value;
  let docTypeFilter = document.querySelector("#doctype-select")?.value;
  let keyword =
    document.querySelector("#type-filter").value?.toUpperCase() || "";
  let visibleDocCount = 0;

  let documentRowsContainer = document.querySelector("#allArticles-content ");
  let documentRows = documentRowsContainer.querySelectorAll(".articleRow");

  documentRows.forEach((documentRow) => {
    let topics =
      JSON.parse(documentRow.getAttribute("data-topics").replace(/'/g, '"')) ||
      [];
    let products =
      JSON.parse(
        documentRow.getAttribute("data-products").replace(/'/g, '"')
      ) || [];
    let docTypes =
      JSON.parse(
        documentRow.getAttribute("data-doctypes").replace(/'/g, '"')
      ) || [];

    let title = documentRow
      .querySelector(".articleTitle")
      .innerText.toUpperCase();
    let description = documentRow
      .querySelector(".articleDescription")
      .innerText.toUpperCase();
    let appliesToText =
      documentRow.querySelector(".applies-to-text")?.innerText.toUpperCase() ||
      "";

    let show = false;

    if (
      !topicFilter ||
      (topicFilter && (topicFilter === "All" || topics.includes(topicFilter)))
    ) {
      show = true;
    }

    if (
      productFilter &&
      (productFilter == "All" || products.includes(productFilter))
    ) {
      show = show && true;
    } else if (productFilter) {
      show = false;
    }

    if (
      (docTypeFilter && docTypeFilter == "All") ||
      docTypes.includes(docTypeFilter)
    ) {
      show = show && true;
    } else if (docTypeFilter) {
      show = false;
    }

    if (
      title.indexOf(keyword) > -1 ||
      description.indexOf(keyword) > -1 ||
      appliesToText.indexOf(keyword) > -1
    ) {
      show = show && true;
    } else {
      show = false;
    }

    if (show) {
      documentRow.style.display = "flex";
      visibleDocCount++;
    } else {
      documentRow.style.display = "none";
    }
  });

  if (!visibleDocCount) {
    documentRowsContainer.querySelector(".no-match-text").style.display =
      "block";
  } else {
    documentRowsContainer.querySelector(".no-match-text").style.display =
      "none";
  }

  documentRowsContainer.querySelector(".article-count").innerText =
    visibleDocCount;
}
*/

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

  allArticlesContainer.querySelector(".article-count").innerText =
    visibleArticlesCount;
}

function onFilterTRDAllSections(oEvent) {
  oEvent.preventDefault();
  var filterInput = oEvent.target.parentElement.querySelector(".filterInput");
  var filterValue = filterInput.value.toUpperCase();
  var visibleSections = 0;
  var visibleArticlesCount = 0;

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
        visibleArticlesCount++;
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

  mainContainer.querySelector(".article-count").innerText =
    visibleArticlesCount;
}

function onArticleClick(oEvent) {
  let articleLink = oEvent.target
    .closest(".articleRow")
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
      element: "#sort-select",
      content: translations["sort-walkthrough"],
    },

    {
      element: "#topic-select",
      content: translations["topic-walkthrough"],
    },
    {
      element: "#product-select",
      content: translations["products-walkthrough"],
    },
    {
      element: "#doctype-select",
      content: translations["doc-type-walkthrough"],
    },
    {
      element: "#type-filter",
      content: translations["filter-as-you-type-walkthrough"],
    },
  ];

  showWalkthrough(0, walkthroughSteps, "", true);
}

function startWalkthroughOld() {
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

  showWalkthrough(0, walkthroughSteps, "", true);
}
