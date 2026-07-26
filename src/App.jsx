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
            {/* Background Video */}
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover -z-10"
            >
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <div className="absolute inset-0 w-full h-full object-cover -z-10">
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
                {/* <Iridescence
                    color={[0.8588235294117647, 0.7137254901960784, 1]}
                    mouseReact={false}
                    amplitude={0.1}
                    speed={0.6}
                /> */}
            </div>
            {/* Dark Overlay (improves component readability) */}
            <div className="absolute inset-0 bg-black/40 -z-10" />

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
