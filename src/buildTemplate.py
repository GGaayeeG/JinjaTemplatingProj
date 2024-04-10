from jinja2 import Environment, FileSystemLoader
import os
import json
from bs4 import BeautifulSoup

def generate_template():
    # Define the paths
    template_dir = 'inputTemplates'
    output_dir = 'outputFiles_BaseTemplates'
    data_file_sbp = 'data/sdb_metadata.json'
    data_file_products = 'data/slesforsap_metadata.json'
    # data_file_products = 'data/bigfile_metadata.json'
    data_file_trd = 'data/trd_metadata.json'
    # data_file_homepage = 'data/homepage-data.json'
    data_file_homepage = 'data/homePageData.json'

    template_file = 'index.html.jinja'
    template_index_all_file = 'index-trd-all.html.jinja'
    template_homepage_file = 'home.html.jinja'

    # Load the Jinja environment
    env = Environment(loader=FileSystemLoader(template_dir))

    # Load the template
    template = env.get_template(template_file)
    template_index_all = env.get_template(template_index_all_file)
    template_homepage = env.get_template(template_homepage_file)

    # Load data
    with open(data_file_sbp, 'r',encoding='utf-8') as f:
        dataSBP = json.load(f)

    with open(data_file_products, 'r',encoding='utf-8') as f:
        dataProducts = json.load(f)

    with open(data_file_trd, 'r',encoding='utf-8') as f:
        dataTRD = json.load(f)

    with open(data_file_homepage, 'r',encoding='utf-8') as f:
        dataHome = json.load(f)


       
    # Render the template with data
    outputSystemsManagement = template.render(data=dataSBP,isSBP=True, category="Systems Management")
    outputContainerization = template.render(data=dataSBP,isSBP=True, category="Containerization")
    outputSLESforSAP15SP6 = template.render(data=dataProducts,isProduct=True, product="SLES for SAP",version="15 SP6")
    outputIBMGS = template.render(data=dataTRD,isTRD=True, partner="IBM",docType="Getting Started")
    outputIBMAll = template_index_all.render(data=dataTRD, isTRD=True, partner='IBM')

    outputHomePage = template_homepage.render(data=dataHome)

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

    output_path = os.path.join(output_dir, 'IBM_GS.html')
    with open(output_path, 'w') as f:
        # f.write(outputIBMGS)
        soup = BeautifulSoup(outputIBMGS, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'IBM_All.html')
    with open(output_path, 'w') as f:
        # f.write(outputIBMGS)
        soup = BeautifulSoup(outputIBMAll, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    output_path = os.path.join(output_dir, 'homepage2.html')
    with open(output_path, 'w') as f:
        # f.write(outputIBMGS)
        soup = BeautifulSoup(outputHomePage, 'html.parser')
        formatted_html = soup.prettify()
        f.write(formatted_html)

    print("Output template generated at: {output_path}")

if __name__ == "__main__":
    generate_template()
