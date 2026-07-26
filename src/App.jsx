import React from "react";

import CurrentWeather from "./CurrentWeather";
import CurrentCalendar from "./CurrentCalendar";
import CurrentTime from "./CurrentTime";

const App = () => {
    return (
        <div className="flex gap-5 w-full justify-center items-center h-screen">
            <CurrentWeather />
            <CurrentTime />
            <CurrentCalendar />
        </div>
    );
};

export default App;
