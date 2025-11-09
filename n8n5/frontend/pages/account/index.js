import { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiShoppingBag, FiHeart, FiCreditCard, FiSettings, FiLogOut } from 'react-icons/fi';

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2023',
    totalOrders: 12,
    wishlistItems: 5,
  };
  
  // Mock orders data
  const orders = [
    {
      id: '12345',
      date: '2023-06-15',
      total: 29.99,
      status: 'Delivered',
      items: 2,
    },
    {
      id: '12346',
      date: '2023-05-22',
      total: 99.99,
      status: 'Delivered',
      items: 1,
    },
    {
      id: '12347',
      date: '2023-04-10',
      total: 49.99,
      status: 'Cancelled',
      items: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                E-Shop
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/account" className="p-2 text-primary-600">
                <FiUser className="h-6 w-6" />
              </Link>
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600">
                <FiShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">3</span>
              </Link>
              <Link href="/wishlist" className="p-2 text-gray-700 hover:text-primary-600">
                <FiHeart className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium">{user.name}</h2>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'dashboard'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiUser className="mr-3 h-5 w-5" />
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'orders'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiShoppingBag className="mr-3 h-5 w-5" />
                    My Orders
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'wishlist'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiHeart className="mr-3 h-5 w-5" />
                    Wishlist
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'payment'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiCreditCard className="mr-3 h-5 w-5" />
                    Payment Methods
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'settings'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiSettings className="mr-3 h-5 w-5" />
                    Account Settings
                  </button>
                  
                  <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    <FiLogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="card">
                    <div className="card-body">
                      <div className="flex items-center">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <FiShoppingBag className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Total Orders</p>
                          <p className="text-2xl font-semibold">{user.totalOrders}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card">
                    <div className="card-body">
                      <div className="flex items-center">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <FiHeart className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                          <p className="text-2xl font-semibold">{user.wishlistItems}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card">
                    <div className="card-body">
                      <div className="flex items-center">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <FiUser className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Member Since</p>
                          <p className="text-2xl font-semibold">{user.joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card">
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
                              Date
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
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${order.total}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link href={`/account/orders/${order.id}`} className="text-primary-600 hover:text-primary-900">
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
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-medium">My Orders</h2>
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
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Items
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
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.items} items
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${order.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`/account/orders/${order.id}`} className="text-primary-600 hover:text-primary-900">
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="card">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                      <div className="card-body">
                        <h3 className="text-lg font-semibold mb-2">Product Title {item}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          Product description goes here with details about the item.
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${(Math.random() * 100).toFixed(2)}</span>
                          <div className="flex space-x-2">
                            <button className="btn-secondary text-sm">View</button>
                            <button className="btn text-sm">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-medium">Payment Methods</h2>
                </div>
                <div className="card-body">
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-4">Saved Payment Methods</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                        <div className="ml-4">
                          <p className="font-medium">Visa ending in 1234</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                        <button className="ml-auto text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-4">Add New Payment Method</h3>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="form-label">Card Number</label>
                          <div className="bg-white border border-gray-300 rounded-md px-3 py-2">
                            <div className="flex items-center">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-5 mr-2" />
                              <span className="text-gray-500">**** **** **** ****</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Expiration Date</label>
                          <div className="bg-white border border-gray-300 rounded-md px-3 py-2">
                            <span className="text-gray-500">MM/YY</span>
                          </div>
                        </div>
                        <div>
                          <label className="form-label">CVC</label>
                          <div className="bg-white border border-gray-300 rounded-md px-3 py-2">
                            <span className="text-gray-500">***</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="btn">Add Payment Method</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-medium">Account Settings</h2>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        defaultValue={user.name}
                      />
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        defaultValue={user.email}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <button className="btn">Update Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">E-Shop</h3>
              <p className="text-gray-400">
                Your one-stop destination for digital products and services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@eshop.com</li>
                <li>Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}