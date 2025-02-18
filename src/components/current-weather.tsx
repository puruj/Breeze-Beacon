import * as React from "react"
import type { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent } from "./ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"

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

  const formatTemp = (t: number) => `${Math.round(t)}°`

  return (
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
              <p className="text-7xl font-extrabold tracking-tighter">
                {formatTemp(temp)}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                Feels like {formatTemp(feels_like)}
              </p>
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
                  <p className="text-sm text-muted-foreground">
                    {humidity}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">
                    {speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: icon & description */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative flex aspect-square w-full max-w-[200px]">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather
