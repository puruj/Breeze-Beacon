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
        {/* Increase height if you want a taller chart overall */}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              /* Reduce bottom margin so the chart doesn’t leave extra space. */
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              {/* A subtle gradient for the main temperature line */}
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.7} />
                </linearGradient>
              </defs>

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
                /* 
                  Use a custom domain function so the minimum 
                  is only 1 degree below your lowest data point. 
                  This keeps the chart from adding a huge empty area.
                */
                domain={[
                  (dataMin: number) => dataMin - 1,
                  (dataMax: number) => dataMax + 1,
                ]}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                        <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
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

              {/* Main temperature line (with gradient stroke) */}
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

              {/* Feels Like line (dashed) */}
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
