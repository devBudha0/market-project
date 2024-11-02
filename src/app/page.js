// src/app/page.js

"use client"

import ProductCard from '@/components/ui/ProductCard'
import SortAndFilter from '@/components/ui/sortBy'
import { fetchProducts } from '@/lib/fetchProducts'
import { handleSort } from '@/utils/sorting'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filteredCategory, setFilteredCategory] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts()
        setProducts(products)
        setFilteredProducts(products) // Set initial products for display
      } catch (err) {
        setError(err.message)
      }
    }
    loadProducts()
  }, [])

  const onSortChange = (sortOption) => {
    const sortedProducts = handleSort(filteredProducts, sortOption)
    setFilteredProducts(sortedProducts)
  }

  const onCategoryChange = (category) => {
    setFilteredCategory(category)

    // Filter products based on selected category
    if (category) {
      const categoryFilteredProducts = products.filter(
        (product) => product.category === category
      )
      setFilteredProducts(categoryFilteredProducts)
    } else {
      setFilteredProducts(products) // Show all products if no category is selected
    }
  }

  const handleAddToCart = (productId) => {
    console.log("Added product to cart:", productId)
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
        onSortChange={onSortChange}
        onCategoryChange={onCategoryChange}
      /> {/* Pass onSortChange and onCategoryChange to SortAndFilter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </main>
  )
}
