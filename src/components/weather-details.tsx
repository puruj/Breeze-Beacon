import type { WeatherData } from "@/api/types"
import { format } from "date-fns"
import React from "react"
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"

interface WeatherDetailsProps {
  data: WeatherData
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data

  // Convert wind.deg to compass direction
  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round((degrees % 360) / 45)
    return directions[index]
  }

  // Format sunrise/sunset times
  const formatTime = (epochSec: number) =>
    format(new Date(epochSec * 1000), "h:mm a")

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ]

  return (
    // Fade-in/slide-up the entire card
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            {details.map((detail, i) => (
              // Animate each detail row
              <motion.div
                key={detail.title}
                className="flex items-center gap-3 rounded-lg border p-4"
                // Slight scale on hover for the row
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {/* Wrap the icon in a motion.span to animate the icon itself on hover */}
                <motion.span
                  className=""
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <detail.icon className={`h-5 w-5 ${detail.color}`} />
                </motion.span>

                <div>
                  <p className="text-sm font-medium leading-none">
                    {detail.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default WeatherDetails
