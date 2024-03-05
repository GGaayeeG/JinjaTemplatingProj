import filtersData from "/search-embed-resources/dataStore.js";

function SearchApp() {
  var searchElement;
  const [searchValue, setSearchValue] = React.useState("");
  const [filterParams, setFilterParams] = React.useState([]);
  let [aFilterObjects, setFilterObjects] = React.useState([]);
  let [versions, setVersions] = React.useState([]);

  React.useEffect(() => {
    const gcse_script = document.createElement("script");
    gcse_script.src = "https://cse.google.com/cse.js?cx=f6270758188e345e2";
    gcse_script.async = true;
    gcse_script.onload = function () {
      checkGoogleCSEAvailability();
    };
    document.body.appendChild(gcse_script);

    return () => {
      document.body.removeChild(gcse_script);
    };
  }, []);

  function checkGoogleCSEAvailability() {
    if (window.google && window.google.search && window.google.search.cse) {
      // The google.search.cse object is available, so function can be executed here
      set_QueryandFilters_onload();
    } else {
      // Retry after a delay of 100ms
      setTimeout(checkGoogleCSEAvailability, 100);
    }
  }

  function fetchSearchElement() {
    if (searchElement) {
      return searchElement;
    } else {
      return window.google.search.cse.element.getElement("searchelement");
    }
  }

  function set_QueryandFilters_onload() {
    searchElement = fetchSearchElement();
    let query = searchElement.getInputQuery();
    let index = query.indexOf("inurl:/html/ -inurl:/single-html/");
    if (index !== -1) {
      query = query.substring(0, index) + query.substring(index + 33);
      filterParams.push("/html/ -inurl:/single-html/");
    }

    if (query.split(" -inurl:").length > 1) {
      filterParams.push("/prod/");
      query = query.split(" -inurl:")[0];
    }

    const searchQuery = query.split("inurl:")[0];
    setSearchValue(searchQuery.trim());

    let appliedFilters = query.split("inurl:").slice(1);
    appliedFilters = appliedFilters.map((filter) =>
      filter.split("OR")[0].trim()
    );

    let newFilterParams = [...filterParams, ...appliedFilters];
    setFilterParams(newFilterParams);
    fnSetFilterObjects(newFilterParams);
    fnSetVersions();
  }

  function onApplyFilter(oEvent, filterObj) {
    if (searchValue) {
      if (
        !aFilterObjects.filter((filterObj) => filterObj.type == "fileType")
          .length
      ) {
        aFilterObjects.push({
          label: "HTML",
          urlParam: "/html/ -inurl:/single-html/",
          type: "fileType",
        });
      }

      if (filterObj.type !== "fileType") {
        if (oEvent.target.checked) {
          aFilterObjects.push(filterObj);
        } else {
          aFilterObjects = aFilterObjects.filter(
            (oFilter) => filterObj.urlParam !== oFilter.urlParam
          );
        }
      } else {
        aFilterObjects = aFilterObjects.filter(
          (filterObj) => filterObj.type !== "fileType"
        );
        aFilterObjects.push(filterObj);
      }

      if (filterObj.urlParam === "/prod/" && !oEvent.target.checked) {
        aFilterObjects = aFilterObjects.filter(
          (oFilter) =>
            !(oFilter.type === "product" || oFilter.type === "version")
        );
        setVersions([]);
      } else if (filterObj.type === "docType" && !oEvent.target.checked) {
        aFilterObjects = aFilterObjects.filter(
          (oFilter) => !(oFilter.docTypeParam === filterObj.urlParam)
        );
      } else if (filterObj.type === "product" && !oEvent.target.checked) {
        aFilterObjects = aFilterObjects.filter(
          (oFilter) => !(oFilter.productParam === filterObj.urlParam)
        );
      }

      setFilterObjects(aFilterObjects);

      let newFilterParams = aFilterObjects.map(
        (filterObj) => filterObj.urlParam
      );
      setFilterParams(newFilterParams);

      let append = fnGetAppend(aFilterObjects);
      let searchElement = fetchSearchElement();
      searchElement.execute(
        searchValue.trim() + append
        // searchElement.getInputQuery().split("inurl")[0].trim() + append
      );

      //setting visible versions
      if (filterObj.type === "product") {
        if (oEvent.target.checked) {
          versions = [...versions, ...filterObj.versions];
        } else {
          versions = versions.filter(
            (versionObj) => versionObj.productParam !== filterObj.urlParam
          );
        }
        setVersions(versions);
      }
    } else {
      alert("Please enter a search value");
    }
  }

  function onSearchInputChange(oEvent) {
    const enteredSearch = oEvent.target.value;
    setSearchValue(enteredSearch);
  }

  const onSearchInput = (oEvent) => {
    oEvent.preventDefault();
    if (searchValue) {
      searchElement = fetchSearchElement();
      let append = fnGetAppend(aFilterObjects);
      searchElement.execute(searchValue.trim() + append);
    } else {
      alert("Please enter a search value");
    }
  };

  function fnGetAppend(aFilterObjects) {
    let append = "";
    let aDocTypeFilters = [];
    let aCategoryFilters = [];
    let aProductFilters = [];
    let aFileTypeFilters = [];
    let aVersionFilters = [];
    let filterParams = aFilterObjects.map((filterObj) => filterObj.urlParam);

    aFilterObjects.forEach((filterObj) => {
      if (filterObj.type === "docType") aDocTypeFilters.push(filterObj);
      else if (filterObj.type === "category") aCategoryFilters.push(filterObj);
      else if (filterObj.type === "product") aProductFilters.push(filterObj);
      else if (filterObj.type === "fileType") aFileTypeFilters.push(filterObj);
      else if (filterObj.type === "version") aVersionFilters.push(filterObj);
    });

    if (aCategoryFilters.length) {
      for (let i = 0; i < aCategoryFilters.length; i++) {
        if (Array.isArray(aCategoryFilters[i].docTypeParam)) {
          aCategoryFilters[i].docTypeParam.forEach((dtp, j) => {
            if (filterParams.includes(dtp)) {
              //append corresponding urlParams at corresponding indices
              append.length === 0
                ? (append += " inurl:" + aCategoryFilters[i].urlParam[j])
                : (append += " OR inurl:" + aCategoryFilters[i].urlParam[j]);
            }
          });
        } else {
          append.length === 0
            ? (append += " inurl:" + aCategoryFilters[i].urlParam)
            : (append += " OR inurl:" + aCategoryFilters[i].urlParam);
        }
      }
    }

    if (aVersionFilters.length) {
      for (let i = 0; i < aVersionFilters.length; i++) {
        append.length === 0
          ? (append += " inurl:" + aVersionFilters[i].urlParam)
          : (append += " OR inurl:" + aVersionFilters[i].urlParam);
      }
    }

    if (aProductFilters.length) {
      for (let i = 0; i < aProductFilters.length; i++) {
        if (
          !aVersionFilters.find(
            (versionObj) =>
              versionObj.productParam === aProductFilters[i].urlParam
          )
        ) {
          append.length === 0
            ? (append += " inurl:" + aProductFilters[i].urlParam)
            : (append += " OR inurl:" + aProductFilters[i].urlParam);
        }
      }
    }

    if (aDocTypeFilters.length) {
      if (filterParams.includes("/prod/") && !aProductFilters.length) {
        let docTypeFilterParams = aDocTypeFilters.map(
          (oFilter) => oFilter.urlParam
        );
        var ignoredDocFilters = filtersData.documentationTypes.filter(
          (docObj) => !docTypeFilterParams.includes(docObj.urlParam)
        );
      }

      for (let i = 0; i < aDocTypeFilters.length; i++) {
        let relatedCatFilterExists = aCategoryFilters.find((categoryObj) => {
          let hasRelatedFilter;
          if (Array.isArray(categoryObj.docTypeParam)) {
            hasRelatedFilter = Boolean(
              categoryObj.docTypeParam.includes(aDocTypeFilters[i].urlParam)
            );
          } else {
            hasRelatedFilter =
              aDocTypeFilters[i].urlParam === categoryObj.docTypeParam;
          }
          return hasRelatedFilter;
        });
        if (
          !relatedCatFilterExists &&
          aDocTypeFilters[i].urlParam !== "/prod/"
        ) {
          append.length === 0
            ? (append += " inurl:" + aDocTypeFilters[i].urlParam)
            : (append += " OR inurl:" + aDocTypeFilters[i].urlParam);
        }
      }
    }

    if (aFileTypeFilters.length) {
      append += " inurl:" + aFileTypeFilters[0].urlParam; //only 1 file type filter possible
    } else {
      append += " inurl:/html/ -inurl:/single-html/";
      setFilterObjects([
        ...aFilterObjects,
        {
          label: "HTML",
          urlParam: "/html/ -inurl:/single-html/",
          type: "fileType",
        },
      ]);
      setFilterParams([...filterParams, "/html/ -inurl:/single-html/"]);
    }

    if (ignoredDocFilters) {
      for (let i = 0; i < ignoredDocFilters.length; i++) {
        append += " -inurl:" + ignoredDocFilters[i].urlParam;
      }
    }

    return append;
  }

  function fnSetFilterObjects(filterParams) {
    let allVersions = filtersData.productsList.reduce((acc, prodObj) => {
      acc = [...acc, ...prodObj.versions];
      return acc;
    }, []);

    let allFilters = [
      ...filtersData.documentationTypes,
      ...filtersData.categoriesList,
      ...filtersData.productsList,
      ...filtersData.fileTypes,
      ...allVersions,
    ];

    filterParams.forEach((filter) => {
      let appliedFilter = allFilters.find((filterObj) => {
        if (Array.isArray(filterObj.urlParam)) {
          return filterObj.urlParam.includes(filter);
        } else {
          return filterObj.urlParam === filter;
        }
      });
      if (appliedFilter) {
        fnCheck_PushFilterObject(appliedFilter);
        if (appliedFilter.type === "version") {
          let prodFilterPresent = aFilterObjects.find(
            (filterObj) => filterObj.urlParam === appliedFilter.productParam
          );
          if (!prodFilterPresent) {
            let prodFilter = filtersData.productsList.find(
              (prodObj) => prodObj.urlParam === appliedFilter.productParam
            );
            fnCheck_PushFilterObject(prodFilter);
          }
          let prodDocFilter = filtersData.documentationTypes.find(
            (docObj) => docObj.urlParam === "/prod/"
          );
          fnCheck_PushFilterObject(prodDocFilter);
        } else if (appliedFilter.type === "category") {
          if (Array.isArray(appliedFilter.docTypeParam)) {
            let docFilter = filtersData.documentationTypes.find((docObj) =>
              filter.includes(docObj.urlParam)
            );
            fnCheck_PushFilterObject(docFilter);
          } else {
            let DocFilterPresent = aFilterObjects.find((filterObj) => {
              return filterObj.urlParam === appliedFilter?.docTypeParam;
            });
            if (!DocFilterPresent) {
              let docFilter = filtersData.documentationTypes.find(
                (docObj) => docObj.urlParam === appliedFilter.docTypeParam
              );
              fnCheck_PushFilterObject(docFilter);
            }
          }
        } else if (appliedFilter.type === "product") {
          let prodDocFilter = filtersData.documentationTypes.find(
            (docObj) => docObj.urlParam === "/prod/"
          );
          fnCheck_PushFilterObject(prodDocFilter);
        }
      }
    });

    let newFilterParams = aFilterObjects.map(
      (filterObj) => filterObj?.urlParam
    );
    setFilterParams(newFilterParams);
  }

  function fnCheck_PushFilterObject(filter) {
    let filterPresent = aFilterObjects.find((filterObj) => {
      return filterObj?.label === filter?.label;
    });
    if (!filterPresent) {
      aFilterObjects.push(filter);
      setFilterObjects(aFilterObjects);
    }
  }

  function fnSetVersions() {
    //visible versions
    let aProductFiters = aFilterObjects.filter(
      (filterObj) => filterObj?.type === "product"
    );
    versions = aProductFiters.reduce((acc, prodFilter) => {
      return (acc = [...acc, ...prodFilter.versions]);
    }, []);
    setVersions(versions);
  }

  function fnClearFilters() {
    //reset filters
    setFilterObjects([
      {
        label: "HTML",
        urlParam: "/html/ -inurl:/single-html/",
        type: "fileType",
      },
    ]);
    setFilterParams(["/html/ -inurl:/single-html/"]);
    setVersions([]);

    searchElement = fetchSearchElement();
    searchElement.execute(searchValue.trim());
  }

  return (
    <div className="search-container">
      <div className="headerBar">
        <form
          method="get"
          action=""
          className="formHeader"
          onSubmit={(oEvent) => onSearchInput(oEvent)}
        >
          <input
            type="text"
            name=""
            id="search"
            className="searchInput"
            size="60"
            value={searchValue}
            placeholder="Explore SUSE documentation: Refine your search with filters"
            onChange={(oEvent) => onSearchInputChange(oEvent)}
          />

          <button
            type="submit"
            value="Search"
            title="Search"
            className="searchButton"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="content">
        <aside className="leftbar">
          <div style={{ width: "100%" }}>
            <h4 className="leftbar-header">FILTER BY</h4>
            <div className="leftbar-contents">
              <button
                className="clearButton"
                onClick={fnClearFilters}
                style={{
                  display: filterParams.length > 1 ? "block" : "none",
                }}
              >
                Clear all
              </button>
              <div className="docTypeList">
                <h4 className="filterTypeHeader">Documentation Type</h4>
                {filtersData.documentationTypes.map((docTypeObj) => (
                  <tr key={docTypeObj.label}>
                    <label>
                      <td>
                        <input
                          type="checkbox"
                          checked={filterParams.includes(docTypeObj.urlParam)}
                          value={docTypeObj.urlParam}
                          onChange={(oEvent) => {
                            onApplyFilter(oEvent, docTypeObj);
                          }}
                        />
                      </td>
                      <td>{docTypeObj.label}</td>
                    </label>
                  </tr>
                ))}
              </div>
              <div
                className="categoriesList"
                style={{
                  display:
                    filterParams.includes("/sbp/") ||
                    filterParams.includes("/trd/") ||
                    filterParams.includes("/smart/")
                      ? "block"
                      : "none",
                }}
              >
                <h4 className="filterTypeHeader">Categories</h4>
                {filtersData.categoriesList.map((categoryObj) => (
                  <tr
                    key={categoryObj.label}
                    style={{
                      display:
                        (Array.isArray(categoryObj.docTypeParam) &&
                          categoryObj.docTypeParam.filter((value) =>
                            filterParams.includes(value)
                          ).length) ||
                        filterParams.includes(categoryObj.docTypeParam)
                          ? "table-row"
                          : "none",
                    }}
                  >
                    <label>
                      <td>
                        <input
                          type="checkbox"
                          checked={filterParams.includes(categoryObj.urlParam)}
                          value={categoryObj.urlParam}
                          onChange={(oEvent) => {
                            onApplyFilter(oEvent, categoryObj);
                          }}
                        />
                      </td>
                      <td>{categoryObj.label}</td>
                    </label>
                  </tr>
                ))}
              </div>
              <div
                className="productsList"
                style={{
                  display: filterParams.includes("/prod/") ? "block" : "none",
                }}
              >
                <h4 className="filterTypeHeader">Products</h4>
                {filtersData.productsList.map((productObj) => (
                  <tr key={productObj.label}>
                    <label
                      title={
                        productObj.fullForm
                          ? productObj.fullForm
                          : productObj.label
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={filterParams.includes(productObj.urlParam)}
                          value={productObj.urlParam}
                          onChange={(oEvent) => {
                            onApplyFilter(oEvent, productObj);
                          }}
                        />
                      </td>
                      <td>{productObj.label}</td>
                    </label>
                  </tr>
                ))}
              </div>
              <div
                className="versionsList"
                style={{
                  display: versions.length > 0 ? "block" : "none",
                }}
              >
                <h4 className="filterTypeHeader">Product Versions</h4>
                {versions.map((versionObj) => (
                  <tr key={versionObj.label}>
                    <label>
                      <td>
                        <input
                          type="checkbox"
                          checked={filterParams.includes(versionObj.urlParam)}
                          value={versionObj.urlParam}
                          onChange={(oEvent) => {
                            onApplyFilter(oEvent, versionObj);
                          }}
                        />
                      </td>
                      <td>{versionObj.label}</td>
                    </label>
                  </tr>
                ))}
              </div>
              <div className="fileList">
                <h4 className="filterTypeHeader">File Type</h4>
                {filtersData.fileTypes.map((fileTypeObj) => (
                  <tr key={fileTypeObj.label}>
                    <label>
                      <td>
                        <input
                          type="radio"
                          name="fileType"
                          checked={filterParams.includes(fileTypeObj.urlParam)}
                          onChange={(oEvent) => {
                            onApplyFilter(oEvent, fileTypeObj);
                          }}
                        />
                      </td>
                      <td>{fileTypeObj.label}</td>
                    </label>
                  </tr>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <div className="search-results-conatiner">
          <div
            className="gcse-searchresults-only"
            data-gname="searchelement"
          ></div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("searchpage_root"));
root.render(<SearchApp />);
