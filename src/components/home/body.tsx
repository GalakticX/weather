import { useEffect, useState } from "react";
import Image from "next/image";
import { string } from "zod";
import ContentLoader, { List, BulletList } from "react-content-loader";

const HomeBody = () => {
  const [currentWeatherCondition, setCurrentWeatherCondition] =
    useState<string>("");
  const [currentWeatherConditionIcon, setCurrentWeatherConditionIcon] =
    useState<string>("");

  const [unit, setUnit] = useState<string>("");
  const [shortUnit, setShortUnit] = useState<string>("");

  const [currentTemperature, setCurrentTemperature] = useState<string>("");

  const [defaultBackground, setDefaultBackground] = useState<boolean>(true);

  const [firstBackgroundColorGradient, setFirstBackgroundColorGradient] =
    useState("");
  const [secondBackgroundColorGradient, setSecondBackgroundColorGradient] =
    useState("");

  const [currentTime, setCurrentTime] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const MyLoader = () => <ContentLoader />;
  const MyListLoader = () => <List />;

  useEffect(() => {
    const getWeatherDataForIp = () => {
      try {
      } catch (error) {
        setError("Error Getting Current Location Weather Data");
      }
    };
  }, []);

  const updateUnit = (unit: string) => {
    try {
      setUnit(unit);
      let shortUnit: string;
      switch (unit) {
        case "celsius": {
          setShortUnit("C");
          break;
        }
        case "fahrenheit": {
          setShortUnit("F");
          break;
        }
        case "kelvin": {
          setShortUnit("K");
          break;
        }
        default: {
          setError("Error Updating Unit");
          break;
        }
      }
    } catch (error) {
      setError("Error Updating Unit");
    }
  };

  return (
    <>
      {loaded ? (
        <div className="h-screen w-full overflow-hidden bg-gray-200">
          <div className="flex flex-row">
            <div className="content-center justify-center rounded-lg bg-blue-500 p-8 backdrop-blur-sm">
              <div className="flex flex-col">
                <div>
                  <p className="">Current Time: {currentTime}</p>
                </div>
                <div className="flex flex-row">
                  <Image
                    src={currentWeatherConditionIcon}
                    height={50}
                    width={50}
                    alt=""
                  />
                  <p className="text-5xl font-semibold">
                    {currentTemperature}
                    {shortUnit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full overflow-hidden bg-gray-200">
          <div className="flex flex-row">
            <div className="content-center justify-center rounded-lg bg-blue-500 p-8 backdrop-blur-sm">
              <div className="flex flex-col">{MyListLoader()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeBody;
