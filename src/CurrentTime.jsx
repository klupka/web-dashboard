import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@heroui/react";

const CurrentTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Convert to 12-hour format
    const displayHours = hours % 12 || 12;

    // Determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";

    const displayTime = `${displayHours}:${String(minutes).padStart(2, "0")}`;

    const currentDate = new Date();

    const currentDay = currentDate
        .toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        })
        .replace(",", "");

    return (
        <Card className="text-center flex flex-col justify-center items-center w-[600px] h-[300px] glass-card">
            <div className="flex items-end">
                <p className="text-[120px] leading-none">{displayTime}</p>
                <p className="mb-2.5 ml-2">{period}</p>
            </div>
            <p>{currentDay}</p>
        </Card>
    );
};

export default CurrentTime;
