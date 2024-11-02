import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu' // Adjust path based on your project structure
import { useState } from 'react'

const SortAndFilter = ({ onSortChange, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSortOption, setSelectedSortOption] = useState('Sort by')

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
    onCategoryChange(category === 'All' ? '' : category) // Pass an empty string if "All" is selected
  }

  const handleSortSelect = (sortOption) => {
    setSelectedSortOption(sortOptions.find(opt => opt.value === sortOption)?.label || 'Sort by')
    onSortChange(sortOption)
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
