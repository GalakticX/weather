import { ReactNode, createContext, useContext, useState } from "react";
import axios from "axios";

interface WeatherContextProps {
  GetCurrentWeather: (
    lat: WeatherLocationFormData,
    lon: WeatherLocationFormData | null,
  ) => Promise<void>;
}

interface WeatherLocationFormData {
  lat: string;
  lon: string;
}

interface IpLocationResponse {
  loc: string;
}

interface WeatherLocationResponse {
  weather: {
    id: string;
    icon: string;
  };
}

const WeatherContext = createContext<WeatherContextProps | undefined>;

export const Weather = () => {
  const GetCurrentWeather = async (
    lat: WeatherLocationFormData,
    lon: WeatherLocationFormData,
  ) => {
    let latitude;
    let longitude;
    const ipInfoApiToken = process.env.IP_INFO_API_KEY;
    const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
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
      latitude = lat;
      longitude = lon;
    }

    const weatherLocationResponse = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=-${longitude}&appid={API key}`,
    );
  };

  return GetCurrentWeather;
};
