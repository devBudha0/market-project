"use client"

// Layout.js
import TopBar from '@/components/TopBar'
import { CartProvider } from '@/context/CartContext'
import { ProductsProvider } from '@/context/ProductsContext'
import './globals.css'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>E-shop</title>
      </head>
      <body>
        <ProductsProvider>
          <CartProvider>
            <header>
              <TopBar /> {/* Display the top bar */}
            </header>
            <main>{children}</main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
