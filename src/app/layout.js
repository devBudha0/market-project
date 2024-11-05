import Logo from '@/components/Logo'
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Budha's e-shop",
  description: "Sell anything, anytime!",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Logo /> {/* Market logo with a clickable link to the main page */}
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
