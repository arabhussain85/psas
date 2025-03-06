"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Calendar, Download, Printer, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import Dashboard from "@/components/dashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-15",
    total: "$123.45",
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-14",
    total: "$69.99",
    status: "processing",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-13",
    total: "$56.78",
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: {
      name: "Alice Brown",
      email: "alice.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-12",
    total: "$234.56",
    status: "pending",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: {
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-11",
    total: "$45.67",
    status: "canceled",
    items: 1,
  },
  {
    id: "ORD-006",
    customer: {
      name: "Eva Wilson",
      email: "eva.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-10",
    total: "$123.00",
    status: "delivered",
    items: 2,
  },
  {
    id: "ORD-007",
    customer: {
      name: "Frank Miller",
      email: "frank.miller@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-09",
    total: "$78.50",
    status: "processing",
    items: 3,
  },
  {
    id: "ORD-008",
    customer: {
      name: "Grace Taylor",
      email: "grace.taylor@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-08",
    total: "$199.99",
    status: "shipped",
    items: 5,
  },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    delivered: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
      label: "Delivered",
    },
    processing: {
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      label: "Processing",
    },
    shipped: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      label: "Shipped",
    },
    pending: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
      label: "Pending",
    },
    canceled: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
      label: "Canceled",
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

  return (
    <Badge variant="outline" className={cn(config.color)}>
      {config.label}
    </Badge>
  )
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0

    if (sortField === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortField === "total") {
      comparison = Number.parseFloat(a.total.replace("$", "")) - Number.parseFloat(b.total.replace("$", ""))
    } else if (sortField === "id") {
      comparison = a.id.localeCompare(b.id)
    } else if (sortField === "customer") {
      comparison = a.customer.name.localeCompare(b.customer.name)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage)

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(currentOrders.map((order) => order.id))
    }
  }

  // Handle select order
  const handleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  return (
    <Dashboard>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Orders Management</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>More Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Price Range</DropdownMenuItem>
                <DropdownMenuItem>Payment Method</DropdownMenuItem>
                <DropdownMenuItem>Number of Items</DropdownMenuItem>
                <DropdownMenuItem>Customer Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all orders"
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                  <div className="flex items-center gap-1">
                    <span>Order ID</span>
                    {sortField === "id" &&
                      (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                  <div className="flex items-center gap-1">
                    <span>Customer</span>
                    {sortField === "customer" &&
                      (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                  <div className="flex items-center gap-1">
                    <span>Date</span>
                    {sortField === "date" &&
                      (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("total")}>
                  <div className="flex items-center gap-1">
                    <span>Total</span>
                    {sortField === "total" &&
                      (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className={cn(
                      "transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
                      selectedOrders.includes(order.id) && "bg-blue-50 dark:bg-blue-900/20",
                    )}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => handleSelectOrder(order.id)}
                        aria-label={`Select order ${order.id}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                          <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{order.customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Order</DropdownMenuItem>
                          <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No orders found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, sortedOrders.length)} of {sortedOrders.length}{" "}
            orders
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                let pageNumber = index + 1

                // Adjust page numbers for pagination with ellipsis
                if (totalPages > 5 && currentPage > 3) {
                  pageNumber = currentPage - 3 + index

                  if (pageNumber > totalPages) {
                    return null
                  }

                  if (index === 0 && pageNumber > 1) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                      </PaginationItem>
                    )
                  }

                  if (index === 1 && pageNumber > 2) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                }

                return (
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => setCurrentPage(pageNumber)} isActive={currentPage === pageNumber}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Orders</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">128</p>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
              +12% this month
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending Orders</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">24</p>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
              Needs attention
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delivered Today</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">16</p>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
              On schedule
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Canceled Orders</h3>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">7</p>
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
              -2 from last week
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

