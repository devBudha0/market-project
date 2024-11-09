"use client"

// Layout.js
import TopBar from '@/components/TopBar'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/AuthProvider'
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
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <header>
                <TopBar /> {/* Display the top bar */}
              </header>
              <Toaster />
              <main>{children}</main>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
