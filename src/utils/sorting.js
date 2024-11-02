// src/utils/sorting.js

export const handleSort = (products, sortOption) => {
  const sortedProducts = [...products]
  switch (sortOption) {
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
      return products
  }
  return sortedProducts
}
