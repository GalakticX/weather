import { useEffect, useState } from "react";
import Image from "next/image";

const HomeBody = () => {
  const [currentWeatherCondition, setCurrentWeatherCondition] =
    useState<string>("");
  const [currentWeatherConditionIcon, setCurrentWeatherConditionIcon] =
    useState<string>("");

  const [defaultBackground, setDefaultBackground] = useState<boolean>(true);

  const [firstBackgroundColorGradient, setFirstBackgroundColorGradient] =
    useState("");
  const [secondBackgroundColorGradient, setSecondBackgroundColorGradient] =
    useState("");

  const [currentTime, setCurrentTime] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherDataForIp = () => {
      try {
      } catch (error) {
        setError("Error Getting Current Location Weather Data");
      }
    };
  }, []);

  return (
    <>
      <div
        className={
          "relative h-screen w-full" + defaultBackground
            ? "bg-white"
            : "bg-gray-500"
        }
      >
        <div className="flex justify-center self-center">
          <div className="justify-center rounded-md bg-blue-500">test</div>
        </div>
      </div>
    </>
  );
};

export default HomeBody;
