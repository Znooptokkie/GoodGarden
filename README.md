# GoodGarden

## Vereisten

* Python

## Setup

1. Dupliceer de `.env.example` en hernoem het naar `.env`. Vul de juiste gegevens in.

2. Genereer voor de 2 API's een API-key:

    - [WEER_API_KEY](weerlive.nl)

    - [PLANTEN_KEY](perenual.com)

3. Maak een virtual environment (venv) aan:

    ```bash
    python -m venv venv
    ```

4. Installeer alle dependecies:

    ```bash
    pip install -r requirements.txt
    ```

5. Voer de database migrations uit:

    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

6. Start de applicatie door het script uit te voeren:

      ```bash
      python app.py
      ```
### Troubleshooting

1. Verwijder de migration:
    ```bash
    rm -rf migrations
    ```

2. Als er melding komt "Can't locate revision indentified by '12345...'", gebruik dan de onderstaande SQL code:
    ```sql
    DELETE FROM alembic_version;
    ```

### Auteurs

-   Het oorspronkelijke project is hier te vinden:
    ```bash 
    https://github.com/Znooptokkie/GG
    ```
    