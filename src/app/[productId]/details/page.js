// src/app/product/[productId].jsx

"use client"

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/context/ProductsContext'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { toast } from 'sonner'

export default function ProductDetails() {
  const { productId } = useParams()
  const { products, error, loading } = useProducts()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Ensure product data is loaded before attempting to find the product
    if (products.length > 0) {
      const selectedProduct = products.find((p) => p.id.toString() === productId)
      setProduct(selectedProduct || null)
    }
  }, [products, productId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading products: {error}</p>
  if (!product) return <p>Product not found.</p>

  return (
    <main className="p-8">
      <section className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 h-96 bg-gray-200 flex items-center justify-center border">
          <p className="text-gray-500">Product Image</p>
        </div>

        {/* Product Information */}
        <Card className="flex flex-col w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
            <CardDescription>{product.description || "No description available."}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <p className="text-xl font-semibold text-gray-700">Price: {product.price} Kč</p>
            <p className="text-gray-600">Availability: {product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
            <p className="text-gray-600">Rating: ⭐⭐⭐⭐⭐</p>
            <p className="text-gray-500">Owner Account: {product.owner || "Unknown"}</p>
          </CardContent>

          <CardFooter className="flex justify-center mt-4">
            <Button
              href="#"
              className="w-full hover:bg-indigo-900"
              onClick={(e) => {
                e.stopPropagation() // Prevents redirect to the details page
                addToCart(product) // Call the addToCart function
                toast('Item has been added to cart')
              }}
            >
              <FaShoppingCart className="text-white text-2xl " />

              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Write a Review Section
      <section className="mt-8">
        <h2 className="text-lg font-medium">Write a Review</h2>
        <div className="flex gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <textarea
          placeholder="Write your review here"
          className="mt-2 w-full border rounded p-2 text-gray-700"
          rows="3"
        ></textarea>
      </section> */}

      {/* Similar Products Section */}
      <section className="mt-16">
        <h3 className="text-xl font-semibold mb-4">Similar Products in This Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="flex flex-col items-center p-4">
              <div className="w-full h-32 bg-gray-200 mb-4 flex items-center justify-center">
                <p className="text-gray-500">Product Image</p>
              </div>
              <CardTitle className="text-center">Product Name</CardTitle>
              <CardDescription className="text-center">Price: Kč</CardDescription>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
