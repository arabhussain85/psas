"use client"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-300 relative overflow-hidden",
        theme === "light"
          ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
          : "bg-gray-700 text-gray-200 hover:bg-gray-600",
      )}
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        {theme === "light" ? (
          <Moon className="h-5 w-5 transition-transform duration-300 transform rotate-0" />
        ) : (
          <Sun className="h-5 w-5 transition-transform duration-300 transform rotate-0" />
        )}
      </div>
      <span
        className={cn(
          "absolute inset-0 transition-transform duration-500",
          theme === "light" ? "bg-gray-700 translate-x-full" : "bg-gray-100 -translate-x-full",
        )}
      />
    </button>
  )
}

