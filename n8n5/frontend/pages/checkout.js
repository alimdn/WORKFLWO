import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiHeart, FiSearch, FiLock } from 'react-icons/fi';

export default function Checkout() {
  const [checkoutStep, setCheckoutStep] = useState('information'); // information, shipping, payment, review
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // stripe, paypal

  // Mock cart data
  const cartItems = [
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
  ];

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price_cents * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handlePayment = () => {
    // In a real app, this would process the payment
    alert(`Processing payment with ${paymentMethod}`);
  };

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
            
            <div className="flex items-center text-sm text-gray-500">
              <FiLock className="mr-1" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <nav aria-label="Progress">
                <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                  {['Information', 'Shipping', 'Payment', 'Review'].map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < ['information', 'shipping', 'payment', 'review'].indexOf(checkoutStep) + 1;
                    const isCurrent = stepNumber === ['information', 'shipping', 'payment', 'review'].indexOf(checkoutStep) + 1;
                    
                    return (
                      <li key={step} className="md:flex-1">
                        {isCompleted ? (
                          <div className="group flex flex-col border-l-4 border-primary-600 py-2 pl-4 hover:border-primary-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                            <span className="text-sm font-medium text-primary-600">{step}</span>
                          </div>
                        ) : isCurrent ? (
                          <div className="flex flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                            <span className="text-sm font-medium text-primary-600">{step}</span>
                          </div>
                        ) : (
                          <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                            <span className="text-sm font-medium text-gray-500">{step}</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>

            {/* Checkout Content */}
            <div className="card">
              <div className="card-body">
                {checkoutStep === 'information' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-input" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-input" />
                    </div>
                    
                    <div className="mb-6">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-input" />
                    </div>
                    
                    <div className="flex justify-between">
                      <Link href="/cart" className="btn-secondary">
                        Back to Cart
                      </Link>
                      <button 
                        onClick={() => setCheckoutStep('shipping')}
                        className="btn"
                      >
                        Continue to Shipping
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'shipping' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                    
                    <div className="mb-6">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-input" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="form-label">City</label>
                        <input type="text" className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">ZIP / Postal Code</label>
                        <input type="text" className="form-input" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="form-label">Country</label>
                        <select className="form-input">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">State / Province</label>
                        <input type="text" className="form-input" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep('information')}
                        className="btn-secondary"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setCheckoutStep('payment')}
                        className="btn"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <input
                          type="radio"
                          id="stripe"
                          name="paymentMethod"
                          checked={paymentMethod === 'stripe'}
                          onChange={() => setPaymentMethod('stripe')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit Card (Stripe)
                        </label>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                          PayPal
                        </label>
                      </div>
                    </div>
                    
                    {paymentMethod === 'stripe' && (
                      <div className="mb-6">
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
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
                        </div>
                        
                        <div className="mb-4">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-gray-600">Save this information for next time</span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                      <div className="mb-6">
                        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-8 mx-auto" />
                          <p className="mt-2 text-sm text-gray-600">You will be redirected to PayPal to complete your purchase</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep('shipping')}
                        className="btn-secondary"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setCheckoutStep('review')}
                        className="btn"
                      >
                        Continue to Review
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'review' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Contact Information</h3>
                      <p className="text-gray-600">john.doe@example.com</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Shipping Address</h3>
                      <p className="text-gray-600">123 Main Street</p>
                      <p className="text-gray-600">New York, NY 10001</p>
                      <p className="text-gray-600">United States</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <p className="text-gray-600">
                        {paymentMethod === 'stripe' ? 'Credit Card ending in 1234' : 'PayPal'}
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep('payment')}
                        className="btn-secondary"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handlePayment}
                        className="btn"
                      >
                        Complete Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium">Order Summary</h2>
              </div>
              <div className="card-body">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm font-medium text-gray-900">${formatPrice(item.price_cents * item.quantity)}</p>
                          </div>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <dl className="space-y-4 mt-6">
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