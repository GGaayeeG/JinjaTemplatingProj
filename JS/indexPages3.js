window.addEventListener("load", function (event) {
  if (this.document.querySelector(".filters-bar")) {
    onSortDocuments();
    onApplyFilters();
  }
});

// Sort article list -------------------------------------------------------
function onSortDocuments(oEvent) {
  let selectedOption = document.getElementById("sort-select").value;
  let articleTilesContainerTOC = document.querySelector(
    ".articleTilesContainer.toc-view"
  );
  let articleTilesContainerGeneric = document.querySelector(
    ".articleTilesContainer:not(.toc-view)"
  );
  let filterBar = document.querySelector(".filters-bar");

  if (selectedOption === "Table of contents") {
    articleTilesContainerTOC.style.display = "block";
    articleTilesContainerGeneric.style.display = "none";
    filterBar.classList.add("toc-view");
  } else {
    let docRows = Array.from(
      articleTilesContainerTOC.querySelectorAll(".articleRow")
    );

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
    articleTilesContainerTOC.style.display = "none";
    articleTilesContainerGeneric.style.display = "block";
    filterBar.classList.remove("toc-view");
    articleTilesContainerGeneric.innerHTML = "";
    docRows.forEach((articleRow) => {
      let clone = articleRow.cloneNode(true);
      clone.style.display = "flex";
      articleTilesContainerGeneric.appendChild(clone);
    });
  }

  if (oEvent) {
    fnClearFilters();
  }
}

function fnClearFilters() {
  let topicFilter = document.querySelector("#topic-select");
  let productFilter = document.querySelector("#product-select");
  let docTypeFilter = document.querySelector("#doctype-select");
  //   let langFilter = document.querySelector("#lang-select");
  let typeFilter = document.querySelector("#type-filter");

  if (topicFilter) topicFilter.selectedIndex = 0;
  if (productFilter) productFilter.selectedIndex = 0;
  if (docTypeFilter) docTypeFilter.selectedIndex = 0;
  //   if (topicSelect) topicSelect.selectedIndex = 0;
  if (typeFilter) typeFilter.value = "";
  onApplyFilters();
}

// Filtering ---------------------------------------------------
function onApplyFilters() {
  let isTocView =
    document.querySelector(".articleTilesContainer.toc-view")?.style.display ==
    "block";

  if (isTocView) {
    onApplyFiltersToc();
  } else {
    onApplyFiltersNonToc();
  }
}

function onApplyFiltersNonToc() {
  let topicFilter = document.querySelector("#topic-select")?.value;
  let productFilter = document.querySelector("#product-select")?.value;
  let docTypeFilter = document.querySelector("#doctype-select")?.value;
  let langFilter = document.querySelector("#lang-select")?.value;
  let keyword =
    document.querySelector("#type-filter").value?.toUpperCase() || "";

  let visibleDocCount = 0;

  let mainContainer = document.querySelector("#allArticles-content");
  let articleTilesContainerTOC = document.querySelector(
    ".articleTilesContainer:not(.toc-view)"
  );
  let documentRows = articleTilesContainerTOC.querySelectorAll(".articleRow");

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
    let lang = documentRow.getAttribute("data-lang");

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

    if (langFilter && !(langFilter == "All" || langFilter === lang)) {
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
    mainContainer.querySelector(".no-match-text").style.display = "block";
  } else {
    mainContainer.querySelector(".no-match-text").style.display = "none";
  }

  mainContainer.querySelector(".article-count").innerText = visibleDocCount;
}

