"use client"

import ProductCard from '@/components/ProductCard'
import SortAndFilter from '@/components/SortAndFilter'
import { fetchProducts } from '@/lib/fetchProducts'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([]) // Original products from the backend
  const [filteredProducts, setFilteredProducts] = useState([]) // Filtered/sorted products for display
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
        setFilteredProducts(fetchedProducts) // Initialize with all products
      } catch (err) {
        setError(err.message)
      }
    }
    loadProducts()
  }, [])

  // UseEffect for handling URL parameter changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category') || 'All'
    const sort = params.get('sort') || 'Sort by'

    // Create a new array to avoid modifying the original products directly
    let updatedProducts = [...products]

    // Filter products based on the selected category
    if (category && category !== 'All') {
      updatedProducts = updatedProducts.filter(product => product.category === category)
    }

    // Sort products according to the selected sort option
    switch (sort) {
      case 'priceLowToHigh':
        updatedProducts.sort((a, b) => a.price - b.price)
        break
      case 'priceHighToLow':
        updatedProducts.sort((a, b) => b.price - a.price)
        break
      case 'aToZ':
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'zToA':
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }

    // Update the filtered products
    setFilteredProducts(updatedProducts)
  }, [products, window.location.search]) // Runs when products or URL parameters change

  const handleCategoryChange = (category) => {
    // Update the filtered products based on the selected category immediately
    if (category === 'All') {
      setFilteredProducts(products)
    } else {
      const updatedProducts = products.filter((product) => product.category === category)
      setFilteredProducts(updatedProducts)
    }
  }

  const handleSortChange = (sortedProducts) => {
    setFilteredProducts(sortedProducts)
  }

  const handleLogoClick = () => {
    setFilteredProducts(products)
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
