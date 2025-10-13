"use client"

import Image from "next/image"
import Link from "next/link"
import { Home, BookOpen, Phone } from "lucide-react"

export function Header() {
  return (
    <header className="bg-[#1b1b63] shadow-md sticky top-0 z-50">

      <div className="container mx-auto px-6 pl-6 py-3 md:py-0 flex flex-col md:flex-row items-center justify-between sm:py-3">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center gap-8 space-x-10">
        <div className="flex items-center justify-center w-20 h-20 relative overflow-visible lg:pl-10 sm:pl-8 md:pl-6">
          <Image
            src="/trans-logo.png"
            alt="Petrosphere Logo"
            width={90}
            height={90}
            className="object-contain scale-500 sm:scale-500 md:scale-500" // 👈 makes it 25% larger
            priority
          />
        </div>

     
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="flex items-center gap-6 mt-4 md:mt-0">
          <Link
            href="https://petrosphere.com.ph/"
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-200"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium">Home</span>
          </Link>

          <Link
            href="https://petrosphere.com.ph/training/"
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-200"
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium">Courses</span>
          </Link>

          <Link
            href="https://petrosphere.com.ph/about/"
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-200"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-medium">Contact Us</span>
          </Link>
        </nav>
      </div>

      {/* Yellow stripe at the bottom of the header */}
      <div className="h-2 bg-yellow-400 w-full" />
    </header>
  )
}
