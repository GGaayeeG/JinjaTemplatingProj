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
  sanitisedArticle.tasks = article.about.map((task) => task.name);
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

var articlesListSanitisedSBP = articlesList.map((article) => {
  let sanitisedArticle = {};
  sanitisedArticle.title = article.headline;
  sanitisedArticle.description = article.description;
  sanitisedArticle.tasks = article.about.map((task) => task.name);
  sanitisedArticle.links = articles.about
    .filter((about) => about["@type"] == "WebPage")
    .reduce((acc, webpage) => {
      if (webpage.encodingFormat.includes("pdf")) {
        acc.pdf = webpage.url;
      } else if (!webpage.html) {
        acc.html = webpage.url;
      } else {
        acc.sinngleHtml = webpage.url;
      }
      return acc;
    }, {});
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

var articlesListSanitisedTRD = articlesList.map((article) => {
  let sanitisedArticle = {};
  sanitisedArticle.title = article.headline;
  sanitisedArticle.description = article.description;
  sanitisedArticle.products = article.mentions.map((prod) => prod.name);
  sanitisedArticle.docType = article.additionalType;
  return sanitisedArticle;
});

//-------------------------------------------------------------------------------------
// Fetching the tasks list
var tasksList = articlesListSanitised.reduce((acc, article) => {
  article.tasks.forEach((task) => {
    if (!acc.includes(task)) {
      acc.push(task);
    }
  });
  return acc;
}, []);

//------------------------------------------------------------------------------------
// Fetching the products list for TRD
var productsList = articlesListSanitisedTRD.reduce((acc, article) => {
  article.products.forEach((product) => {
    if (!acc.includes(product)) {
      acc.push(product);
    }
  });
  return acc;
}, []);

// ------------------------------------------------------------------------------------
// Fetching the docType List for TRD
var docTypeList = articlesListSanitisedTRD.reduce((acc, article) => {
  if (!acc.includes(article.docType)) {
    acc.push(article.docType);
  }
  return acc;
}, []);

// ------------------------------------------------------------------------------------
// Fetching the newest articles
// articleList.sort based on data -> slice first 8

// ------------------------------------------------------------------------------------
// Homepage logic -
// add showNavigation - true or false; extract products that are to be shown in the navigation
// extract SBP versions as category visit
// show TRD versions as TRD list

var sbpIndex = productsList.findIndex(
  (obj) => obj.label === "SUSE Best Practices"
);
var categoriesList = productsList.splice(sbpIndex, 1).versions;

//docserv JSON
var mainSection = data.filter((obj) => obj["site - section"] === "main")[0];
var productLine = mainSection.productline;
var productInfo = mainSection.product;
var productsList = Object.keys(productLine).map((prod) => {
  let prodObj = {
    label: productLine[prod],
    description: productInfo[prod].description,
    versions: [],
  };
  Object.keys(productInfo[prod]).forEach((path) => {
    let versionObj = {
      label:
        productInfo[prod][path].acronym + " " + productInfo[prod][path].version,
      pointingUrl: path,
    };
    prodObj.versions.push(versionObj);
  });
  return prodObj;
});
//correct in the first go!

var sbpSection = data.filter((obj) => obj["site-section"] === "sbp")[0];
var sbpList = sbpSection.product.sbp;
var categoriesList = [];
Object.keys(sbpList).forEach((path) => {
  var categoryObj = {
    label: sbpList[path].version,
    description: sbpList[path].description,
    pointingUrl: path,
  };
  categoriesList.push(categoryObj);
});

// NEW DATA MODEL--------------------------------------------------------------------------------------
var description = data.description.filter((descObj) => descObj.lang == lang)[0];
if (!description) {
  let description = data.description.filter(
    (descObj) => descObj.default === true
  )[0];
}

var documents = data.documents;
var articles = [];
for (let i = 0; i < documents.length; i++) {
  let article = {};
  let langSpecificData = documents[i].docs.filter(
    (doc) => doc.lang === lang
  )[0];
  if (!langSpecificData) {
    let langSpecificData = documents[i].docs.filter(
      (doc) => doc.default === true
    )[0];
  }
  article.title = langSpecificData.title;
  article.subtitle = langSpecificData.subtitle;
  article.description = langSpecificData.description;
  article.links = langSpecificData.format;
  article.date = langSpecificData.date;
  article.taks = documents[i].tasks;
  article.products = documents[i].products;
  article.docType = documents[i].docType;
  article.rank = documents[i].rank;
  article.gated = documents[i].gated;
  articles.push(article);
}
//OR
var documents = data.documents.map((docData) => {
  let newDocData = {};
});

// ------------------------------------------------------------------

//APPLIES TO?

// SELECT DROPDOWNS
// Product, topic, doctype
var topicList = ["All"];
var productsList = ["All"];
var docTypeList = ["All"];
for (var i = 0; i < documents.length; i++) {
  let docObject = documents[i];
  docObject.tasks.forEach((task) => {
    if (!(task in topicList)) topicList.push(task);
  });
  docObject.products.forEach((product) => {
    if (!(product.name in productsList)) topicList.push(product.name);
  });
  if (!(docObject.docType in docTypeList)) docTypeList.push(docObject);
}
// How to pass on the data to the documents on the screen? data-attributes?
// Data attributes are a powerful and flexible feature of HTML that allow you to attach custom metadata to any HTML element, providing additional information that can be easily accessed and manipulated using JavaScript.
// Show or hide based on data attributes

// SORT BY - alphabets, dates, popularity
// Sorting alphabetically using Jinja??
//Sorting alphabtically using JS - [].sort() - works for all languages -> var a= ['爱','中国人']; a.sort();
// rearrange exiting items as done on homepage

//FILTERING BASED ON TYPING - alphabetically? in JS? - NP
//Works for '中国人'.toUpperCase().indexOf("国人") chinese
//No, Chinese writing does not distinguish between uppercase and lowercase letters.
// Hide or show documents based on result

var appliesToText = article.products
  .map((productInfo) => productInfo.name + " " + productInfo.versions.join(","))
  .join("; ");

var supportedVersions = product.supportedVersions.map((version) => {
  return (version.path = lang + "/" + version.path);
});

//filtering categories
var categoriesList = categories.map((categoryObj) => {
  let titleObj = categoryObj.translations.filter((translationObj) => {
    return translationObj.lang === lang || translationObj.default;
  });
  return { categoryId: categoryObj.categoryId, title: titleObj.title };
});
