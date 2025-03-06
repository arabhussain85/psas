"use client"

import type React from "react"

import { BarChart2, Package, ShoppingCart, Truck, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, isActive = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-4 py-3 text-left transition-all duration-200 rounded-lg mx-2 my-1",
        isActive
          ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-medium shadow-sm"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-gray-200",
      )}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
      {isActive && <div className="ml-auto w-1.5 h-5 bg-teal-500 dark:bg-teal-400 rounded-full" />}
    </button>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="py-4">
      <Link href="/">
        <NavItem icon={<BarChart2 className="h-5 w-5" />} label="Dashboard" isActive={pathname === "/"} />
      </Link>
      <Link href="/orders">
        <NavItem icon={<ShoppingCart className="h-5 w-5" />} label="Orders" isActive={pathname === "/orders"} />
      </Link>
      <Link href="/delivery">
        <NavItem icon={<Truck className="h-5 w-5" />} label="Delivery" isActive={pathname === "/delivery"} />
      </Link>
      <Link href="/inventory">
        <NavItem icon={<Package className="h-5 w-5" />} label="Inventory" isActive={pathname === "/inventory"} />
      </Link>
      <Link href="/customers">
        <NavItem icon={<Users className="h-5 w-5" />} label="Customers" isActive={pathname === "/customers"} />
      </Link>
    </nav>
  )
}

