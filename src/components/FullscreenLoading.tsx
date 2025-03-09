import { useState, useEffect } from "react";
import CreativeEarthLoading from "./CreativeEarthLoading";

export default function FullscreenLoading() {
  const [loadingText, setLoadingText] = useState("Initializing");
  const [showLoading, setShowLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const texts = [
      "Initializing",
      "Loading resources",
      "Preparing experience",
      "Almost ready",
      "Launching",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
  };

  if (!showLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-md px-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
          IntelleJ
        </h1>

        <div className="w-64 h-64 mb-8">
          <CreativeEarthLoading onLoadComplete={handleLoadComplete} />
        </div>

        <div className="text-center">
          <p className="text-lg font-medium mb-2">{loadingText}</p>
          <p className="text-sm text-muted-foreground">
            Preparing an amazing experience for you
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2 mt-4">
          <div
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
