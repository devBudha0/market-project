"use client"

import ProductCard from '@/components/ProductCard'
import SortAndFilter from '@/components/sortBy'
import { fetchProducts } from '@/lib/fetchProducts'
import { applyFilters, handleAddToCart } from '@/lib/handlers' // Import your new handlers
import { useEffect, useState } from 'react'
import loading from './loading'

export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSortOption, setSelectedSortOption] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts()
        setProducts(products)
      } catch (err) {
        setError(err.message)
      }
    }
    loadProducts()
  }, [])

  // Get displayed products based on current filters and sorting
  const displayedProducts = applyFilters(products, selectedCategory, selectedSortOption)

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setSelectedSortOption(sortOption)
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  if (error) {
    return <p>Error fetching products: {error}</p>
  }

  if (displayedProducts.length === 0) {
    return loading()
  }

  return (
    <main className="p-4">
      <SortAndFilter onSortChange={handleSortChange} onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product.id)} // Use the imported handleAddToCart function
          />
        ))}
      </div>
    </main>
  )
}
