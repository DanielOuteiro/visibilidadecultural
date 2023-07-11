import json

# Read JSON file
with open('all_posts_PT.json') as f:
    json_data = json.load(f)

# Extract 'type' values from JSON objects
type_values = [obj['type'] for obj in json_data]

# Get unique 'type' values
unique_types = list(set(type_values))

# Print the unique 'type' values
print("Unique 'type' values:")
for type_value in unique_types:
    print(type_value)
