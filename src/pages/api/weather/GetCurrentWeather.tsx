import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface WeatherLocationFormData {
  ip: string;
  lat: string;
  lon: string;
}

interface IpLocationResponse {
  loc: string;
}

interface WeatherLocationResponse {
  current: {
    dt: number;
    sunrise: string;
    sunset: string;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    uvi: number;
  };
  weather: {
    id: string;
    icon: string;
  };
}

const GetCurrentWeather = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let latitude;
    let longitude;
    const ipInfoApiToken = process.env.IP_INFO_API_KEY;
    const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

    const { ip, lat, lon } = req.body as WeatherLocationFormData;

    if (!lat || !lon) {
      const ipLocationResponse = await axios.get(
        `https://ipinfo.io/json?token=${ipInfoApiToken}`,
      );

      latitude = (ipLocationResponse.data as IpLocationResponse).loc.split(
        ",",
      )[0];
      longitude = (ipLocationResponse.data as IpLocationResponse).loc.split(
        ",",
      )[1];
    } else {
      if (!lat || !lon) {
        return res
          .status(401)
          .json({ message: "Latitude And Longitude Required In Payload" });
      }
      latitude = lat;
      longitude = lon;
    }

    const weatherLocationResponse = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=-${longitude}&appid={API key}`,
    );

    const weatherConditionID = (
      weatherLocationResponse.data as WeatherLocationResponse
    ).weather.id;

    const weatherConditionIcon = (
      weatherLocationResponse.data as WeatherLocationResponse
    ).weather.icon;
    const weatherConditionIconUrl = ` https://openweathermap.org/img/wn/${weatherConditionID}@2x.png`;

    const rawCurrentTime = (
      weatherLocationResponse.data as WeatherLocationResponse
    ).current.dt;

    const date = new Date(rawCurrentTime * 1000);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Note: months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";

    const ordinalSuffix = (num) => {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = num % 100;
      return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const formattedDate = `${ordinalSuffix(day)} ${month} ${year} ${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;

    const currentTemperature = (
      weatherLocationResponse.data as WeatherLocationResponse
    ).current.temp;

    const responseData = {
      current: {
        date: formattedDate,
        temperature: currentTemperature,
      },
      weather: {
        id: weatherConditionID,
        icon: weatherConditionIconUrl,
      },
    };
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetCurrentWeather;
