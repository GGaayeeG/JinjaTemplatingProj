
from jinja2 import Environment, FileSystemLoader
import os
import json
from bs4 import BeautifulSoup

def generate_template():
    # Define the paths
    template_dir = 'inputTemplates'
    output_dir = 'outputFiles_BaseTemplates'
    # data_file_sbp = 'data/sdb_metadata.json'
    data_file_sbp = 'data/sbp_metadata_fixed.json'
    data_file_products_slessap = 'data/slesforsap_metadata_corrected.json'
    data_file_products_micro = 'data/sle_micro.json'
    data_file_products_liberty = 'data/liberty_metadata.json'
    # data_file_products = 'data/bigfile_metadata.json'

    # data_file_trd = 'data/trd_metadata.json'
    # data_file_trd = 'data/trd_test_metadata.json'
    data_file_trd = 'data/trd_metadata_corrected.json'

    data_file_homepage = 'data/homepage_docserv_bigfile.json'
    data_file_homepage2 = 'newDataModel/homepagedata.json'
    # data_file_homepage = 'data/homepage-data.json'
    # data_file_homepage = 'data/homePageData.json'

    # data_file_smartDocs = 'data/smart_metadata.json'
    data_file_smartDocs = 'data/sle16_smart_metadata.json'

    data_file_products_sles = 'newDataModel/sles/15-SP5/data2.json'

    data_en_us_translations = 'i18n/en-us.json'
    data_de_de_translations = 'i18n/de-de.json'

    template_file = 'index.html.jinja'
    template_index_all_file = 'index-trd-all.html.jinja'
    template_homepage_file = 'home.html.jinja'

    template_homepage_file_new = 'home2.html.jinja'
    template_index_file_new = 'index.html2.jinja'

    # Load the Jinja environment
    env = Environment(loader=FileSystemLoader(template_dir, encoding='utf-8'))

    # Load the template
    template = env.get_template(template_file)
    template_index_all = env.get_template(template_index_all_file)
    template_homepage = env.get_template(template_homepage_file)

    template_homepage2 = env.get_template(template_homepage_file_new)
    template_index_new = env.get_template(template_index_file_new)

    # Load data
    with open(data_file_sbp, 'r',encoding='utf-8') as f:
        dataSBP = json.load(f)

    with open(data_file_products_slessap, 'r',encoding='utf-8') as f:
        dataProductsSLESSAP = json.load(f)

    with open(data_file_products_micro, 'r',encoding='utf-8') as f:
        dataProductsMicro = json.load(f)

    with open(data_file_products_liberty, 'r',encoding='utf-8') as f:
        dataProductsLiberty = json.load(f)


    with open(data_file_trd, 'r',encoding='utf-8') as f:
        dataTRD = json.load(f)

    with open(data_file_homepage, 'r',encoding='utf-8') as f:
        dataHome = json.load(f)

    with open(data_file_homepage2, 'r',encoding='utf-8') as f:
        dataHome2 = json.load(f)

    with open(data_file_smartDocs, 'r',encoding='utf-8') as f:
        dataSmartDocs = json.load(f)

    with open(data_file_products_sles, 'r',encoding='utf-8') as f:
        dataProductsSLES = json.load(f)

    with open(data_en_us_translations, 'r',encoding='utf-8') as f:
        data_en_us_translations = json.load(f)

    with open(data_de_de_translations, 'r',encoding='utf-8') as f:
        data_de_de_translations = json.load(f)
       
    # Render the template with data
    outputSystemsManagement = template.render(data=dataSBP,isSBP=True, category="Systems Management")
    outputContainerization = template.render(data=dataSBP,isSBP=True, category="Containerization")
    outputSLESforSAP15SP6 = template.render(data=dataProductsSLESSAP,isProduct=True, product="SUSE Linux Enterprise Server for SAP Applications",version="15 SP5")
    outputSLEMicro5_5 =template.render(data=dataProductsMicro,isProduct=True, product="SUSE Linux Enterprise Micro",version="5.5")
    outputLiberty9 =template.render(data=dataProductsLiberty,isProduct=True, product="SUSE Liberty Linux",version="9")

    # outputIBMGS = template.render(data=dataTRD,isTRD=True, partner="IBM",docType="Getting Started")
    # outputIBMAll = template_index_all.render(data=dataTRD, isTRD=True, partner='IBM')
    outputIBM = template.render(data=dataTRD,isTRD=True, partner="IBM")
    # outputSUSEGS = template.render(data=dataTRD,isTRD=True, partner="SUSE",docType="Getting Started")
    # outputSUSEAll = template_index_all.render(data=dataTRD, isTRD=True, partner='SUSE')
    outputSUSE = template.render(data=dataTRD,isTRD=True, partner="SUSE")
    # outputCiscoGS = template.render(data=dataTRD,isTRD=True, partner="Cisco",docType="Getting Started")
    outputCisco = template.render(data=dataTRD,isTRD=True, partner="Cisco")
    # outputCiscoAll = template_index_all.render(data=dataTRD, isTRD=True, partner='Cisco')
    outputSmartDocs = template.render(data=dataSmartDocs,isSmartDocs=True)

    outputHomePage = template_homepage.render(data=dataHome)
    outputHomePage2 = template_homepage2.render(data=dataHome2,lang='en-us')

    outputSLES15SP5 = template_index_new.render(data=dataProductsSLES,isProduct=True,category='Storage', product="SUSE Linux Enterprise Server",version="15 SP5", lang='en-us', translations=data_en_us_translations)
    outputSLES15SP5de = template_index_new.render(data=dataProductsSLES,isProduct=True, product="SUSE Linux Enterprise Server",version="15 SP5", lang='de-de', translations = data_de_de_translations)

    # Write the output to a file
    output_path = os.path.join(output_dir, 'systems-management.html')
    with open(output_path, 'w') as f:
        # f.write(outputSystemsManagement)
        soup = BeautifulSoup(outputSystemsManagement, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)


    output_path = os.path.join(output_dir, 'containerization.html')
    with open(output_path, 'w') as f:
        # f.write(outputContainerization)
        soup = BeautifulSoup(outputContainerization, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'slesSAP15SP6.html')
    with open(output_path, 'w') as f:
        # f.write(outputSLESforSAP15SP6)
        soup = BeautifulSoup(outputSLESforSAP15SP6, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'sleMicro5_5.html')
    with open(output_path, 'w') as f:
        # f.write(outputSLESforSAP15SP6)
        soup = BeautifulSoup(outputSLEMicro5_5, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'liberty9.html')
    with open(output_path, 'w') as f:
        # f.write(outputSLESforSAP15SP6)
        soup = BeautifulSoup(outputLiberty9, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'IBM.html')
    with open(output_path, 'w') as f:
        # f.write(outputIBMGS)
        soup = BeautifulSoup(outputIBM, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    # output_path = os.path.join(output_dir, 'IBM_GS.html')
    # with open(output_path, 'w') as f:
    #     # f.write(outputIBMGS)
    #     soup = BeautifulSoup(outputIBMGS, 'html.parser')
    #     formatted_html = soup.prettify()
    #     f.write(formatted_html)

    # output_path = os.path.join(output_dir, 'IBM_All.html')
    # with open(output_path, 'w') as f:
    #     # f.write(outputIBMGS)
    #     soup = BeautifulSoup(outputIBMAll, 'html.parser')
    #     formatted_html = soup.prettify()
    #     f.write(formatted_html)

    output_path = os.path.join(output_dir, 'SUSE.html')
    with open(output_path, 'w') as f:
        soup = BeautifulSoup(outputSUSE, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    

    output_path = os.path.join(output_dir, 'Cisco.html')
    with open(output_path, 'w') as f:
        soup = BeautifulSoup(outputCisco, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    

    output_path = os.path.join(output_dir, 'SmartDocs.html')
    with open(output_path, 'w') as f:
        soup = BeautifulSoup(outputSmartDocs, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)
    

    output_path = os.path.join(output_dir, 'SmartDocs.html')
    with open(output_path, 'w') as f:
        soup = BeautifulSoup(outputSmartDocs, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

        
    output_path = os.path.join(output_dir, 'homepage2.html')
    with open(output_path, 'w') as f:
        soup = BeautifulSoup(outputHomePage, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'homepage3.html')
    with open(output_path, 'w') as f:
        soup = BeautifulSoup(outputHomePage2, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'SLES15SP5.html')
    with open(output_path, 'w',encoding='utf-8') as f:
        # f.write(outputSystemsManagement)
        soup = BeautifulSoup(outputSLES15SP5, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'SLES15SP5de.html')
    with open(output_path, 'w',encoding='utf-8') as f:
        # f.write(outputSystemsManagement)
        soup = BeautifulSoup(outputSLES15SP5de, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    print("Output template generated at: {output_path}")

if __name__ == "__main__":
    generate_template()
