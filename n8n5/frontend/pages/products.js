import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiHeart, FiSearch } from 'react-icons/fi';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, categoryFilter]);

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
        {
          id: '4',
          title: 'Design System Toolkit',
          description: 'Complete design system for your projects',
          price_cents: 4999,
          currency: 'USD',
          images: ['/images/design1.jpg'],
          category: 'Digital',
        },
      ];
      
      // Filter by category if selected
      let filteredProducts = mockProducts;
      if (categoryFilter) {
        filteredProducts = mockProducts.filter(product => product.category === categoryFilter);
      }
      
      // Filter by search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setProducts(filteredProducts);
      setTotalPages(1);
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
              <span className="text-gray-900 font-medium">Products</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium">Filters</h2>
              </div>
              <div className="card-body">
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={categoryFilter === ''}
                          onChange={() => setCategoryFilter('')}
                        />
                        <span className="ml-2">All Categories</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={categoryFilter === 'Digital'}
                          onChange={() => setCategoryFilter('Digital')}
                        />
                        <span className="ml-2">Digital</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={categoryFilter === 'Plugins'}
                          onChange={() => setCategoryFilter('Plugins')}
                        />
                        <span className="ml-2">Plugins</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={categoryFilter === 'Courses'}
                          onChange={() => setCategoryFilter('Courses')}
                        />
                        <span className="ml-2">Courses</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Products</h1>
              <div>
                <select className="form-input">
                  <option>Sort by: Featured</option>
                  <option>Sort by: Price: Low to High</option>
                  <option>Sort by: Price: High to Low</option>
                  <option>Sort by: Newest</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="card">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                      <div className="card-body">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          </div>
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${formatPrice(product.price_cents)}</span>
                          <div className="flex space-x-2">
                            <button className="btn-secondary text-sm">View</button>
                            <button className="btn text-sm">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="inline-flex rounded-md shadow">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                            currentPage === i + 1
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
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