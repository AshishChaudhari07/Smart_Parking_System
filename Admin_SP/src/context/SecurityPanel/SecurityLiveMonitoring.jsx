import React, { useState, useEffect } from "react";
import { FaVideo, FaExclamationTriangle, FaClock } from "react-icons/fa";

const SecurityLiveMonitoring = () => {
    const [motionDetected, setMotionDetected] = useState(false);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Simulate Motion Detection Every Few Seconds
    useEffect(() => {
        const motionInterval = setInterval(() => {
            setMotionDetected(Math.random() < 0.3); // 30% chance of motion detected
        }, 5000);

        return () => clearInterval(motionInterval);
    }, []);

    // Live Clock Update
    useEffect(() => {
        const clockInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(clockInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
            {/* Card Container */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border-t-4 border-blue-500 relative">
                {/* Live Time Display */}
                <div className="absolute top-4 right-6 text-gray-300 text-sm flex items-center">
                    <FaClock className="mr-2" />
                    <span>{time}</span>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                    <FaVideo className="mr-2 text-blue-400 animate-pulse" /> Live Monitoring
                </h2>

                {/* Live Video Feed (Placeholder) */}
                <div className="w-full h-56 bg-gray-300 rounded-lg shadow-lg relative overflow-hidden border-2 border-gray-700">
                    <video
                        className="w-full h-full object-cover brightness-75 contrast-125 rounded-lg"
                        autoPlay
                        loop
                        muted
                        src="https://www.w3schools.com/html/mov_bbb.mp4" // Sample Video Placeholder
                    />

                    {/* Motion Detection Alert */}
                    {motionDetected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-70 text-white text-lg font-bold animate-pulse">
                            <FaExclamationTriangle className="mr-2" />
                            🚨 Motion Detected!
                        </div>
                    )}
                </div>

                {/* Motion Detection Status */}
                <div className={`mt-6 p-4 rounded-lg text-white font-semibold text-lg transition duration-300 ${
                    motionDetected ? "bg-red-600 animate-bounce" : "bg-green-600"
                }`}>
                    {motionDetected ? "🚨 Motion Detected" : "✅ No Motion Detected"}
                </div>

                {/* Refresh Button */}
                <button
                    onClick={() => setMotionDetected(Math.random() < 0.3)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                    Refresh Feed
                </button>
            </div>
        </div>
    );
};

export default SecurityLiveMonitoring;
