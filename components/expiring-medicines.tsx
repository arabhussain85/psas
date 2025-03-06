const medicines = [
  {
    id: "1",
    name: "Medicine #1",
    stock: "25 Units",
    expires: "30 days",
    batch: "B1231",
  },
  {
    id: "2",
    name: "Medicine #2",
    stock: "25 Units",
    expires: "30 days",
    batch: "B1232",
  },
  {
    id: "3",
    name: "Medicine #3",
    stock: "25 Units",
    expires: "30 days",
    batch: "B1233",
  },
]

export default function ExpiringMedicines() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expiring Medicines</h3>
      <div className="space-y-4">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{medicine.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {medicine.stock}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-500 dark:text-red-400">Expires in {medicine.expires}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Batch: {medicine.batch}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

