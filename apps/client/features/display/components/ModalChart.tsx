"use client"
import React from 'react'
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Dot, Line, LineChart, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"


export const description = "A line chart with a custom label"
const chartData = [
  { date: "2024-01-01", value: 275, fill: "var(--color-chrome)" },
  { date: "2024-06-01", value: 200, fill: "var(--color-safari)" },
  { date: "2024-12-01", value: 187, fill: "var(--color-firefox)" },
  { date: "2025-01-01", value: 173, fill: "var(--color-edge)" },
  { date: "2025-06-01", value: 90, fill: "var(--color-other)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


const ModalChart = () => {



  return (
     <div className=" w-110 h-48 p-0 ">
     
      <CardContent className='p-0  w-100 h-48 mx-auto '>
        <ChartContainer config={chartConfig} className=" h-46 w-100  ">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <XAxis dataKey="date"/>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="value"
                  hideLabel
                  
                />
              }
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="#21376A"
              strokeWidth={2}
              dot={{
                fill: "#21376A",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="value"
                formatter={(value: keyof typeof chartConfig) =>
                  value//chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </div>
  )
}

export default ModalChart
