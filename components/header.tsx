"use client"

import Image from "next/image"

export function Header() {
  return (
    <header className="bg-[#1b1b63]"> {/* Deep blue background */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-lg">
            <Image
              src="/logo.png"
              alt="Petrosphere Logo"
              width={80}
              height={80}
              className="w-16 h-16 object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Certificate Verifier
            </h1>
            <p className="text-sm md:text-base text-yellow-400">
              by Petrosphere Incorporated
            </p>
          </div>
        </div>
      </div>

      {/* Yellow stripe at the bottom of the header */}
      <div className="h-2 bg-yellow-400 w-full" />
    </header>
  )
}
