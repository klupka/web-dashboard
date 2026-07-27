import React from "react";

import CurrentWeather from "./CurrentWeather";
import CurrentCalendar from "./CurrentCalendar";
import CurrentTime from "./CurrentTime";

// Import your video file or use a relative public path like "/background.mp4"
// import backgroundVideo from "./assets/background.mp4";

import Iridescence from "./Iridescence";
import ColorBends from "./ColorBends";

const App = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <ColorBends
                    colors={["#3B82F6"]}
                    rotation={90}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={0}
                    noise={0.15}
                    parallax={0.5}
                    iterations={1}
                    intensity={1.5}
                    bandWidth={6}
                    transparent
                    autoRotate={0}
                    color="#3B82F6"
                />
            </div>

            {/* <div className="absolute inset-0 bg-black/40 -z-10" /> */}

            {/* Dashboard Components */}
            <div className="relative z-10 flex gap-5 w-full h-full justify-center items-center">
                <CurrentWeather />
                <CurrentTime />
                <CurrentCalendar />
            </div>
        </div>
    );
};

export default App;
