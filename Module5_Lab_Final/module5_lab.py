import xmltodict
import json
import yaml


# -----------------------------------
# STEP 1: READ XML FILE
# -----------------------------------

with open("customer.xml", "r") as xml_file:
    xml_data = xml_file.read()

xml_dict = xmltodict.parse(xml_data)

print("XML Data Loaded Successfully")
print(xml_dict)


# -----------------------------------
# STEP 2: READ JSON FILE
# -----------------------------------

with open("customer.json", "r") as json_file:
    json_data = json.load(json_file)

print("\nJSON Data Loaded Successfully")
print(json_data)


# -----------------------------------
# STEP 3: VALIDATION FUNCTION
# -----------------------------------

def validate_customer(data):
    required_fields = ["id", "firstName", "lastName", "email"]

    customer = data.get("customer", {})

    for field in required_fields:
        if field not in customer:
            print(f"Validation Failed: Missing {field}")
            return False

    if "@" not in customer["email"]:
        print("Validation Failed: Invalid Email Format")
        return False

    if not isinstance(customer["id"], int):
        print("Validation Failed: ID must be an integer")
        return False

    print("\nValidation Successful")
    return True


validate_customer(json_data)


# -----------------------------------
# STEP 4: XML → JSON CONVERSION
# -----------------------------------

json_from_xml = json.dumps(xml_dict, indent=4)

print("\nConverted XML to JSON:")
print(json_from_xml)


# -----------------------------------
# STEP 5: JSON → YAML CONVERSION
# -----------------------------------

yaml_from_json = yaml.dump(json_data, sort_keys=False)

print("\nConverted JSON to YAML:")
print(yaml_from_json)


# -----------------------------------
# STEP 6: MASTER DATA MERGE (MDM)
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

print("\nGolden Record (Merged Data):")
print(golden_record)


# -----------------------------------
# STEP 7: REAL-TIME UPDATE
# -----------------------------------

customer_db = {}
customer_db[golden_record["id"]] = golden_record

print("\nReal-Time Update:")
print(customer_db)


# -----------------------------------
# STEP 8: BATCH PROCESSING
# -----------------------------------

batch_records = [golden_record]

with open("batch_data.json", "w") as batch_file:
    json.dump(batch_records, batch_file, indent=4)

print("\nBatch File Created: batch_data.json")