function onApplyFiltersToc() {
  //considering lang filter and type-filter
  var keyword =
    document.querySelector("#type-filter").value?.toUpperCase() || "";
  let langFilter = document.querySelector("#lang-select")?.value;

  var visibleSections = 0;
  var visibleArticlesCount = 0;

  let mainContainer = document.querySelector("#allArticles-content");
  let articleTilesContainerTOC = mainContainer.querySelector(
    ".articleTilesContainer.toc-view"
  );
  var articleSections = articleTilesContainerTOC.querySelectorAll(".section");

  Array.from(articleSections).forEach((section) => {
    var sectionHeader = section
      .querySelector(".section-header")
      .innerText?.toUpperCase()
      .trim();
    var listItems = section.querySelectorAll(".articleTitle");
    var listItemsDescriptions = section.querySelectorAll(
      ".articleText .articleDescription"
    );

    let sectionVisible = false;

    for (var i = 0; i < listItems.length; i++) {
      var itemText = (
        listItems[i].textContent || listItems[i].innerText
      )?.toUpperCase();
      var itemDesc = listItemsDescriptions[i]?.innerText?.toUpperCase();
      let lang = listItems[i].closest(".articleRow").getAttribute("data-lang");

      let show = true;

      if (langFilter && !(langFilter == "All" || langFilter === lang)) {
        show = false;
      }

      // Case-insensitive comparison
      if (
        itemText.indexOf(keyword) > -1 ||
        itemDesc.indexOf(keyword) > -1 ||
        sectionHeader.indexOf(keyword) > -1
      ) {
        show = show && true;
      } else {
        show = false;
      }

      if (show) {
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

// function onApplyFiltersToc() {
//   //considering lang filter and type-filter
//   var keyword =
//     document.querySelector("#type-filter").value?.toUpperCase() || "";
//   let langFilter = document.querySelector("#lang-select")?.value;

//   var visibleSections = 0;
//   var visibleArticlesCount = 0;

//   let mainContainer = document.querySelector("#allArticles-content");
//   let articleTilesContainerTOC = mainContainer.querySelector(
//     ".articleTilesContainer.toc-view"
//   );
//   var articleSections = articleTilesContainerTOC.querySelectorAll(".section");

//   Array.from(articleSections).forEach((section) => {
//     var sectionHeader = section.querySelector(".section-header").innerText;
//     var listItems = section.querySelectorAll(".articleTitle");
//     var listItemsDescriptions = section.querySelectorAll(
//       ".articleText .articleDescription"
//     );
//     var sectionVisible = false;

//     for (var i = 0; i < listItems.length; i++) {
//       var itemText = listItems[i].textContent || listItems[i].innerText;
//       var itemDesc = listItemsDescriptions[i]?.innerText;
//       let lang = listItems[i].closest(".articleRow").getAttribute("data-lang");

//       // Case-insensitive comparison
//       if (langFilter && !(langFilter == "All" || langFilter === lang)) {
//         listItems[i].closest(".articleRow").style.display = "none";
//       } else {
//         if (
//           itemText.toUpperCase().indexOf(keyword) > -1 ||
//           itemDesc.toUpperCase().indexOf(keyword) > -1 ||
//           sectionHeader.toUpperCase().indexOf(keyword) > -1
//         ) {
//           listItems[i].closest(".articleRow").style.display = "flex";
//           sectionVisible = true;
//           visibleSections++;
//           visibleArticlesCount++;
//         } else {
//           listItems[i].closest(".articleRow").style.display = "none";
//         }
//       }
//     }

//     if (sectionVisible) {
//       section.style.display = "block";
//     } else {
//       section.style.display = "none";
//     }
//   });

//   if (!visibleSections) {
//     mainContainer.querySelector(".no-match-text").style.display = "block";
//   } else {
//     mainContainer.querySelector(".no-match-text").style.display = "none";
//   }

//   mainContainer.querySelector(".article-count").innerText =
//     visibleArticlesCount;
// }

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

function onArticleClick(oEvent) {
  let articleLink = oEvent.target
    .closest(".articleRow")
    .getAttribute("data-article-link");
  location.href = articleLink;
}

function onBackToHome(oEvent) {}

// Walkthrough
document.addEventListener("DOMContentLoaded", function () {
  // Call the function to start the walkthrough
  // if (!localStorage.getItem("walkthroughShownIndexPage")) {
  //   localStorage.setItem("walkthroughShownIndexPage", "true");
  //   startWalkthrough();
  // }
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
      element: "#lang-select",
      content: translations["language-dropdown-walkthrough"],
    },
    {
      element: "#type-filter",
      content: translations["filter-as-you-type-walkthrough"],
    },
  ];

  showWalkthrough(0, walkthroughSteps, "", true);
}
