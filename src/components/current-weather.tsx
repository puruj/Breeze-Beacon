import * as React from "react"
import type { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent } from "./ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CurrentWeatherProps {
  data: WeatherData
  locationName?: GeocodingResponse
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data

  // Helper to format temperature (integer + degree sign)
  const formatTemp = (t: number) => `${Math.round(t)}°`

  return (
    // Card container with initial entrance animation + slight hover scale
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden rounded-lg shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left column: city/state/country, temps, humidity/wind */}
            <div className="space-y-6">
              {/* City / State / Country */}
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-sm text-muted-foreground">
                    {locationName.state}
                  </span>
                )}
                <p className="text-sm text-muted-foreground">
                  {locationName?.country}
                </p>
              </div>

              {/* Main Temperature */}
              <div className="space-y-1">
                {/*
                  AnimatePresence with a key on temp to smoothly transition 
                  when the numeric value changes.
                */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={temp} // triggers unmount/mount on temp change
                    initial={{ y: -10, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="block text-7xl font-extrabold tracking-tighter"
                  >
                    {formatTemp(temp)}
                  </motion.span>
                </AnimatePresence>

                {/* Feels Like */}
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={feels_like}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Feels like {formatTemp(feels_like)}
                  </motion.p>
                </AnimatePresence>

                <div className="flex gap-3 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="h-4 w-4" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-4 w-4" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>

              <hr className="my-4 border-muted-foreground/20" />

              {/* Humidity & Wind Speed */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: icon & description */}
            <div className="flex flex-col items-center justify-center h-full">
              {/*
                Wiggle on hover: a slight left-right rotation effect 
                for the weather icon. 
              */}
              <motion.div
                className="relative flex aspect-square w-full max-w-[200px]"
                whileHover={{
                  rotate: [0, 5, -5, 3, -3, 0],
                  transition: { duration: 0.6 },
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                  className="h-full w-full object-contain"
                />
                <div className="absolute bottom-0 w-full text-center">
                  <p className="text-sm font-medium capitalize">
                    {currentWeather.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default CurrentWeather
