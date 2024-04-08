from jinja2 import Environment, FileSystemLoader
import os
import json

def generate_template():
    # Define the paths
    template_dir = 'inputTemplates'
    output_dir = 'outputFiles_BaseTemplates'
    data_file_sbp = 'data/sdb_metadata.json'
    data_file_products = 'data/slesforsap_metadata.json'
    # data_file_products = 'data/bigfile_metadata.json'
    data_file_trd = 'data/trd_metadata.json'
    template_file = 'index.html.jinja'

    # Load the Jinja environment
    env = Environment(loader=FileSystemLoader(template_dir))

    # Load the template
    template = env.get_template(template_file)

    # Load data
    with open(data_file_sbp, 'r',encoding='utf-8') as f:
        dataSBP = json.load(f)

    with open(data_file_products, 'r',encoding='utf-8') as f:
        dataProducts = json.load(f)

    with open(data_file_trd, 'r',encoding='utf-8') as f:
        dataTRD = json.load(f)

       
    # Render the template with data
    outputSystemsManagement = template.render(data=dataSBP,isSBP=True, category="Systems Management")
    outputContainerization = template.render(data=dataSBP,isSBP=True, category="Containerization")
    outputSLESforSAP15SP6 = template.render(data=dataProducts,isProduct=True, product="SLES for SAP",version="15 SP6")
    outputIBMGS = template.render(data=dataTRD,isTRD=True, partner="IBM",docType="Getting Started")

    # Write the output to a file
    output_path = os.path.join(output_dir, 'systems-management.html')
    with open(output_path, 'w') as f:
        f.write(outputSystemsManagement)

    output_path = os.path.join(output_dir, 'containerization.html')
    with open(output_path, 'w') as f:
        f.write(outputContainerization)

    output_path = os.path.join(output_dir, 'slesSAP15SP6.html')
    with open(output_path, 'w') as f:
        f.write(outputSLESforSAP15SP6)

    output_path = os.path.join(output_dir, 'IBM_GS.html')
    with open(output_path, 'w') as f:
        f.write(outputIBMGS)

    print("Output template generated at: {output_path}")

if __name__ == "__main__":
    generate_template()
