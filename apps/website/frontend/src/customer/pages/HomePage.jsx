import { useState, useEffect } from "react";
import ProductCards from "../features/ProductCards";

export default function HomePage() {
   
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Categories Section */}
            <div className="bg-white shadow-sm border-t">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'Electronics', color: 'from-blue-500 to-blue-600' },
                            { name: 'Fashion', color: 'from-pink-500 to-rose-500' },
                            { name: 'Home & Garden', color: 'from-green-500 to-emerald-500' },
                            { name: 'Books & Media', color: 'from-purple-500 to-violet-500' },
                            { name: 'Sports', color: 'from-orange-500 to-red-500' },
                            { name: 'Health & Beauty', color: 'from-teal-500 to-cyan-500' }
                        ].map((category, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl text-center group-hover:-translate-y-2">
                                    
                                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Advanced Filters Bar */}
            <div className="bg-white border-t border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-3 items-center">
                            <select className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Fashion & Accessories</option>
                                <option>Home & Garden</option>
                                <option>Books & Entertainment</option>
                                <option>Sports</option>
                                <option>Health & Beauty</option>
                            </select>
                            <select className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all">
                                <option>Any Price</option>
                                <option>Under $25</option>
                                <option>$25 - $50</option>
                                <option>$50 - $100</option>
                                <option>$100 - $200</option>
                                <option>Over $200</option>
                            </select>
                            <select className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all">
                                <option>Best Match</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Customer Reviews</option>
                                <option>Newest First</option>
                                <option>Best Sellers</option>
                            </select>
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                                Apply
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                Clear all
                            </button>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="text-gray-600">
                                <span className="font-semibold text-gray-900">2,847,392</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Prime</span>
                                <div className="w-8 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative">
                                    <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Products Section */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                        <p className="text-gray-600">Discover trending items and customer favorites</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">View:</span>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button className="p-2 bg-white rounded-md shadow-sm text-blue-600">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-700">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Products Grid */}
                <ProductCards />
            </div>

                        
            <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            Premium Marketplace
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                            Discover millions of products with fast delivery, secure payments, and exceptional service
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Free Shipping
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Secure Payment
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Trusted Reviews
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Shop With Us?</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V8z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Fast & Free Shipping</h4>
                        <p className="text-gray-600 text-sm">Free delivery on orders over $35. Prime members get unlimited free shipping.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Secure Shopping</h4>
                        <p className="text-gray-600 text-sm">Your payment information is encrypted and secure. Shop with confidence.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
                        <p className="text-gray-600 text-sm">Not satisfied? Return items within 30 days for a full refund. No questions asked.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}