import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiShoppingBag, FiPackage, FiUsers, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock stats data
  const stats = [
    { name: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: FiBarChart2 },
    { name: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: FiUsers },
    { name: 'Sales', value: '+12,234', change: '+19% from last month', icon: FiShoppingBag },
    { name: 'Active Now', value: '+573', change: '+201 since last hour', icon: FiPackage },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin" className="text-2xl font-bold text-primary-600">
                Admin Panel
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2 text-gray-700"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="p-2 text-gray-700 hover:text-primary-600">
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className={`lg:w-64 lg:pr-8 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="card">
              <div className="card-body">
                <nav className="space-y-1">
                  <Link
                    href="/admin"
                    className="bg-primary-100 text-primary-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <FiHome className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>
                  
                  <Link
                    href="/admin/products"
                    className="text-gray-700 hover:bg-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <FiPackage className="mr-3 h-5 w-5" />
                    Products
                  </Link>
                  
                  <Link
                    href="/admin/orders"
                    className="text-gray-700 hover:bg-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <FiShoppingBag className="mr-3 h-5 w-5" />
                    Orders
                  </Link>
                  
                  <Link
                    href="/admin/customers"
                    className="text-gray-700 hover:bg-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <FiUsers className="mr-3 h-5 w-5" />
                    Customers
                  </Link>
                  
                  <Link
                    href="/admin/reports"
                    className="text-gray-700 hover:bg-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <FiBarChart2 className="mr-3 h-5 w-5" />
                    Reports
                  </Link>
                  
                  <Link
                    href="/admin/settings"
                    className="text-gray-700 hover:bg-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  >
                    <FiSettings className="mr-3 h-5 w-5" />
                    Settings
                  </Link>
                  
                  <button className="w-full text-left text-gray-700 hover:bg-gray-100 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                    <FiLogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome to your admin dashboard. Here you can manage your store.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="card-body">
                    <div className="flex items-center">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <stat.icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-semibold">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recent Orders */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-lg font-medium">Recent Orders</h2>
              </div>
              <div className="card-body">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[1, 2, 3, 4, 5].map((order) => (
                        <tr key={order}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #ORD-{12340 + order}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Customer {order}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${(Math.random() * 100 + 20).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/admin/orders/${order}`} className="text-primary-600 hover:text-primary-900">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Recent Products */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium">Recent Products</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((product) => (
                    <div key={product} className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">Product {product}</h3>
                        <p className="text-sm text-gray-500">${(Math.random() * 100).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">E-Shop Admin</h3>
              <p className="text-gray-400">
                Manage your e-commerce store efficiently.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/admin/products" className="text-gray-400 hover:text-white">Products</Link></li>
                <li><Link href="/admin/orders" className="text-gray-400 hover:text-white">Orders</Link></li>
                <li><Link href="/admin/customers" className="text-gray-400 hover:text-white">Customers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Reports</h3>
              <ul className="space-y-2">
                <li><Link href="/admin/reports/sales" className="text-gray-400 hover:text-white">Sales</Link></li>
                <li><Link href="/admin/reports/traffic" className="text-gray-400 hover:text-white">Traffic</Link></li>
                <li><Link href="/admin/reports/inventory" className="text-gray-400 hover:text-white">Inventory</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: admin@eshop.com</li>
                <li>Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} E-Shop Admin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}