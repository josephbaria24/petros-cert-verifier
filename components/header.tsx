"use client"

import Image from "next/image"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-lg">
            <Image
              src="/logo.png"
              alt="Petrosphere Logo"
              width={80} // Actual image resolution
              height={80}
              className="w-16 h-16 object-contain" // Display size
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Certificate Verifier</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              by Petrosphere Incorporated
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
