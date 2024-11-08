// src/components/ui/ProductCard.js

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { toast } from 'sonner'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (<>
    <Card className="flex flex-col justify-between min-h-[300px]">
      <Link href={`/${product.id}/details`} passHref>
        <div className="bg-gray-200 w-full h-[150px] flex items-center justify-center text-gray-700 text-lg font-bold rounded-t-lg">
          {/* Placeholder for product image */}
          photo
        </div>
        <CardContent className="text-center">
          <CardTitle className="text-lg font-semibold pt-2">{product.name}</CardTitle>
          <p className="text-gray-600">{product.price} Kč</p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
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
  </>
  )
}
