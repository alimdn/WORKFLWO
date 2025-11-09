import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiHeart, FiSearch, FiStar } from 'react-icons/fi';

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    id: '1',
    title: 'E-Book: Mastering Web Development',
    description: 'Comprehensive guide to modern web development techniques. This book covers everything from HTML and CSS fundamentals to advanced JavaScript concepts, React, Node.js, and database integration. Perfect for beginners and intermediate developers looking to enhance their skills.',
    price_cents: 2999,
    currency: 'USD',
    images: ['/images/ebook1.jpg', '/images/ebook2.jpg', '/images/ebook3.jpg'],
    category: 'Digital',
    rating: 4.5,
    reviews: 128,
  };

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2);
  };

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} ${product.title} to cart`);
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
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">3</span>
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
              <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{product.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 mb-4" />
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 cursor-pointer ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">${formatPrice(product.price_cents)}</span>
                <div className="flex items-center">
                  <button
                    className="btn-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="mx-4">{quantity}</span>
                  <button
                    className="btn-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="btn flex-1"
              >
                Add to Cart
              </button>
              <button className="btn-secondary">
                <FiHeart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-primary-500 text-primary-600 py-4 px-1 text-sm font-medium">
                Description
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                Reviews
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                Specifications
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            <div className="prose max-w-none">
              <h3>Description</h3>
              <p>{product.description}</p>
              <p>This comprehensive guide covers everything from HTML and CSS fundamentals to advanced JavaScript concepts, React, Node.js, and database integration. Perfect for beginners and intermediate developers looking to enhance their skills.</p>
              <ul>
                <li>HTML and CSS fundamentals</li>
                <li>JavaScript basics and advanced concepts</li>
                <li>React framework</li>
                <li>Node.js backend development</li>
                <li>Database integration</li>
                <li>Deployment and best practices</li>
              </ul>
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