// src/components/ui/ProductCard.js

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function ProductCard({ product, onAddToCart }) {
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
          className="w-full"
          onClick={(e) => {
            e.stopPropagation() // Prevents redirect to the details page
            onAddToCart(product.id) // Call the onAddToCart function
          }}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  </>
  )
}
