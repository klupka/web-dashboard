import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { Skeleton } from "@heroui/react";

const CurrentWeather = () => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);
    const latitude = import.meta.env.VITE_LATITUDE;
    const longitude = import.meta.env.VITE_LONGITUDE;
    const [hasCoordinates, setHasCoordinates] = useState(false);
    const units_system = "IMPERIAL";
    const forecast_hours = 6;

    const current_conditions_endpoint = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${api_key}&location.latitude=${latitude}&location.longitude=${longitude}&unitsSystem=${units_system}`;

    const [current_weather_data, set_current_weather_data] = useState(null);
    const [time, setTime] = useState(new Date());

    async function get_current_weather_conditions() {
        try {
            const response = await axios.get(current_conditions_endpoint);
            // console.log("response", response.data);

            set_current_weather_data(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function get_data() {
        setTime(new Date());
        get_current_weather_conditions();

        const interval = setInterval(
            get_current_weather_conditions,
            30 * 60 * 1000,
        ); // Every 30 minutes

        return () => clearInterval(interval);
    }

    // async function get_coordinates() {
    //     try {
    //         const uri = "http://ip-api.com/json/";
    //         const response = await axios.get(
    //             `https://corsproxy.io{encodeURIComponent(${uri})}`,
    //         );
    //         setLatitude(response.data.lat);
    //         setLongitude(response.data.lon);
    //         setHasCoordinates(true);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }

    useEffect(() => {
        // get_coordinates();
        // if (latitude != null && longitude != null && hasCoordinates == true)
        get_data();
    }, [hasCoordinates]);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    // Convert to 12-hour format
    const displayHours = hours % 12 || 12;
    // Determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const displayTime = `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;

    if (current_weather_data == null) {
        return (
            <Skeleton className="h-[300px] aspect-square rounded-3xl opacity-25" />
        );
    } else
        return (
            <Card className="text-left aspect-square w-[300px] bg-[#18181b]/25">
                <div className="flex flex-col justify-between items-center bg-red-500/0 h-full w-full">
                    <div className="w-full bg-blue-500/0 flex gap-2 items-center">
                        <img
                            className="w-5"
                            src={`${
                                current_weather_data.weatherCondition
                                    .iconBaseUri
                            }.svg`}
                        />
                        <p>
                            {
                                current_weather_data.weatherCondition
                                    .description.text
                            }
                        </p>
                    </div>
                    <p className="text-[85px] w-full bg-blue-500/0">
                        {Math.round(current_weather_data.temperature.degrees)}°
                    </p>
                    <div className="flex flex-col w-full">
                        <p className="w-full">
                            Feels like{" "}
                            {Math.round(
                                current_weather_data.feelsLikeTemperature
                                    .degrees,
                            )}
                            °
                        </p>
                        <div className="flex w-full justify-left items-center gap-2">
                            <p className="">
                                High{" "}
                                {Math.round(
                                    current_weather_data
                                        .currentConditionsHistory.maxTemperature
                                        .degrees,
                                )}
                                °
                            </p>
                            ·
                            <p className="">
                                Low{" "}
                                {Math.round(
                                    current_weather_data
                                        .currentConditionsHistory.minTemperature
                                        .degrees,
                                )}
                                °
                            </p>
                        </div>
                        <p className="text-xs opacity-30 italic mt-2">
                            Last updated: {displayTime}
                        </p>
                    </div>
                </div>
            </Card>
        );
};

export default CurrentWeather;
