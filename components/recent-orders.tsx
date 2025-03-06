import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "1234",
    customer: "John Doe",
    amount: "$123.45",
    status: "Delivered",
  },
  {
    id: "2234",
    customer: "John Doe",
    amount: "$123.45",
    status: "Delivered",
  },
  {
    id: "3234",
    customer: "John Doe",
    amount: "$123.45",
    status: "Delivered",
  },
]

export default function RecentOrders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Order #{order.id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customer: {order.customer}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="font-medium text-gray-900 dark:text-white">{order.amount}</p>
              <Badge
                variant="outline"
                className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

