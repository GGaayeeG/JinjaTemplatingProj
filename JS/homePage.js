//Global search functionality
function onGlobalSearch(oEvent) {
  var searchInput = oEvent.target.querySelector("#search-input");
  var hiddenInput = oEvent.target.querySelector("#hidden-input");
  if (searchInput.value) {
    hiddenInput.value =
      searchInput.value + " inurl:/html/ -inurl:/single-html/";
  } else {
    oEvent.preventDefault();
  }
}

// Home page menu tab change
// function onTabChange(oEvent, tabId) {
//   let tabs = ["products", "sbp", "trd", "newest", "mostPopular"];
//   // let tabLinkBar = oEvent.target.parentElement.parentElement; //fetching ul element
//   let tabLinkBar = document.querySelector("#homepage-menu");

//   tabs.forEach(function (tab) {
//     let content = document.getElementById(tab + "-content");

//     if (tab === tabId) {
//       content.classList.add("active-content");
//       tabLinkBar
//         .querySelector('button[onclick*="' + tab + '"]')
//         .classList.add("selectedTab");
//     } else {
//       content.classList.remove("active-content");
//       tabLinkBar
//         .querySelector('button[onclick*="' + tab + '"]')
//         .classList.remove("selectedTab");
//     }

//     if (tabId === "products") {
//       tabLinkBar.querySelector(".sortingOptions").style.display = "inline";
//     } else {
//       tabLinkBar.querySelector(".sortingOptions").style.display = "none";
//     }
//   });

