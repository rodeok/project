"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for top spiritual topics
const data = [
  { name: "Prayer", value: 35 },
  { name: "Faith", value: 25 },
  { name: "Forgiveness", value: 18 },
  { name: "Relationships", value: 15 },
  { name: "Purpose", value: 12 },
]

export function TopTopicsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Spiritual Topics</CardTitle>
        <CardDescription>
          Most common topics users seek guidance on
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                }}
                formatter={(value: number) => [`${value} queries`, 'Count']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}