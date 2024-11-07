// src/components/Logo.js
"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Logo({ onClick }) {
  const router = useRouter()

  const handleLogoClick = (e) => {
    e.preventDefault() // Prevents default link behavior to control navigation
    router.push('/') // Navigate to the main page

    if (window.resetState) {
      window.resetState() // Reset everything when navigating to the home page
    }
  }

  return (
    <Link href="/" onClick={handleLogoClick}>
      <h1>Market</h1>
      {/* <img src="/path-to-logo.png" alt="Market Logo" className="cursor-pointer" /> */}
    </Link>
  )
}
