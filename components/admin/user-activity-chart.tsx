"use client"

import { useState } from "react"
import { subDays } from "date-fns"
import { BarChart, ChartContainer, Legend, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Generate sample data
const generateData = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - i - 1)
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      queries: Math.floor(Math.random() * 50) + 10,
      savedVerses: Math.floor(Math.random() * 20) + 5,
    }
  })
}

export function UserActivityChart() {
  const [timeframe, setTimeframe] = useState("7")
  const data = generateData(parseInt(timeframe))

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>User Activity</CardTitle>
          <CardDescription>
            Daily queries and saved verses
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="7 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend />
              <Bar 
                dataKey="queries" 
                name="Queries"
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="savedVerses" 
                name="Saved Verses"
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}