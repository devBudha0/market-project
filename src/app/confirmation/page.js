// src/app/ConfirmationPage.js

"use client"

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ConfirmationPage() {
  const { cart, calculateTotal, clearCart } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null) // Store the total price here
  const router = useRouter()

  useEffect(() => {
    // Generate a fake order ID (you can replace it with a real order ID from your backend)
    const generatedOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`
    setOrderId(generatedOrderId)

    // Calculate the total price before clearing the cart
    const total = calculateTotal()
    setTotalPrice(total)

    // Clear the cart after storing the total price
    clearCart()
  }, [])

  const handleGoBackToShopping = () => {
    router.push('/')  // Adjust the route to your store or products page
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Order Confirmation</h1>

      <section className="mb-8 text-center">
        <h2 className="text-xl font-semibold">Thank you for your order!</h2>
        <p className="text-lg mt-4">Your order has been successfully placed.</p>
        <p className="mt-4 text-lg">Your order ID is: <span className="font-semibold">{orderId}</span></p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <ul className="space-y-4">
          {cart.map((product) => (
            <li key={product.id} className="flex justify-between items-center border p-4 rounded-lg">
              <div className="flex flex-col">
                <span className="font-semibold">{product.name}</span>
                <span className="text-gray-600">{product.quantity} x {product.price} Kč</span>
              </div>
              <span className="font-semibold">{(product.price * product.quantity).toFixed(2)} Kč</span>
            </li>
          ))}
        </ul>
        {totalPrice !== null && (
          <p className="text-right text-xl font-bold mt-4">Total: {totalPrice.toFixed(2)} Kč</p>
        )}
      </section>

      <section className="mt-8 text-center">
        <button
          onClick={handleGoBackToShopping}
          className="bg-green-600 text-white py-3 px-8 font-bold rounded-lg hover:bg-green-700"
        >
          Go Back to Shopping
        </button>
      </section>
    </main>
  )
}
