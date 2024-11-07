// src/app/page.js

"use client"

import ProductCard from '@/components/ProductCard'
import SortAndFilter from '@/components/SortAndFilter'
import { useProducts } from '@/context/ProductsContext'
import { useCallback, useEffect, useState } from 'react'
import loadingSkeleton from './loadingSkeleton'

export default function Home() {
  const { products, error, loading, searchQuery } = useProducts()  // Destructure values from context
  const [filteredProducts, setFilteredProducts] = useState([]) // Filtered/sorted products for display
  const [sortOption, setSortOption] = useState('') // Store current sort option
  const [category, setCategory] = useState('All') // Store current category

  // Sorting function
  const applySort = useCallback((productsToSort, option) => {
    const sortedProducts = [...productsToSort]
    switch (option) {
      case 'aToZ':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'zToA':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'priceLowToHigh':
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case 'priceHighToLow':
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    return sortedProducts
  }, [])

  // Apply filters whenever products, search query, sort option, or category changes
  useEffect(() => {
    // Filter by search query (product name)
    let updatedProducts = products
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (category !== 'All') {
      updatedProducts = updatedProducts.filter(product => product.category === category)
    }

    // Apply sorting
    const sortedAndFilteredProducts = applySort(updatedProducts, sortOption)
    setFilteredProducts(sortedAndFilteredProducts)
  }, [products, searchQuery, sortOption, category, applySort])

  // Category change handler
  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory) // Update the current category
  }, [])

  // Sort change handler
  const handleSortChange = useCallback((option) => {
    setSortOption(option) // Update the current sort option
  }, [])

  if (loading) {
    return loadingSkeleton()
  } else if (error) {
    return <p>Error fetching products: {error}</p>
  } else if (products.length === 0) {
    return <p>No products available.</p>
  }

  return (
    <main className="p-4">
      <SortAndFilter
        products={filteredProducts}
        onSortChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
