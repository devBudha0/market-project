"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/utils/supabase/client' // Importing from client.js
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([]) // State to store fetched products
  const [error, setError] = useState(null) // State to store any errors

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch data from the "products" table
      const { data: products, error } = await supabase.from('products').select()


      if (error) {
        setError(error.message) // Set error if fetching fails
      } else {
        setProducts(products) // Set the fetched products to state
      }
    }

    fetchProducts() // Call the async function
  }, []) // Empty dependency array to run once on component mount

  if (error) {
    return <p>Error fetching products: {error}</p> // Display error message if there's an error
  }

  if (products.length === 0) {
    return <p>No products available.</p> // Display message if no products are available
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (  // Iterate over the fetched products
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <div>
                <CardTitle>{product.name}</CardTitle> {/* Display product name */}
                <CardDescription>{product.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{product.price} Kč<br /><br />↑ tady by asi měla být fotka </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
