import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"
import { format } from "date-fns"
import type { ForecastData } from "@/api/types"
import { motion } from "framer-motion"

interface WeatherForecastProps {
  data: ForecastData
}

interface DailyForecast {
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  weather: {
    main: string
    description: string
    icon: string
  }[]
  dt: number
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  // Group forecasts by day
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd")

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather,
        dt: forecast.dt,
      }
    } else {
      acc[date].temp_min = Math.min(
        acc[date].temp_min,
        forecast.main.temp_min
      )
      acc[date].temp_max = Math.max(
        acc[date].temp_max,
        forecast.main.temp_max
      )
      // Could average humidity/wind, but let's just take the last
      acc[date].humidity = forecast.main.humidity
      acc[date].wind = forecast.wind.speed
    }
    return acc
  }, {} as Record<string, DailyForecast>)

  // Next 5 days after "today"
  const nextDays = Object.keys(dailyForecasts).slice(1, 6)

  const formatTemp = (t: number) => `${Math.round(t)}°`

  return (
    // Fade in the entire card
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {nextDays.map((dayKey, i) => {
              const day = dailyForecasts[dayKey]

              return (
                // Hover on entire row
                <motion.div
                  key={day.dt}
                  className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {/* Date & weather description */}
                  <div>
                    <p className="font-medium">
                      {format(new Date(day.dt * 1000), "EEE, MMM d")}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {day.weather[0].description}
                    </p>
                  </div>

                  {/* Min/Max temps */}
                  <div className="flex justify-end gap-1">
                    <ArrowDown className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{formatTemp(day.temp_min)}</span>
                    <ArrowUp className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{formatTemp(day.temp_max)}</span>
                  </div>

                  {/* Humidity & Wind Speed with icon hover animations */}
                  <div className="flex justify-end gap-4">
                    {/* Animate the Droplets icon on row hover */}
                    <div className="flex items-center gap-1">
                      <motion.span
                        whileHover={{ rotate: 20 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Droplets className="h-4 w-4 text-blue-500" />
                      </motion.span>
                      <span className="text-sm">{day.humidity}%</span>
                    </div>

                    {/* Animate the Wind icon on row hover */}
                    <div className="flex items-center gap-1">
                      <motion.span
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Wind className="h-4 w-4 text-blue-500" />
                      </motion.span>
                      <span className="text-sm">
                        {day.wind.toFixed(2)} m/s
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}