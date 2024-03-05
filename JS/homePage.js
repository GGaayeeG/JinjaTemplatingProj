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
function onTabChange(oEvent, tabId) {
  let tabs = ["products", "sbp", "trd", "newest", "mostPopular"];
  // let tabLinkBar = oEvent.target.parentElement.parentElement; //fetching ul element
  let tabLinkBar = document.querySelector("#homepage-menu");

  tabs.forEach(function (tab) {
    let content = document.getElementById(tab + "-content");

    if (tab === tabId) {
      content.classList.add("active-content");
      tabLinkBar
        .querySelector('a[onclick*="' + tab + '"]')
        .classList.add("selectedTab");
    } else {
      content.classList.remove("active-content");
      tabLinkBar
        .querySelector('a[onclick*="' + tab + '"]')
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

// Sorting
function sortProductsAsc(oEvent) {
  var cardsContainer = document.querySelector(".productsContainer");

  // Get all card elements
  if (!this.cards) {
    this.cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  }

  // Sort cards based on their title
  let cardsSorted = cards.toSorted(function (a, b) {
    var titleA = a.querySelector(".tile-header").innerText.toUpperCase();
    var titleB = b.querySelector(".tile-header").innerText.toUpperCase();
    return titleA.localeCompare(titleB);
  });

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
}

function sortProductsDesc(oEvent) {
  var cardsContainer = document.querySelector(".productsContainer");

  // Get all card elements
  if (!this.cards) {
    this.cards = Array.from(cardsContainer.querySelectorAll(".tile"));
  }

  // Sort cards based on their title
  let cardsSorted = cards.toSorted(function (a, b) {
    var titleA = a.querySelector(".tile-header").innerText.toUpperCase();
    var titleB = b.querySelector(".tile-header").innerText.toUpperCase();
    return -titleA.localeCompare(titleB);
  });

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

  if (versions && !versions.length) {
    //map to pointing URL...

    window.open("./indexPage.html", "_self");
  } else {
    setUpPopover(oEvent, versions, "Choose a version to proceed");
  }
}

function setUpPopover(oEvent, versions, popoverTitle) {
  const popoverLogo = document.getElementById("popoverLogo");
  const popoverLabel = document.getElementById("popoverLabel");
  const popoverList = document.getElementById("popoverList");

  // Set the logo source
  popoverLogo.src = "../assets/SUSElogo.png";

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
});

// TRD alphabetical sorting
function onAlphabetSelect(oEvent) {
  var selectedAlphabet = oEvent.target.innerText;
  var alphabetsContainer = oEvent.target.closest(".alphabeticalSelector");
  Array.from(alphabetsContainer.children).forEach((li) => {
    if (li.innerText == selectedAlphabet) {
      li.children[0].classList.add("selectedAlphabet");
    } else {
      li.children[0].classList.remove("selectedAlphabet");
    }
  });

  var trdCardsContainer = document.querySelector(".trdContainer");
  // Get all card elements
  var trdCards = Array.from(trdCardsContainer.querySelectorAll(".tile"));
  var sortedCards = trdCards.sort((a, b) => {
    let titleA = a.querySelector(".tile-header").innerText[0];
    let titleB = b.querySelector(".tile-header").innerText[0];
    return titleA.localeCompare(titleB);
  });
  var alphabetIndex = sortedCards.findIndex((element) => {
    return (
      element.querySelector(".tile-header").innerText[0] >= selectedAlphabet
    );
  });
  var rearrangedCards;
  if (alphabetIndex != -1) {
    rearrangedCards = [
      ...trdCards.slice(alphabetIndex),
      ...trdCards.slice(0, alphabetIndex),
    ];
  } else {
    rearrangedCards = trdCards;
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
}
