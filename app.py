from flask import Flask, jsonify
import mysql.connector
import requests
from flask import request
 
app = Flask(__name__)
 
def database_connect():
    try:
   
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="goodgarden"
        )
        return connection
   
    except Exception as e:
 
        print("Database connection failed:", e)
        return None
 
# Function to get data from the MySQL database
# def get_database_data():
#     mydb = database_connect()
#     if mydb and mydb.is_connected():
   
#         cursor = mydb.cursor(dictionary=True) # Enable dictionary result
 
#         # Query to retrieve the latest battery voltage data
#         query = "SELECT label, last_seen, last_battery_voltage, device_id FROM devices"
#         cursor.execute(query)
#         battery_data = cursor.fetchall() # Fetch all rows
#         mydb.close()
#         return battery_data
 
# @app.route('/', methods=['GET'])
# def get_data():
#     battery_data = get_database_data()
 
#     if battery_data is None or len(battery_data) == 0:
   
#         return jsonify({"error": "Failed to fetch data from database"})
 
#     return jsonify(battery_data) # Directly return the list of dictionaries as JSON

@app.route('/', methods=['GET', 'HEAD'])
def home():
    return jsonify({"message": "Home route"})

 
def get_weather_data():
    api_key = "05ddd06644"
    location = "Leiden"
    url = f"https://weerlive.nl/api/weerlive_api_v2.php?key={api_key}&locatie={location}"
    response = requests.get(url).json()
    return response
 
@app.route('/weather', methods=['GET'])
def get_weather():
    weather_response = get_weather_data()
 
    if 'error' in weather_response:
        return jsonify({"error": "Kon weerdata niet ophalen"})
 
    live_weather = weather_response.get('liveweer', [])
    weather_forecast = weather_response.get('wk_verw', [])
    day_forecast = weather_response.get('wk_verw', [])  # Dagverwachtingen
 
    weather_data = {
        "live_weather": live_weather[0] if live_weather else {},
        "weather_forecast": weather_forecast,
        "day_forecast": day_forecast  # Voeg de dagverwachtingen toe aan de weerdata
    }
 
    return jsonify(weather_data)

def get_planten_data():
    mydb = database_connect()
    if mydb and mydb.is_connected():
        try:
            cursor = mydb.cursor(dictionary=True)
            query = "SELECT planten_id, plant_naam, plantensoort, plant_geteelt, kas_locatie FROM planten"
            cursor.execute(query)
            planten_data = cursor.fetchall()
            mydb.close()
            return planten_data
        except Exception as e:
            print("Failed to fetch planten data:", e)
            return {"error": "Kon plantendata niet ophalen"}
    else:
        return {"error": "Database connection failed"}
    
@app.route("/planten", methods=["GET"])
def get_planten():
    planten_response = get_planten_data()

    if "error" in planten_response:
        return jsonify(planten_response)
 
    return jsonify(planten_response)
# Functie om de plantgegevens bij te werken in de database
def update_plant_geteelt(plant_id, plant_geteelt):
    connection = database_connect()
    if connection and connection.is_connected():
        try:
            cursor = connection.cursor()

            # Query om de plant_geteelt-waarde bij te werken
            query = "UPDATE planten SET plant_geteelt = %s WHERE planten_id = %s"
            cursor.execute(query, (plant_geteelt, plant_id))

            connection.commit()  # Commit de transactie
            connection.close()
            return True
        except Exception as e:
            print("Fout bij het bijwerken van plant_geteelt:", e)
            return False
    else:
        return False

@app.route('/get_plant_geteelt/<int:plant_id>', methods=['GET'])
def api_get_plant_geteelt(plant_id):
    connection = database_connect()
    if connection and connection.is_connected():
        try:
            cursor = connection.cursor()

            # Query to fetch the stored value of plant_geteelt for the specified plant ID
            query = "SELECT plant_geteelt FROM planten WHERE planten_id = %s"
            cursor.execute(query, (plant_id,))
            result = cursor.fetchone()

            connection.close()

            if result:
                plant_geteelt = result[0]
                return jsonify({"plant_geteelt": plant_geteelt}), 200
            else:
                return jsonify({"error": "Plant not found"}), 404
        except Exception as e:
            print("Error fetching plant_geteelt:", e)
            return jsonify({"error": "Internal server error"}), 500
    else:
        return jsonify({"error": "Database connection error"}), 500
    
    
@app.route('/update_plant_geteelt/<int:plant_id>', methods=['POST'])
def api_update_plant_geteelt(plant_id):
    # Get the data from the request body
    data = request.json

    # Check if the required data is present in the request
    if 'plant_geteelt' not in data:
        return jsonify({"error": "plant_geteelt is missing in the request"}), 400

    plant_geteelt = data['plant_geteelt']

    # Call the function to update the plant_geteelt data in the database
    if update_plant_geteelt(plant_id, plant_geteelt):
        return jsonify({"message": "Plant_geteelt successfully updated"}), 200
    else:
        return jsonify({"error": "Failed to update plant_geteelt"}), 500
        
def oogst_aantal():
    conn = database_connect()
    if conn and conn.is_connected():
        try:
            cursor = conn.cursor()

            query = """SELECT planten.plantensoort AS PlantType,
                        COUNT(CASE WHEN oogsten.succesvol = 1 THEN 1 END) AS SuccesvolleOogsten,
                        COUNT(CASE WHEN oogsten.succesvol = 0 THEN 1 END) AS MislukteOogsten
                        FROM planten
                        JOIN oogsten ON planten.planten_id = oogsten.plant_id
                        GROUP BY planten.plantensoort"""
            cursor.execute(query)
            oogst_data = cursor.fetchall()
            return oogst_data
        except Exception as e:
            print("Failed to fetch planten data:", e)
            return {"error": "Kon oogst data niet ophalen"}
        finally:
            conn.close()
    else:
        return {"error": "Database connection failed"}
    
@app.route("/oogsten", methods=["GET"])
def get_oogst():
    oogst_response = oogst_aantal()

    if "error" in oogst_response:
        return jsonify(oogst_response)
 
    return jsonify(oogst_response)
#################################################
# @app.route("/planten", methods=["GET"])
# def get_planten():
#     planten_response = get_planten_data()

#     if "error" in planten_response:
#         return jsonify(planten_response)
 
#     return jsonify(planten_response)
#####################################

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)