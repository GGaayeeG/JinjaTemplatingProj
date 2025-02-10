window.addEventListener("load", function (event) {
  if (this.document.querySelector(".filters-bar")) {
    // onApplyFilters();
    // onSortDocuments();
  }
});

// Sort article list -------------------------------------------------------
function onSortDocuments(oEvent) {
  let selectedOption = document.getElementById("sort-select").value;
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
  let langFilter = document.querySelector("#lang-select")?.value;
  let keyword =
    document.querySelector("#type-filter").value?.toUpperCase() || "";
  let visibleDocCount = 0;

  let documentRowsContainer = document.querySelector("#allArticles-content");
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
    documentRowsContainer.querySelector(".no-match-text").style.display =
      "block";
  } else {
    documentRowsContainer.querySelector(".no-match-text").style.display =
      "none";
  }

  documentRowsContainer.querySelector(".article-count").innerText =
    visibleDocCount;
}

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
