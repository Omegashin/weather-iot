import time, os, requests
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile("settings.py")
CORS(app)

# TODO list all available routes
@app.route("/")
def index():
    return "<h1>Welcome to weather app</h1>"


@app.route("/time")
def get_current_time():
    return {"time": time.time()}


@app.route("/current")
def current_by_coords():

    # get passed arguments
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    # get response as a python dict
    url = f"https://api.openweathermap.org/data/2.5/find?lat={lat}&lon={lon}&cnt=1&units=metric&appid={app.config.get('OPEN_WEATHER_MAP_API_KEY')}"
    response = requests.get(url).json()

    # basic error handling
    if response.get("cod") != "200":
        message = response.get("message", "")
        return f"Error = {message}"

    # get current weather
    # TODO extract all fields

    return response
    # current_temperature = response.get("main", {}).get("temp")
    # if current_temperature:
    #     current_temperature_celsius = round(current_temperature - 273.15, 2)
    #     return f"Current temperature of {city.title()} is {current_temperature_celsius} &#8451;"
    # else:
    #     return f"Error getting temperature for {city.title()}"
