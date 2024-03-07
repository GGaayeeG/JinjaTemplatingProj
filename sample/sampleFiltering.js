//JS - Filtering articles for SLES 15 SP4 - Product Index page
var articlesList = data.filter((article) => {
  if (article.isPartOf.name === "Products & Solutions") {
    let productIndex = article.mentions.findIndex((productInfo) => {
      return (
        productInfo.name === "SUSE Linux Enterprise Server" &&
        productInfo.softwareVersion === "15-SP5"
      );
    });
    if (productIndex >= 0) return true;
    else return false;
  } else false;
});

var articlesListSanitised = articlesList.map((article) => {
  let sanitisedArticle = {};
  sanitisedArticle.title = article.headline;
  sanitisedArticle.description = article.description;
  sanitisedArticle.task = article.about.map((task) => task.name);
  return sanitisedArticle;
});

// -------------------------------------------------------------------------------------

// Filtering articles for a SBP category index page - Eg. category - Storage
var articlesList = data.filter((article) => {
  if (article.isPartOf.name === "Best Practices") {
    let categoryIndex = article.articleSection.findIndexOf("Storage");
    if (categoryIndex >= 0) return true;
    else return false;
  } else false;
});

var articlesListSanitised = articlesList.map((article) => {
  let sanitisedArticle = {};
  sanitisedArticle.title = article.headline;
  sanitisedArticle.description = article.description;
  sanitisedArticle.task = article.about.map((task) => task.name);
  return sanitisedArticle;
});

// -----------------------------------------------------------------------------------

// Filtering articles for a TRD partner-doc type index page - TRD partner eg. IBM
var articlesList = data.filter((article) => {
  if (article.isPartOf.name === "TRD") {
    let partnerIndex = article.affiliatedOrganization.findIndex((orgInfo) => {
      return orgInfo.name === "IBM";
    });
    if (partnerIndex >= 0) return true;
    else return false;
  } else false;
});

var articlesListSanitised = articlesList.map((article) => {
  let sanitisedArticle = {};
  sanitisedArticle.title = article.headline;
  sanitisedArticle.description = article.description;
  sanitisedArticle.products = article.mentions.map((prod) => prod.name);
  sanitisedArticle.docType = article.additionalType;
  return sanitisedArticle;
});
