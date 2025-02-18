import type { ForecastData } from "@/api/types"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { format } from "date-fns"

export interface HourlyTemperatureProps {
  data: ForecastData
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  // Just the first 8 data points (e.g., next 8 hours)
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"), // e.g. "1AM"
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }))

  return (
    <Card className="flex-1 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Today&apos;s Temperature</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              {/*
                1. A linearGradient definition so we can apply a subtle gradient
                   to the main temperature line.
              */}
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.7} />
                </linearGradient>
              </defs>

              {/*
                2. X and Y axes with minimal styling (no lines/ticks) and
                   a Y domain that gives a bit of headroom above and below.
              */}
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickSize={8}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickSize={8}
                tickFormatter={(value) => `${value}°`}
                domain={["dataMin - 3", "dataMax + 3"]} // Add a little extra space
              />

              {/*
                3. Custom tooltip that displays both "Temperature" and "Feels Like",
                   plus the time of day.
              */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                          {payload[0].payload.time}
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-start">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">{payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">{payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              {/*
                4. Main Temperature Line:
                   - Uses the gradient
                   - Increased strokeWidth
                   - Smooth animation
                   - Rounded line caps
                   - Larger active dot on hover
              */}
              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#tempGradient)"
                strokeWidth={3}
                strokeLinecap="round"
                dot={false}
                isAnimationActive={true}
                animationBegin={300}
                animationDuration={1500}
                animationEasing="ease-in-out"
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#2563eb", fill: "#fff" }}
              />

              {/*
                5. "Feels Like" Line:
                   - Slightly thinner, dashed
                   - Similar animation props
              */}
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                strokeLinecap="round"
                dot={false}
                strokeDasharray="4 4"
                isAnimationActive={true}
                animationBegin={300}
                animationDuration={1500}
                animationEasing="ease-in-out"
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#64748b", fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default HourlyTemperature
