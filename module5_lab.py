import xmltodict
import json
import yaml

# -----------------------------------
# STEP 1: Create Data in XML
# -----------------------------------

xml_data = """<?xml version="1.0"?>
<customer>
    <id>101</id>
    <firstName>Rishi Kumar</firstName>
    <lastName>Ram Kumar</lastName>
    <email>Rishispearmarter5@gmail.com</email>
    <phone>9876543210</phone>
</customer>
"""

print("XML Data:\n", xml_data)


# -----------------------------------
# STEP 2: Create Data in JSON
# -----------------------------------

json_data = {
    "customer": {
        "id": 101,
        "firstName": "Rishi Kumar",
        "lastName": "Ram Kumar",
        "email": "Rishispearmarter5@gmail.com",
        "phone": "9876543210"
    }
}

print("\nJSON Data:\n", json_data)


# -----------------------------------
# STEP 3: Convert XML to JSON
# -----------------------------------

data_dict = xmltodict.parse(xml_data)
json_from_xml = json.dumps(data_dict, indent=4)

print("\nConverted XML to JSON:\n", json_from_xml)


# -----------------------------------
# STEP 4: Convert JSON to YAML
# -----------------------------------

yaml_data = yaml.dump(json_data, sort_keys=False)
print("\nConverted JSON to YAML:\n", yaml_data)


# -----------------------------------
# STEP 5: Master Data Merge (MDM)
# -----------------------------------

system_A = {
    "id": 101,
    "firstName": "Rishi Kumar",
    "email": "Rishispearmarter5@gmail.com"
}

system_B = {
    "id": 101,
    "lastName": "Ram Kumar",
    "phone": "9876543210"
}

golden_record = {**system_A, **system_B}

print("\nGolden Record (Merged Data):\n", golden_record)


# -----------------------------------
# STEP 6: Real-Time Update
# -----------------------------------

customer_db = {}
customer_db[golden_record["id"]] = golden_record

print("\nReal-Time Update:\n", customer_db)


# -----------------------------------
# STEP 7: Batch Processing
# -----------------------------------

batch_records = [golden_record]

with open("batch_data.json", "w") as file:
    json.dump(batch_records, file, indent=4)

print("\nBatch file created: batch_data.json")