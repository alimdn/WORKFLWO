import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiHeart, FiSearch } from 'react-icons/fi';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // In a real app, this would fetch from your API
      // For now, we'll use mock data
      const mockProducts = [
        {
          id: '1',
          title: 'E-Book: Mastering Web Development',
          description: 'Comprehensive guide to modern web development techniques',
          price_cents: 2999,
          currency: 'USD',
          images: ['/images/ebook1.jpg'],
          category: 'Digital',
        },
        {
          id: '2',
          title: 'Online Course: JavaScript Fundamentals',
          description: 'Beginner-friendly course covering JavaScript basics',
          price_cents: 9999,
          currency: 'USD',
          images: ['/images/course1.jpg'],
          category: 'Digital',
        },
        {
          id: '3',
          title: 'Premium Plugin: Advanced Analytics',
          description: 'Powerful analytics plugin for your website',
          price_cents: 14999,
          currency: 'USD',
          images: ['/images/plugin1.jpg'],
          category: 'Plugins',
        },
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2);
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <Link href="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="card">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                  <div className="card-body">
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${formatPrice(product.price_cents)}</span>
                      <button className="btn text-sm">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Digital', 'Plugins', 'Courses', 'Books'].map((category) => (
              <div key={category} className="card text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto my-4" />
                <div className="card-body">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <Link href={`/products?category=${category}`} className="text-primary-600 hover:underline">
                    View Products
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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