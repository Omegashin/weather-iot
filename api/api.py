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

    weather = {
        "cityName": response.get("list")[0].get("name"),
        "temperature": round(response.get("list")[0].get("main").get("temp"), 1),
        "feelsLike": round(response.get("list")[0].get("main").get("feels_like"), 1),
        "tempMin": round(response.get("list")[0].get("main").get("temp_min"), 1),
        "tempMax": round(response.get("list")[0].get("main").get("temp_max"), 1),
        "humidity": response.get("list")[0].get("main").get("humidity"),
        "cloudiness": response.get("list")[0].get("clouds").get("all"),
        "rain": response.get("list")[0].get("rain"),
        "snow": response.get("list")[0].get("snow"),
        "weatherType": response.get("list")[0].get("weather")[0].get("main"),
        "weatherDesc": response.get("list")[0]
        .get("weather")[0]
        .get("description")
        .capitalize(),
    }

    return weather
    # current_temperature = response.get("main", {}).get("temp")
    # if current_temperature:
    #     current_temperature_celsius = round(current_temperature - 273.15, 2)
    #     return f"Current temperature of {city.title()} is {current_temperature_celsius} &#8451;"
    # else:
    #     return f"Error getting temperature for {city.title()}"