//   if (oEvent) {
//     const newURL =
//       window.location.href.split("?")[0] + `?tab=${tabId.replace(/ /g, "_")}`;
//     window.history.pushState({ tab: tabId.replace(/ /g, "_") }, "", newURL);
//   }
// }
function onTabChange(oEvent, tabId) {
  // let tabs = ["products", "sbp", "trd", "newest", "mostPopular"];
  let tabs = ["products", "sbp", "trd"];

  // let tabLinkBar = oEvent.target.parentElement.parentElement; //fetching ul element
  let tabLinkBar = document.querySelector("#homepage-menu");

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

    if (tabId === "products") {
      tabLinkBar.querySelector(".sortingOptions").style.display = "inline";
    } else {
      tabLinkBar.querySelector(".sortingOptions").style.display = "none";
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

isSortedAlphabetically = true;

// Sorting
function sortProductsAsc(oEvent) {
  if (isSortedAlphabetically) return;
  var cardsContainer = document.querySelector(".productsContainer");

  // Get all card elements
  let cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  // if (!this.cards) {
  //   this.cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  // }

  // Sort cards based on their title
  // let cardsSorted = this.cards.sort(function (a, b) {
  //   var titleA = a.querySelector(".tile-header").innerText.toUpperCase();
  //   var titleB = b.querySelector(".tile-header").innerText.toUpperCase();
  //   if (titleA < titleB) {
  //     return -1;
  //   } else if (titleA > titleB) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  let cardsSorted = cards.reverse();

  // Remove existing cards from the container
  cards.forEach(function (card) {
    cardsContainer.removeChild(card);
  });

  // Append sorted cards back to the container
  if (this.showAllProducts) {
    cardsSorted.forEach(function (card) {
      card.classList.remove("hiddenTile");
      cardsContainer.appendChild(card);
    });
  } else {
    cardsSorted.slice(0, 8).forEach(function (card) {
      card.classList.remove("hiddenTile");
      cardsContainer.appendChild(card);
    });
    cardsSorted.slice(8).forEach(function (card) {
      card.classList.add("hiddenTile");
      cardsContainer.appendChild(card);
    });
  }
  setSortingOptionStyling(oEvent);
  isSortedAlphabetically = true;
}

function sortProductsDesc(oEvent) {
  if (!isSortedAlphabetically) return;

  var cardsContainer = document.querySelector(".productsContainer");

  // Get all card elements
  let cards = Array.from(cardsContainer.querySelectorAll(".tile"));

  // Sort cards based on their title
  cardsSorted = cards.reverse();

  // Remove existing cards from the container
  cardsContainer.innerHTML = "";
  // cards.forEach(function (card) {
  //   cardsContainer.removeChild(card);
  // });

  // Append sorted cards back to the container
  if (this.showAllProducts) {
    cardsSorted.forEach(function (card) {
      card.classList.remove("hiddenTile");
      cardsContainer.appendChild(card);
    });
  } else {
    cardsSorted.slice(0, 8).forEach(function (card) {
      card.classList.remove("hiddenTile");
      cardsContainer.appendChild(card);
    });
    cardsSorted.slice(8).forEach(function (card) {
      card.classList.add("hiddenTile");
      cardsContainer.appendChild(card);
    });
  }
  setSortingOptionStyling(oEvent);
  isSortedAlphabetically = false;
}

function sortProductsByPopularity(oEvent) {
  var cardsContainer = document.querySelector(".productsContainer");

  // Get all card elements
  let cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  var originalCards = this.cards ? this.cards : cards;

  // Remove existing cards from the container
  cards.forEach(function (card) {
    cardsContainer.removeChild(card);
  });

  // Append sorted cards back to the container
  // originalCards.forEach(function (card) {
  //   cardsContainer.appendChild(card);
  // });

  if (this.showAllProducts) {
    originalCards.forEach(function (card) {
      card.classList.remove("hiddenTile");
      cardsContainer.appendChild(card);
    });
  } else {
    originalCards.slice(0, 8).forEach(function (card) {
      card.classList.remove("hiddenTile");
      cardsContainer.appendChild(card);
    });
    originalCards.slice(8).forEach(function (card) {
      card.classList.add("hiddenTile");
      cardsContainer.appendChild(card);
    });
  }

  setSortingOptionStyling(oEvent);
}

function setSortingOptionStyling(oEvent) {
  var sortingOptions = oEvent.target.closest(".sortingOptions");
  Array.from(sortingOptions.children).forEach((element) =>
    element.classList.remove("selectedSorting")
  );
  oEvent.target.classList.add("selectedSorting");
}

function onShowAllProducts(oEvent) {
  var showAllButton = oEvent.target.closest(".explore-list-button");
  var hideAllButton = showAllButton.nextElementSibling;
  showAllButton.classList.add("hideButton");
  hideAllButton.classList.remove("hideButton");

  this.showAllProducts = true;

  var cardsContainer = document.querySelector(".productsContainer");
  var cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  cards.slice(8).forEach((card) => card.classList.remove("hiddenTile"));
}

function onHideAllProducts(oEvent) {
  var hideAllButton = oEvent.target.closest(".explore-list-button");
  var showAllButton = hideAllButton.previousElementSibling;
  hideAllButton.classList.add("hideButton");
  showAllButton.classList.remove("hideButton");

  this.showAllProducts = false;

  var cardsContainer = document.querySelector(".productsContainer");
  var cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  cards.slice(8).forEach((card) => card.classList.add("hiddenTile"));
}

//Generic tile click
function onTileClick(oEvent, isTRD, isSBP) {
  let pointingUrl = oEvent.target.closest(".tile").dataset.pointingurl;
  let popoverItems = oEvent.target.closest(".tile").dataset.versions;

  if (pointingUrl) {
    window.open(pointingUrl, "_self");
  } else {
    var popoverTitle = "";
    if (isTRD) {
      popoverTitle = "Choose a documentation type to proceed";
    } else if (isSBP) {
      popoverTitle = "Choose a product to proceed";
    }
    setUpPopover(oEvent, popoverItems, popoverTitle);
  }
}

// Popover handling for products
function showVersionPopover(oEvent) {
  // Update popover content based on versions data

  if (oEvent.target.closest(".tile")?.dataset?.versions) {
    var versions = JSON.parse(oEvent.target.closest(".tile").dataset.versions);
  }

  if (versions && versions.length == 1) {
    //map to pointing URL...
    window.open(versions[0].pointingUrl, "_self");
    // window.open("./indexPage.html", "_self");
  } else {
    setUpPopover(oEvent, versions, "Choose a version to proceed");
  }
}

function setUpPopover(oEvent, versions, popoverTitle) {
  const popoverLogo = document.getElementById("popoverLogo");
  const popoverLabel = document.getElementById("popoverLabel");
  const popoverList = document.getElementById("popoverList");

  // Set the logo source
  // popoverLogo.src = "../assets/SUSElogo.png";

  // Set the label content
  popoverLabel.innerText = popoverTitle;

  // Clear previous list items
  popoverList.innerHTML = "";

  // Create list items based on versions data
  if (isValidJSON(versions)) {
    versions = JSON.parse(versions);
  }
  versions.forEach((versionObj) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    if (versionObj.pointingUrl) {
      link.href = versionObj.pointingUrl;
    } else {
      link.href = "./indexPage.html";
    }

    link.innerText = versionObj.label;
    listItem.appendChild(link);
    popoverList.appendChild(listItem);
  });

  alignPopover(oEvent);

  oEvent.stopPropagation();
}

function alignPopover(event) {
  // Use window.pageXOffset and window.pageYOffset for unified scroll handling
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;

  // Get tile dimensions
  const tile = event.currentTarget;
  const tileRect = tile.getBoundingClientRect();

  // Calculate center coordinates using tile dimensions and scroll offset
  let centerX = tileRect.left + tileRect.width / 2;
  let centerY = tileRect.top + tileRect.height / 2;

  // Get the popover element
  const popover = document.getElementById("customPopover");

  // Set popover styles
  popover.style.display = "flex";
  popover.style.position = "absolute";

  if (centerX + popover.offsetWidth > document.documentElement.clientWidth) {
    centerX = document.documentElement.clientWidth - popover.offsetWidth - 32;
  }
  if (centerY + popover.offsetHeight > document.documentElement.clientHeight) {
    centerY = document.documentElement.clientHeight - popover.offsetHeight - 16;
  }

  popover.style.left = centerX + scrollX + "px";
  popover.style.top = centerY + scrollY + "px";
}

function alignPopoverP(oEvent) {
  // const x = oEvent.clientX;
  // const y = oEvent.clientY;
  const scrollX =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft;
  const scrollY =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // Get tile dimensions
  const tile = oEvent.currentTarget;
  const tileRect = tile.getBoundingClientRect();
  let centerX = tileRect.left + tileRect.width / 2;
  let centerY = tileRect.top + tileRect.height / 2;

  const popover = document.getElementById("customPopover");
  popover.style.display = "flex";
  popover.style.position = "absolute";

  // if (centerX + popover.offsetWidth > window.innerWidth) {
  //   centerX = window.innerWidth - popover.offsetWidth - 32;
  // }
  // if (centerY + popover.offsetHeight > window.innerHeight) {
  //   centerY = window.innerHeight - popover.offsetHeight - 16;
  // }

  // if (centerX + popover.offsetWidth > document.documentElement.clientWidth) {
  //   centerX = document.documentElement.clientWidth - popover.offsetWidth - 32;
  // }
  // if (centerY + popover.offsetHeight > document.documentElement.clientHeight) {
  //   centerY = document.documentElement.clientHeight - popover.offsetHeight - 16;
  // }

  popover.style.left = centerX + scrollX + "px";
  popover.style.top = centerY + scrollY + "px";
}

function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// const modalEL = window.addEventListener("click", hidePopover);

const modalEL = window.addEventListener("click", function (oEvent) {
  const popover = document.getElementById("customPopover");
  if (popover.style.display === "flex" && !popover.contains(oEvent.target)) {
    popover.style.display = "none";
  }
  if (
    popover.style.display === "flex" &&
    popover.contains(oEvent.target) &&
    oEvent.target.tagName == "A"
  ) {
    popover.style.display = "none";
  }
});

function onAlphabetSelectO(oEvent) {
  var selectedAlphabet = oEvent.target.innerText;

  // Highlight the selected alphabet
  var alphabetsContainer = oEvent.target.closest(".alphabeticalSelector");
  Array.from(alphabetsContainer.children).forEach((li) => {
    li.children[0].classList.toggle(
      "selectedAlphabet",
      li.innerText === selectedAlphabet
    );
  });

  // Get all card elements
  var trdCardsContainer = document.querySelector(".trdContainer");
  var trdCards = Array.from(trdCardsContainer.querySelectorAll(".tile"));

  // Filter cards based on the selected alphabet
  var filteredCards = trdCards.filter((card) => {
    return card
      .querySelector(".tile-header")
      .innerText.trim()
      .toUpperCase()
      .startsWith(selectedAlphabet);
  });

  // Clear container and append filtered cards
  trdCardsContainer.innerHTML = "";
  filteredCards.slice(0, 8).forEach(function (card) {
    card.classList.remove("hiddenTile");
    trdCardsContainer.appendChild(card);
  });
  filteredCards.slice(8).forEach(function (card) {
    card.classList.add("hiddenTile");
    trdCardsContainer.appendChild(card);
  });
}

// TRD alphabetical sorting
function onAlphabetSelect(oEvent) {
  if (oEvent.target.tagName != "LI") return;
  var selectedAlphabet = oEvent.target.innerText;
  var alphabetsContainer = oEvent.target.closest(".alphabeticalSelector");
  Array.from(alphabetsContainer.children).forEach((li) => {
    if (li.innerText == selectedAlphabet) {
      li.classList.add("selectedAlphabet");
    } else {
      li.classList.remove("selectedAlphabet");
    }
  });

  var trdCardsContainer = document.querySelector(".trdContainer");
  // Get all card elements
  var trdCards = Array.from(trdCardsContainer.querySelectorAll(".tile"));
  var sortedCards = trdCards.toSorted((a, b) => {
    let titleA = a.querySelector(".tile-header").innerText.trim();
    let titleB = b.querySelector(".tile-header").innerText.trim();
    return titleA.localeCompare(titleB);
  });

  var alphabetIndex = sortedCards.findIndex((element) => {
    return (
      element.querySelector(".tile-header").innerText.trim()[0] >=
      selectedAlphabet
    );
  });
  var rearrangedCards;
  if (alphabetIndex != -1) {
    rearrangedCards = [
      ...sortedCards.slice(alphabetIndex),
      ...sortedCards.slice(0, alphabetIndex),
    ];
  } else {
    rearrangedCards = sortedCards;
  }

  // Remove existing cards from the container
  trdCards.forEach(function (card) {
    trdCardsContainer.removeChild(card);
  });

  // Append sorted cards back to the container
  rearrangedCards.slice(0, 8).forEach(function (card) {
    card.classList.remove("hiddenTile");
    trdCardsContainer.appendChild(card);
  });
  rearrangedCards.slice(8).forEach(function (card) {
    card.classList.add("hiddenTile");
    trdCardsContainer.appendChild(card);
  });
}

// Walkthrough
document.addEventListener("DOMContentLoaded", function () {
  // Call the function to start the walkthrough
  if (!sessionStorage.getItem("walkthroughShownHomePage")) {
    sessionStorage.setItem("walkthroughShownHomePage", "true");
    startWalkthrough();
  }
});

function startWalkthrough() {
  // Show the walkthrough for each step

  var walkthroughSteps = [
    {
      element: "#search-input",
      content:
        "Search for keywords across the entire SUSE documentation. Refine your search using product, version and category filters",
    },
    {
      element: "#prod_solution_tab",
      content:
        "Select this tab to get the documentation for various SUSE products and solutions. Use the sorting options to sort the product and solution tiles.",
    },
    {
      element: "#sbp_tab",
      content:
        "Select this tab to find SUSE Best Practises across different categories. ",
    },
    {
      element: "#trd_tab",
      content:
        "Select this tab to get Technical Reference Documentation for different partners. To sort the list of partners, use the alphabet bar.",
    },
  ];

  showWalkthrough(0, walkthroughSteps);
}
