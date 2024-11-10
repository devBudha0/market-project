// src/components/TopBar.js

"use client"

import { useAuth } from '@/context/AuthProvider'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/context/ProductsContext'
import { supabase } from "@/utils/supabase/client" // Import Supabase client
import { useRouter } from 'next/navigation'
import { FaRegUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { toast } from 'sonner'
import Logo from './Logo'
import { Button } from './ui/button'
import { Input } from './ui/input'


const TopBar = () => {
  const { cart } = useCart() // Get cart items from context
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0)

  const { searchQuery, setSearchQuery } = useProducts()
  const { user, setUser } = useAuth()  // Access user and setUser from AuthProvider
  const router = useRouter()

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleRedirectToCart = () => {
    router.push('/cart')
  }

  const handleRedirectToAuth = () => {
    router.push('/auth')
  }

  const handleRedirectToSettings = () => {
    router.push('/account')
  }

  const handleSignOut = async () => {
    // Perform sign-out using Supabase and clear user from context
    await supabase.auth.signOut()
    setUser(null)
    toast("Sign out successful!")
    router.push('/') // Optionally redirect to the home page
  }

  return (
    <div className="flex justify-between items-center p-0.5 bg-gray-800 text-white">
      <Logo className="pl-0" />

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

      {/* Conditional Sign In/Sign Out Buttons */}
      <div className="space-x-4">
        {user ? (
          <div className='flex'>
            {/* Sign Out Button when logged in */}
            <Button onClick={handleSignOut} className="bg-gray-800 text-white rounded-md hover:bg-indigo-900 flex items-center">
              <FaSignOutAlt className="mr-1" />
              Sign Out
            </Button>
            {/* Settings Icon when logged in */}
            <Button onClick={handleRedirectToSettings} className="bg-gray-800 text-white rounded-md hover:bg-indigo-900 flex items-center">
              <FaRegUser className="text-xl" />
            </Button>
          </div>
        ) : (
        // Sign In / Sign Up Button when logged out
            <Button onClick={handleRedirectToAuth} className="bg-gray-800 text-white rounded-md hover:bg-indigo-900">
              Sign In / Sign up
            </Button>
        )}
      </div>

      {/* Cart Icon */}
      <Button onClick={handleRedirectToCart} className="bg-gray-800 flex items-center rounded-md hover:bg-indigo-900">
        <span className="text-white">{cartItemsCount}</span>
        <FaShoppingCart className="text-white text-2xl" />
      </Button>
    </div>
  )
}

export default TopBar
