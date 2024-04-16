import json
from paho.mqtt import subscribe
from db_connect import database_connect

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


# def store_event_data(db, records, table_name):
#     cursor = db.cursor()
#     try:
#         for record in records:
#             query = f"INSERT INTO {table_name} (timestamp, gateway_receive_time, device, value) VALUES (%s, %s, %s, %s)"
#             values = (record['timestamp'], record['gateway_receive_time'], record['device'], record['value'])
#             cursor.execute(query, values)
#         db.commit()
#     except Exception as e:
#         print(f"Fout bij het opslaan van {table_name} data: {e}")
#     finally:
#         cursor.close()

# On_message functie aangepast om verschillende soorten data te routeren
def on_message(client, userdata, message):
    payload_str = message.payload.decode("utf-8")
    data = json.loads(payload_str)
    db = database_connect()

    print(f"Message ontvangen op topic {message.topic}: {data}")

    if "devices" in message.topic:
        store_devices_data(db, data['results'])
    # elif any(event in message.topic for event in ["relative_humidity", "battery_voltage", "soil_electric_conductivity", "soil_relative_permittivity", "soil_temperature", "par_events"]):
    #     table_name = message.topic.split('/')[-1]  # Veronderstelt dat de tabelnaam overeenkomt met het laatste deel van de topic
    #     store_event_data(db, data['results'], table_name)
    # else:
    #     print(f"Geen opslagfunctie gedefinieerd voor topic {message.topic}")

    db.close()

if __name__ == "__main__":
    topic = "goodgarden/#"
    subscribe.callback(on_message, topic)