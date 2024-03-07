Templating ---------------------------------------
For Homepage:
homepageTemplate.jinja + data.json -> homePage.js

For general index pages for Prod, category and TRDs:
indexPageTemplate.jinja + indexPageData.json -> indexPage.html - for prods & categories
indexPageTemplate.jinja + indexPageTRDData.json -> indexPageTRD.html - for TRDs

For TRD all index page:
indexPageTRDAll.jinja + indexPageTRDData.json -> indexPageTRDAll.html

Sample command:
jinja2 inputTemplates/homePageTemplate.jinja data/data.json -o outputFiles/homePage.html
jinja2 inputTemplates/indexPageTemplate.jinja data/indexPageData.json -o outputFiles/indexPage.html
jinja2 inputTemplates/indexPageTemplate.jinja data/indexPageTRDData.json -o outputFiles/indexPageTRD.html
jinja2 inputTemplates/indexPageTRDAll.jinja data/indexPageTRDData.json -o outputFiles/indexPageTRDAll.html

> jinja2 sample/sampleTemplate.jinja sample/metadata-2.json -o sample/sampleOutput.html

URL clarifications--------------------------------
