// src/app/CartPage.js

"use client"

import { useCart } from '@/context/CartContext'
import Link from 'next/link' // Import Link for navigation
import { toast } from 'sonner'

export default function CartPage() {
  const { cart, addToCart, removeFromCart, calculateTotal } = useCart()

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="space-y-6">
            {cart.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                {/* Product Name and Price */}
                <div className="flex-1">
                  <Link href={`/${product.id}/details`} passHref>
                    <h2 className="text-lg font-semibold cursor-pointer hover:text-indigo-900">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-gray-500">{product.price} Kč</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 w-32 justify-center">
                  <button
                    onClick={() => {
                      addToCart(product)
                      toast('Item added to cart')
                    }}
                    className="bg-green-500 font-bold text-white px-2 py-1 rounded hover:bg-green-600 transition"
                  >
                    +
                  </button>
                  <span className="text-center w-8 font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => {
                      removeFromCart(product.id)
                      toast('Item removed from cart')
                    }}
                    className="bg-red-500 font-bold text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    -
                  </button>
                </div>

                {/* Product Total */}
                <p className="font-semibold w-24 text-right">
                  {(product.price * product.quantity).toFixed(2)} Kč
                </p>
              </li>
            ))}
          </ul>

          {/* Total and Checkout Button */}
          <div className="mt-10 text-right">
            <p className="text-2xl font-bold mb-4">
              Total: {calculateTotal().toFixed(2)} Kč
            </p>
            <Link href='/checkout' passHref>
            <button
                className="w-full md:w-1/2 bg-green-600 text-white text-lg py-3 font-bold rounded-lg hover:bg-green-700 transition"
                onClick={() => toast('Proceeding to checkout')}
            >
              Proceed to Checkout
            </button>
            </Link>
          </div>
        </div>
      ) : (
          <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </main>
  )
}
