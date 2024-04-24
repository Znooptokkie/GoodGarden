import json
import mysql.connector
import os

from flask import Flask, jsonify, request

app = Flask(__name__)

# Function to establish a connection to the database
def get_database_connection():
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

# Function to fetch plant data from the database
def get_plant_data(plant_id):
    connection = get_database_connection()
    if connection and connection.is_connected():
        try:
            cursor = connection.cursor(dictionary=True)
            query = "SELECT id, plant_naam, plantensoort, plant_geteelt FROM planten WHERE id = %s"
            cursor.execute(query, (plant_id,))
            plant_data = cursor.fetchone()
            connection.close()
            return plant_data
        except Exception as e:
            print("Failed to fetch plant data:", e)
            return None
    else:
        return None

# Route to get plant data by ID
@app.route("/planten/<int:plant_id>", methods=["GET"])
def get_plant_by_id(plant_id):
    plant_data = get_plant_data(plant_id)
    if plant_data:
        return jsonify(plant_data)
    else:
        return jsonify({"error": "Failed to fetch plant data"})

# Route to update plant_geteelt value
@app.route("/update_plant_geteelt/<int:plant_id>", methods=["POST"])
def update_plant_geteelt(plant_id):
    try:
        connection = get_database_connection()
        if connection and connection.is_connected():
            cursor = connection.cursor()
            new_value = request.json.get("plant_geteelt")
            cursor.execute("UPDATE planten SET plant_geteelt = %s WHERE id = %s", (new_value, plant_id))
            connection.commit()
            connection.close()
            return jsonify({"message": "Plant_geteelt updated successfully"})
        else:
            return jsonify({"error": "Failed to connect to database"})
    except Exception as e:
        return jsonify({"error": f"Failed to update plant_geteelt: {e}"})

# Function to get the absolute path of the current directory
def get_current_directory():
    return os.path.dirname(os.path.abspath(__file__))

# Function to fetch plant data from the database and write to JSON files
def fetch_plant_and_write_to_json():
    connection = get_database_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, plant_naam, plantensoort, plant_geteelt FROM planten")
        plants = cursor.fetchall()
        current_directory = get_current_directory()
        for plant in plants:
            json_file_path = os.path.join(current_directory, f'./json/plant_{plant["id"]}.json')
            with open(json_file_path, 'w') as json_file:
                json.dump(plant, json_file, indent=4)
    except mysql.connector.Error as error:
        print(f"Error fetching data from MySQL table: {error}")
    finally:
        if 'cursor' in locals():
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Call the function to fetch plant data and write to JSON files
fetch_plant_and_write_to_json()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
