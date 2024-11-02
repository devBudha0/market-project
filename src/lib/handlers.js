// src/lib/handlers.js

import { handleSort } from '@/utils/sorting'


// Function to apply sorting and filtering
export const applyFilters = (productsList, category, sortOption) => {
  let filteredProducts = category
    ? productsList.filter((product) => product.category === category)
    : productsList

  return handleSort(filteredProducts, sortOption)
}

// Function to handle add to cart
export const handleAddToCart = (productId) => {
  console.log("Added product to cart:", productId)
}
