import json
import random

# List of popular and famous cultural channels in Portugal
channels = [
    "Prova Oral",
    "P2",
    "Ipsilon",
    "Boa Cama Boa Mesa",
    "Everything is New",
    "Junta de Freguesia de Lisboa",
    "CCB",
    "RTP",
    "TVI",
    "SIC",
    "Radio Comercial",
    "Antena 3",
    "Observador",
    "Expresso",
    "Visao",
    "TSF",
    "Renascenca",
    "DN - Diario de Noticias",
    "Time Out Lisboa",
    "Publico",
    "Jornal de Noticias",
    "Blitz",
    "Vodafone FM"
    # Add more channels here if needed
]

# Read JSON data from file
with open('all_posts_PT.json', 'r') as file:
    json_data = json.load(file)

# Iterate through each JSON object
for item in json_data:
    # Add the "Added by" field with a random channel
    item['Added by'] = random.choice(channels)

# Save the modified JSON data back to the file
with open('all_posts_PT.json', 'w') as file:
    json.dump(json_data, file, indent=4)
