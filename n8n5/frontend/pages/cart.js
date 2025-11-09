import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiHeart, FiSearch, FiX } from 'react-icons/fi';

export default function Cart() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      productId: '1',
      title: 'E-Book: Mastering Web Development',
      price_cents: 2999,
      quantity: 1,
      image: '/images/ebook1.jpg',
    },
    {
      id: '2',
      productId: '2',
      title: 'Online Course: JavaScript Fundamentals',
      price_cents: 9999,
      quantity: 2,
      image: '/images/course1.jpg',
    },
  ]);

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price_cents * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

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
            
            <div className="flex-1 mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 py-2 px-4 pl-10 focus:border-primary-500 focus:outline-none"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600">
                <FiShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </Link>
              <Link href="/wishlist" className="p-2 text-gray-700 hover:text-primary-600">
                <FiHeart className="h-6 w-6" />
              </Link>
              <Link href="/account" className="p-2 text-gray-700 hover:text-primary-600">
                <FiUser className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">Shopping Cart</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start adding some products to your cart</p>
            <div className="mt-6">
              <Link href="/products" className="btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="card-body">
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6">
                        <div className="flex">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                          
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  <Link href={`/products/${item.productId}`}>{item.title}</Link>
                                </h3>
                              </div>
                              <div className="flex items-center">
                                <p className="ml-4 text-lg font-medium text-gray-900">
                                  ${formatPrice(item.price_cents * item.quantity)}
                                </p>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="ml-4 text-gray-400 hover:text-gray-500"
                                >
                                  <FiX className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="btn-secondary text-sm"
                                >
                                  -
                                </button>
                                <span className="mx-2 text-gray-700">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="btn-secondary text-sm"
                                >
                                  +
                                </button>
                              </div>
                              <p className="ml-4 text-gray-500">
                                ${formatPrice(item.price_cents)} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/products" className="btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-medium">Order Summary</h2>
                </div>
                <div className="card-body">
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">${formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd className="font-medium text-gray-900">${formatPrice(shipping)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Tax</dt>
                      <dd className="font-medium text-gray-900">${formatPrice(tax)}</dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <dt className="text-lg font-medium text-gray-900">Total</dt>
                      <dd className="text-lg font-medium text-gray-900">${formatPrice(total)}</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6">
                    <Link href="/checkout" className="btn w-full justify-center">
                      Proceed to Checkout
                    </Link>
                  </div>
                  
                  <div className="mt-4">
                    <Link href="/products" className="btn-secondary w-full justify-center">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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