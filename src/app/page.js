// src/app/page.js

"use client"

import ProductCard from '@/components/ProductCard'
import SortAndFilter from '@/components/SortAndFilter'
import { useProducts } from '@/context/ProductsContext'
import { useCallback, useEffect, useState } from 'react'
import loadingSkeleton from './loadingSkeleton'

export default function Home() {
  const { products, error, loading } = useProducts()  // Destructure values from context
  const [filteredProducts, setFilteredProducts] = useState([]) // Filtered/sorted products for display
  const [sortOption, setSortOption] = useState('') // Store current sort option

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products)  // Initialize filtered products when products are available
    }
  }, [products])  // Depend on products to update filtered products

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

  const handleCategoryChange = useCallback((category) => {
    let updatedProducts
    if (category === 'All') {
      updatedProducts = products
    } else {
      updatedProducts = products.filter((product) => product.category === category)
    }

    // Apply the current sort option to the filtered products
    const sortedAndFilteredProducts = applySort(updatedProducts, sortOption)
    setFilteredProducts(sortedAndFilteredProducts)
  }, [products, sortOption, applySort])

  const handleSortChange = useCallback((option) => {
    setSortOption(option) // Update the current sort option
    setFilteredProducts(prevProducts => applySort(prevProducts, option))
  }, [applySort])

  if (loading) {
    return loadingSkeleton()
  }

  if (error) {
    return <p>Error fetching products: {error}</p>
  }

  if (products.length === 0) {
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
