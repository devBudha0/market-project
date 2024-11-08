// src/app/CheckoutPage.js

"use client"

import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { cart, calculateTotal, clearCart } = useCart() // Assuming clearCart is available
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('creditCard')
  const router = useRouter()

  const handlePlaceOrder = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
      toast.error('Please complete all shipping information')
      return
    }

    toast.success('Order placed successfully!')
    router.push('/confirmation') // Redirect to confirmation page
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Cart Review Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
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
        <p className="text-right text-xl font-bold mt-4">Total: {calculateTotal().toFixed(2)} Kč</p>
      </section>

      {/* Shipping Information */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full border rounded p-2"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              className="w-1/2 border rounded p-2"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
              className="w-1/2 border rounded p-2"
            />
          </div>
          <input
            type="text"
            placeholder="Country"
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            PayPal
          </label>
        </div>
      </section>

      {/* Place Order Button */}
      <Button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-3 font-bold rounded-lg hover:bg-green-700"
      >
        Place Order
      </Button>
    </main>
  )
}
