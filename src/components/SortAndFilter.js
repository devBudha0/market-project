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


  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSortOption, setSelectedSortOption] = useState('Sort by')

  useEffect(() => {
    // Reset the category and sort state if no query parameters are present
    if (searchParams.has('sort')) handleSortSelect(searchParams.get('sort'))

    if (searchParams.has('category')) handleCategorySelect(searchParams.get('category'))
  }, [])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    onCategoryChange(category)

    const newParams = new URLSearchParams(searchParams.toString())
    if (category === 'All') {
      newParams.delete('category')
    } else {
      newParams.set('category', category)
    }
    router.replace(`/?${newParams.toString()}`)
  }

  const handleSortSelect = (sortOption) => {
    setSelectedSortOption(sortOptions.find((opt) => opt.value === sortOption)?.label || 'Sort by')
    onSortChange(sortOption)

    const newParams = new URLSearchParams(searchParams.toString())
    if (sortOption === 'Sort by') {
      newParams.delete('sort')
    } else {
      newParams.set('sort', sortOption)
    }
    router.replace(`/?${newParams.toString()}`)
  }

  window.resetState = () => {
    // Reset internal state
    setSelectedCategory('All')
    setSelectedSortOption('Sort by')

    // Call the category and sort handlers to reset product state in parent
    onCategoryChange('All')
    onSortChange('aToZ') // Set to the default sort option (or whichever initial sort you prefer)

      // Remove all query parameters from the URL
      router.replace('/')
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

export default SortAndFilter
