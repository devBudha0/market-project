// src/context/ProductsContext.js
import { fetchProducts } from '@/lib/fetchProducts'
import { createContext, useContext, useEffect, useState } from 'react'

// Create Context
const ProductsContext = createContext()

// Custom Hook to use the context
export const useProducts = () => {
  return useContext(ProductsContext)
}

// Provider Component to wrap around your app or page
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)  // Track loading state
  const [error, setError] = useState(null)      // Track error state

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts()
        const sortedProducts = fetchedProducts.sort((a, b) => a.name.localeCompare(b.name))
        setProducts(sortedProducts)
        setLoading(false)  // Set loading to false when data is successfully fetched
      } catch (err) {
        setError(err.message)  // Set error if fetch fails
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  )
}
