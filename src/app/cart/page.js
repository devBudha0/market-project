// src/app/CartPage.js

"use client"

import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart()

  const calculateTotal = () =>
    cart.reduce((total, product) => total + product.price * product.quantity, 0)

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-500">{product.price} Kč</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                </div>
                <p className="font-semibold">
                  {(product.price * product.quantity)} Kč
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-right">
            <p className="text-xl font-bold">
              Total: {calculateTotal()} Kč
            </p>
            <button
              className="mt-4 w-full bg-green-600 text-white text-lg py-3 rounded-lg hover:bg-green-700"
              onClick={() => alert('Proceeding to checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </main>
  )
}
