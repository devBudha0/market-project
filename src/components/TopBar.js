// src/components/TopBar.js

"use client"

import { useCart } from '@/context/CartContext'
import { useProducts } from '@/context/ProductsContext'
import { useRouter } from 'next/navigation'
import { FaShoppingCart } from 'react-icons/fa' // Cart Icon
import Logo from './Logo'
import { Button } from './ui/button'
import { Input } from './ui/input'

const TopBar = () => {
  const { cartItems } = useCart() // Get cart items from context
  const cartItemsCount = cartItems.length // Count the number of items in the cart

  const { searchQuery, setSearchQuery } = useProducts();
  const router = useRouter()

  // Update search term and handle navigation when the user types
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault()
  //   // Redirect to the page with search query
  //   router.push(`/search?query=${searchQuery}`)
  // }

  return (
    <div className="flex justify-between items-center p-0.5 bg-gray-800 text-white">
      <Logo className="pl-0" /> {/* Market logo with a clickable link to the main page */}

      {/* Search Bar */}
      <div className="flex-grow mt-2 mx-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-gray-100 text-gray-800 rounded-md item-center py-2 text-sm h-8 w-full placeholder-center"
        />
      </div>
      {/* <Button onClick={handleSearchSubmit} className="bg-gray-800 text-white rounded-md hover:bg-indigo-900">
        <FaSearch className='mt-1' />
      </Button> */}

      {/* Sign In/Sign Up Buttons */}
      <div className="space-x-4">
        <Button className="bg-gray-800 text-white rounded-md hover:bg-indigo-900">
          Sign In
        </Button>
      </div>

      {/* Cart Icon */}
      <Button className=" bg-gray-800flex items-center rounded-md hover:bg-indigo-900">
        <span className="text-white">{cartItemsCount}</span> {/* Display number of items in cart */}
        <FaShoppingCart className="text-white text-2xl" />
      </Button>
    </div>
  )
}

export default TopBar
