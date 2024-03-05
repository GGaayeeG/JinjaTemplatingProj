const filtersData = {
  documentationTypes: [
    { label: "Product Documentation", urlParam: "/prod/", type: "docType" },
    { label: "SUSE Best Practices", urlParam: "/sbp/", type: "docType" },
    {
      label: "Technical Reference Documentation",
      urlParam: "/trd/",
      type: "docType",
    },
    { label: "Smart Docs", urlParam: "/smart/", type: "docType" },
  ],

  categoriesList: [
    {
      label: "Systems Management",
      urlParam: ["/sbp/systems-management/", "/smart/systems-management/"],
      type: "category",
      docTypeParam: ["/sbp/", "/smart/"],
    },
    {
      label: "Storage",
      urlParam: "/sbp/storage/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "SAP Applications",
      urlParam: "/sbp/sap/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "Linux Server",
      urlParam: "/sbp/server-linux/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "Linux Desktop",
      urlParam: "/sbp/desktop-linux/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "Containers & Virtualization",
      urlParam: "/sbp/container-virtualization/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "Cloud Computing",
      urlParam: "/sbp/cloud-computing/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "Building & managing packages",
      urlParam: "/sbp/building-managing-packages/",
      type: "category",
      docTypeParam: "/sbp/",
    },
    {
      label: "Kubernetes",
      urlParam: "/trd/kubernetes/",
      type: "category",
      docTypeParam: "/trd/",
    },
    {
      label: "Linux",
      urlParam: "/trd/linux/",
      type: "category",
      docTypeParam: "/trd/",
    },

    {
      label: "Virtualization & Cloud",
      urlParam: "/smart/virtualization-cloud/",
      type: "category",
      docTypeParam: "/smart/",
    },
    {
      label: "System Tuning & Performance",
      urlParam: "/smart/systemtuning-performance/",
      type: "category",
      docTypeParam: "/smart/",
    },
    // {
    //   label: "Systems Management",
    //   urlParam: "/smart/systems-management/",
    //   type: "category",
    //   docTypeParam: "/smart/",
    // },
    {
      label: "Network",
      urlParam: "/smart/network/",
      type: "category",
      docTypeParam: "/smart/",
    },
    {
      label: "Deployment & Upgrade",
      urlParam: "/smart/deploy-upgrade/",
      type: "category",
      docTypeParam: "/smart/",
    },
    {
      label: "Containerization",
      urlParam: "/smart/container/",
      type: "category",
      docTypeParam: "/smart/",
    },
  ],

  productsList: [
    {
      label: "Adaptable Linux Platform",
      urlParam: "/alp/micro/",
      type: "product",
      versions: [],
    },
    {
      label: "SUSE Enterprise Storage",
      urlParam: "/ses/",
      type: "product",
      versions: [
        {
          label: "SUSE Enterprise Storage 7.1",
          urlParam: "/ses/7\\.1/",
          productParam: "/ses/",
          type: "version",
        },
        {
          label: "SUSE Enterprise Storage 7",
          urlParam: "/ses/7/",
          productParam: "/ses/",
          type: "version",
        },
      ],
    },
    {
      label: "SUSE Liberty Linux",
      urlParam: "/liberty/",
      type: "product",
      versions: [
        {
          label: "SUSE Liberty Linux 9",
          urlParam: "/liberty/9/",
          productParam: "/liberty/",
          type: "version",
        },

        {
          label: "SUSE Liberty Linux 8",
          urlParam: "/liberty/8/",
          productParam: "/liberty/",
          type: "version",
        },
        {
          label: "SUSE Liberty Linux 7",
          urlParam: "/liberty/7/",
          productParam: "/liberty/",
          type: "version",
        },
      ],
    },
    {
      label: "SLED",
      fullForm: "SUSE Linux Enterprise Desktop",
      urlParam: "/sled/",
      type: "product",
      versions: [
        {
          label: "SLED 15 SP5",
          urlParam: "/sled/15-SP5/",
          productParam: "/sled/",
          type: "version",
        },
        {
          label: "SLED 15 SP4",
          urlParam: "/sled/15-SP4/",
          productParam: "/sled/",
          type: "version",
        },
      ],
    },
    {
      label: "SLE HA",
      fullForm: "SUSE Linux Enterprise High Availability",
      urlParam: "/sle-ha/",
      type: "product",
      versions: [
        {
          label: "SLE HA 15 SP5",
          urlParam: "/sle-ha/15-SP5/",
          productParam: "/sle-ha/",
          type: "version",
        },
        {
          label: "SLE HA 15 SP4",
          urlParam: "/sle-ha/15-SP4/",
          productParam: "/sle-ha/",
          type: "version",
        },
        {
          label: "SLE HA 15 SP3",
          urlParam: "/sle-ha/15-SP3/",
          productParam: "/sle-ha/",
          type: "version",
        },
        {
          label: "SLE HA 15 SP2",
          urlParam: "/sle-ha/15-SP2/",
          productParam: "/sle-ha/",
          type: "version",
        },
        {
          label: "SLE HA 15 SP1",
          urlParam: "/sle-ha/15-SP1/",
          productParam: "/sle-ha/",
          type: "version",
        },
        {
          label: "SLE HA 12 SP5",
          urlParam: "/sle-ha/12-SP5/",
          productParam: "/sle-ha/",
          type: "version",
        },
        {
          label: "SLE HA 12 SP4",
          urlParam: "/sle-ha/12-SP4/",
          productParam: "/sle-ha/",
          type: "version",
        },
      ],
    },
    {
      label: "SLE HPC",
      fullForm: "SUSE Linux Enterprise for High Performance Computing",
      urlParam: "/sle-hpc/",
      type: "product",
      versions: [
        {
          label: "SLE HPC 15 SP5",
          urlParam: "/sle-hpc/15-SP5/",
          productParam: "/sle-hpc/",
          type: "version",
        },
        {
          label: "SLE HPC 15 SP4",
          urlParam: "/sle-hpc/15-SP4/",
          productParam: "/sle-hpc/",
          type: "version",
        },
        {
          label: "SLE HPC 15 SP3",
          urlParam: "/sle-hpc/15-SP3/",
          productParam: "/sle-hpc/",
          type: "version",
        },
      ],
    },
    {
      label: "SLE in Public Clouds",
      fullForm: "SUSE Linux Enterprise in Public Clouds",
      urlParam: "/sle-public-cloud/",
      type: "product",
      versions: [],
    },
    {
      label: "SLE Micro",
      fullForm: "SUSE Linux Enterprise Micro",
      urlParam: "/sle-micro/",
      type: "product",
      versions: [
        {
          label: "SLE Micro 5.5",
          urlParam: "/sle-micro/5\\.5/",
          productParam: "/sle-micro/",
          type: "version",
        },
        {
          label: "SLE Micro 5.4",
          urlParam: "/sle-micro/5\\.4/",
          productParam: "/sle-micro/",
          type: "version",
        },
        {
          label: "SLE Micro 5.3",
          urlParam: "/sle-micro/5\\.3/",
          productParam: "/sle-micro/",
          type: "version",
        },
        {
          label: "SLE Micro 5.2",
          urlParam: "/sle-micro/5\\.2/",
          productParam: "/sle-micro/",
          type: "version",
        },
        {
          label: "SLE Micro 5.1",
          urlParam: "/sle-micro/5\\.1/",
          productParam: "/sle-micro/",
          type: "version",
        },
      ],
    },
    {
      label: "SLE Point of Service",
      fullForm: "SUSE Linux Enterprise Point of Service",
      urlParam: "/sle-pos/",
      type: "product",
      versions: [
        {
          label: "SLE Point of Service 11 SP3",
          urlParam: "/sle-pos/11-SP3/",
          productParam: "/sle-micro/",
          type: "version",
        },
      ],
    },
    {
      label: "SLE Real Time",
      fullForm: "SUSE Linux Enterprise Real Time",
      urlParam: "/sle-rt/",
      type: "product",
      versions: [
        {
          label: "SLE Real Time 15 SP5",
          urlParam: "/sle-rt/15-SP5/",
          productParam: "/sle-rt/",
          type: "version",
        },
        {
          label: "SLE Real Time 15 SP4",
          urlParam: "/sle-rt/15-SP4/",
          productParam: "/sle-rt/",
          type: "version",
        },
        {
          label: "SLE Real Time 15 SP3",
          urlParam: "/sle-rt/15-SP3/",
          productParam: "/sle-rt/",
          type: "version",
        },
        {
          label: "SLE Real Time 12 SP5",
          urlParam: "/sle-rt/12-SP5/",
          productParam: "/sle-rt/",
          type: "version",
        },
      ],
    },
    {
      label: "SLES",
      fullForm: "SUSE Linux Enterprise Server",
      urlParam: "/sles/",
      type: "product",
      versions: [
        {
          label: "SLES 15 SP5",
          urlParam: "/sles/15-SP5/",
          productParam: "/sles/",
          type: "version",
        },
        {
          label: "SLES 15 SP4",
          urlParam: "/sles/15-SP4/",
          productParam: "/sles/",
          type: "version",
        },
        {
          label: "SLES 15 SP3",
          urlParam: "/sles/15-SP3/",
          productParam: "/sles/",
          type: "version",
        },
        {
          label: "SLES 15 SP2",
          urlParam: "/sles/15-SP2/",
          productParam: "/sles/",
          type: "version",
        },
        {
          label: "SLES 15 SP1",
          urlParam: "/sles/15-SP1/",
          productParam: "/sles/",
          type: "version",
        },
        {
          label: "SLES 12 SP5",
          urlParam: "/sles/12-SP5/",
          productParam: "/sles/",
          type: "version",
        },
        {
          label: "SLES 12 SP4",
          urlParam: "/sles/12-SP4/",
          productParam: "/sles/",
          type: "version",
        },
      ],
    },
    {
      label: "SLES for SAP",
      fullForm: "SUSE Linux Enterprise Server for SAP Applica­tions",
      urlParam: "/sles-sap/",
      type: "product",
      versions: [
        {
          label: "SLES for SAP 15 SP5",
          urlParam: "/sles-sap/15-SP5/",
          productParam: "/sles-sap/",
          type: "version",
        },
        {
          label: "SLES for SAP 15 SP4",
          urlParam: "/sles-sap/15-SP4/",
          productParam: "/sles-sap/",
          type: "version",
        },
        {
          label: "SLES for SAP 15 SP3",
          urlParam: "/sles-sap/15-SP3/",
          productParam: "/sles-sap/",
          type: "version",
        },
        {
          label: "SLES for SAP 15 SP2",
          urlParam: "/sles-sap/15-SP2/",
          productParam: "/sles-sap/",
          type: "version",
        },
        {
          label: "SLES for SAP 15 SP1",
          urlParam: "/sles-sap/15-SP1/",
          productParam: "/sles-sap/",
          type: "version",
        },
        {
          label: "SLES for SAP 12 SP5",
          urlParam: "/sles-sap/12-SP5/",
          productParam: "/sles-sap/",
          type: "version",
        },
        {
          label: "SLES for SAP 12 SP4",
          urlParam: "/sles-sap/12-SP4/",
          productParam: "/sles-sap/",
          type: "version",
        },
      ],
    },
    {
      label: "SUSE Manager",
      urlParam: "/suma/",
      type: "product",
      versions: [
        {
          label: "SUSE Manager 4.3",
          urlParam: "/suma/4\\.3/",
          productParam: "/suma/",
          type: "version",
        },
        {
          label: "SUSE Manager 4.2",
          urlParam: "/suma/4\\.2/",
          productParam: "/suma/",
          type: "version",
        },
      ],
    },
    {
      label: "SUSE Manager for Retail",
      urlParam: "/suma-retail/",
      type: "product",
      versions: [
        {
          label: "SUSE Manager for Retail 4.3",
          urlParam: "/suma-retail/4\\.3/",
          productParam: "/suma-retail/",
          type: "version",
        },
        {
          label: "SUSE Manager for Retail 4.2",
          urlParam: "/suma-retail/4\\.2/",
          productParam: "/suma-retail/",
          type: "version",
        },
      ],
    },
    {
      label: "SUSE OpenStack Cloud",
      urlParam: "/soc/",
      type: "product",
      versions: [
        {
          label: "SUSE OpenStack Cloud 9",
          urlParam: "/soc/9/",
          productParam: "/soc/",
          type: "version",
        },
      ],
    },
  ],

  fileTypes: [
    // { label: "All", urlParam: "", type: "fileType" },
    // { label: "HTML", urlParam: "/html/ -single-html", type: "fileType" },
    {
      label: "HTML",
      urlParam: "/html/ -inurl:/single-html/",
      type: "fileType",
    },
    { label: "PDF", urlParam: "/pdf/", type: "fileType" },
    { label: "Single-HTML", urlParam: "/single-html/", type: "fileType" },
  ],
};
export default filtersData;
