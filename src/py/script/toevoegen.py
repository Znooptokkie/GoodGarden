import json
from paho.mqtt import subscribe
from db_connect import database_connect

def store_battery_voltage_events(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO battery_voltage_events (timestamp, gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
            values = (record['timestamp'], record['gateway_receive_time'], record['device'], record['value'])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij data toevoegen: {e}")
    finally:
        cursor.close()

# Functies voor het opslaan van data in verschillende tabellen
def store_devices_data(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO devices (serial_number, name, label, last_seen, last_battery_voltage, device_id) VALUES (%s, %s, %s, %s, %s, %s)"
            values = (record['serial_number'], record['name'], record['label'], record['last_seen'], record['last_battery_voltage'], record['id'])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij het opslaan van devices data: {e}")
    finally:
        cursor.close()

def store_par_events(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO par_events (timestamp,  gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
            values = (record["timestamp"], record["gateway_receive_time"], record["device"], record["value"])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij het opslaan van devices data: {e}")
    finally:
        cursor.close()

def store_relative_humidity(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO relative_humidity_events (timestamp,  gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
            values = (record["timestamp"], record["gateway_receive_time"], record["device"], record["value"])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij het opslaan van devices data: {e}")
    finally:
        cursor.close()
    
def store_soil_electric_conductivity_events(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO soil_electric_conductivity_events (timestamp,  gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
            values = (record["timestamp"], record["gateway_receive_time"], record["device"], record["value"])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij het opslaan van devices data: {e}")
    finally:
        cursor.close()

def store_soil_relative_permittivity(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO soil_relative_permittivity_events (timestamp,  gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
            values = (record["timestamp"], record["gateway_receive_time"], record["device"], record["value"])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij het opslaan van devices data: {e}")
    finally:
        cursor.close()

def store_soil_temperature(db, records):
    cursor = db.cursor()
    try:
        for record in records:
            query = "INSERT INTO soil_temperature_events (timestamp,  gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
            values = (record["timestamp"], record["gateway_receive_time"], record["device"], record["value"])
            cursor.execute(query, values)
        db.commit()
    except Exception as e:
        print(f"Fout bij het opslaan van devices data: {e}")
    finally:
        cursor.close()

# On_message functie aangepast om verschillende soorten data te routeren
def on_message(client, userdata, message):
    payload_str = message.payload.decode("utf-8")
    data = json.loads(payload_str)
    db = database_connect()

    print(f"Message ontvangen op topic {message.topic}: {data}")

    try:
        if "battery_voltage" in message.topic:
            store_battery_voltage_events(db, data["results"])

        elif "devices" in message.topic:
            store_devices_data(db, data['results'])

        elif "par_events" in message.topic:
            store_par_events(db, data["results"])

        elif "relative_humidity" in message.topic:
            store_relative_humidity(db, data["results"])

        elif "soil_electric_conductivity" in message.topic:
            store_soil_electric_conductivity_events(db, data["results"])

        elif "soil_relative_permittivity" in message.topic:
            store_soil_relative_permittivity(db, data["results"]) 

        elif "soil_temperature" in message.topic:
            store_soil_temperature(db, data["results"])

    except KeyError as e:
        print(f"Missing key in data: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    topic = "goodgarden/#"
    subscribe.callback(on_message, topic)