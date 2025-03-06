import type React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

interface StatCardProps {
  title: string
  value: string
  change: string
  period: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  isNegative?: boolean
  className?: string
}

const statCardVariants = cva(
  "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-gray-200 dark:border-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export default function StatCard({
  title,
  value,
  change,
  period,
  icon,
  iconBg,
  iconColor,
  isNegative = false,
  className,
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant: "default" }), className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={cn("rounded-full p-3 flex items-center justify-center", iconBg)}>
          <span className={cn("", iconColor)}>{icon}</span>
        </div>
      </div>
      <div className="mt-4">
        <span
          className={cn(
            "inline-flex items-center text-sm font-medium",
            isNegative ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400",
          )}
        >
          {change} <span className="ml-1 text-gray-500 dark:text-gray-400 font-normal">{period}</span>
        </span>
      </div>
    </div>
  )
}

