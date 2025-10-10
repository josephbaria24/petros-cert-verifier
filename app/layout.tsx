import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"


const poppins = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // include the weights you plan to use
})


export const metadata: Metadata = {
  title: "Certificate Verifier - Verify Authenticity Instantly",
  description: "Verify the authenticity of certificates quickly and securely",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
     <body className={poppins.className}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
