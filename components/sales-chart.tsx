"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "Jan", sales: 11 },
  { name: "Feb", sales: 15 },
  { name: "Mar", sales: 3 },
  { name: "Apr", sales: 6 },
  { name: "May", sales: 2 },
  { name: "Jun", sales: 5 },
]

export default function SalesChart() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const textColor = isDark ? "#e5e7eb" : "#374151"
  const gridColor = isDark ? "#374151" : "#e5e7eb"

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Sales</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
                color: textColor,
              }}
            />
            <Bar dataKey="sales" fill="#4fd1c5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

