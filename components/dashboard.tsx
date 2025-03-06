"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, Bell, DollarSign, Menu, TrendingUp, User, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Sidebar from "@/components/sidebar"
import StatCard from "@/components/stat-card"
import SalesChart from "@/components/sales-chart"
import ProfitChart from "@/components/profit-chart"
import RecentOrders from "@/components/recent-orders"
import ExpiringMedicines from "@/components/expiring-medicines"
import ThemeToggle from "@/components/theme-toggle"

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Check on mount
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={cn("min-h-screen transition-colors duration-300", theme === "dark" ? "dark" : "")}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded bg-teal-500 flex items-center justify-center mr-2">
                <span className="text-white">📦</span>
              </div>
              <h1 className="text-xl font-bold text-teal-500">PharmaSaaS</h1>
            </div>
            {isMobile && (
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>

              <div className="flex items-center space-x-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Bell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {children ? (
              children
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    title="Total Customers"
                    value="1,234"
                    change="+7.2%"
                    period="from last month"
                    icon={<Users className="h-5 w-5" />}
                    iconBg="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800"
                    iconColor="text-white"
                    className="animate-fade-in"
                  />
                  <StatCard
                    title="Total Sales"
                    value="$45,678"
                    change="+5%"
                    period="from last month"
                    icon={<DollarSign className="h-5 w-5" />}
                    iconBg="bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800"
                    iconColor="text-white"
                    className="animate-fade-in delay-100"
                  />
                  <StatCard
                    title="Total Profit"
                    value="$12,345"
                    change="+3.5%"
                    period="from last month"
                    icon={<TrendingUp className="h-5 w-5" />}
                    iconBg="bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800"
                    iconColor="text-white"
                    className="animate-fade-in delay-200"
                  />
                  <StatCard
                    title="Out of Stock"
                    value="23"
                    change="-5"
                    period="items since last week"
                    icon={<AlertCircle className="h-5 w-5" />}
                    iconBg="bg-gradient-to-br from-red-400 to-red-600 dark:from-red-600 dark:to-red-800"
                    iconColor="text-white"
                    isNegative
                    className="animate-fade-in delay-300"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  <SalesChart />
                  <ProfitChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <RecentOrders />
                  <ExpiringMedicines />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

