// src/components/SortAndFilter.js

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SortAndFilter = ({ products, onSortChange, onCategoryChange }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryFromQuery = searchParams.get('category') || 'All'
  const sortFromQuery = searchParams.get('sort') || 'Sort by'

  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery)
  const [selectedSortOption, setSelectedSortOption] = useState(sortFromQuery)

  useEffect(() => {
    // Reset the category and sort state if no query parameters are present
    if (!searchParams.has('category')) setSelectedCategory('All')
    if (!searchParams.has('sort')) setSelectedSortOption('Sort by')
  }, [searchParams])

  const categories = [
    'All', // Default category option
    'Electronics',
    'Appliances',
    'Furniture',
    'Clothing',
    'Accessories',
    'Stationery',
    'Decor',
    'Books',
  ]

  const sortOptions = [
    { label: 'A to Z', value: 'aToZ' },
    { label: 'Z to A', value: 'zToA' },
    { label: 'Price: Low to High', value: 'priceLowToHigh' },
    { label: 'Price: High to Low', value: 'priceHighToLow' },
  ]

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    onCategoryChange(category === 'All' ? '' : category)

    const newParams = new URLSearchParams(searchParams.toString())
    if (category === 'All') {
      newParams.delete('category')
    } else {
      newParams.set('category', category)
    }
    router.push(`/?${newParams.toString()}`)
  }

  const handleSortSelect = (sortOption) => {
    setSelectedSortOption(sortOptions.find((opt) => opt.value === sortOption)?.label || 'Sort by')

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
        break
    }

    onSortChange(sortedProducts)

    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('sort', sortOption)
    router.push(`/?${newParams.toString()}`)
  }

  return (
    <div className="flex space-x-4 pb-2">
      {/* Category Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="dropdown-trigger px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700 transition-all duration-150 ease-in-out">
          {selectedCategory} {/* Category button */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => (
            <DropdownMenuItem key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort By Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="dropdown-trigger px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700 transition-all duration-150 ease-in-out">
          {selectedSortOption}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => handleSortSelect(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SortAndFilter
