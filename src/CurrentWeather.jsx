import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Skeleton } from "@heroui/react";

const CurrentWeather = () => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const latitude = import.meta.env.VITE_LATITUDE;
    const longitude = import.meta.env.VITE_LONGITUDE;
    const units_system = "IMPERIAL";

    const current_conditions_endpoint = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${api_key}&location.latitude=${latitude}&location.longitude=${longitude}&unitsSystem=${units_system}`;

    const [current_weather_data, set_current_weather_data] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Helper to format date into 12-hour time (e.g., "2:45 PM")
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const displayHours = hours % 12 || 12;
        const period = hours >= 12 ? "PM" : "AM";
        return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
    };

    const get_current_weather_conditions = async () => {
        try {
            const response = await axios.get(current_conditions_endpoint);
            set_current_weather_data(response.data);
            // Update timestamp when new data is received
            setLastUpdated(formatTime(new Date()));
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    };

    useEffect(() => {
        // Initial fetch on mount
        get_current_weather_conditions();

        // Set up polling interval (e.g., every 30 minutes = 30 * 60 * 1000)
        const intervalMs = 30 * 60 * 1000;
        const interval = setInterval(
            get_current_weather_conditions,
            intervalMs,
        );

        return () => clearInterval(interval);
    }, []);

    if (!current_weather_data) {
        return (
            <Skeleton className="h-[300px] aspect-square rounded-3xl opacity-25" />
        );
    }

    return (
        <Card className="text-left aspect-square w-[300px] glass-card">
            <div className="flex flex-col justify-between items-center h-full w-full">
                <div className="w-full flex gap-2 items-center">
                    <img
                        className="w-5"
                        src={`${current_weather_data.weatherCondition.iconBaseUri}.svg`}
                        alt="Weather icon"
                    />
                    <p>
                        {current_weather_data.weatherCondition.description.text}
                    </p>
                </div>

                <p className="text-[85px] w-full">
                    {Math.round(current_weather_data.temperature.degrees)}°
                </p>

                <div className="flex flex-col w-full">
                    <p className="w-full">
                        Feels like{" "}
                        {Math.round(
                            current_weather_data.feelsLikeTemperature.degrees,
                        )}
                        °
                    </p>
                    <div className="flex w-full justify-left items-center gap-2">
                        <p>
                            High{" "}
                            {Math.round(
                                current_weather_data.currentConditionsHistory
                                    .maxTemperature.degrees,
                            )}
                            °
                        </p>
                        ·
                        <p>
                            Low{" "}
                            {Math.round(
                                current_weather_data.currentConditionsHistory
                                    .minTemperature.degrees,
                            )}
                            °
                        </p>
                    </div>
                    <p className="text-xs opacity-30 italic mt-2">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CurrentWeather;
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
