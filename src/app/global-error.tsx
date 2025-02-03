"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/atoms/button"
import { IoReloadCircle } from "react-icons/io5";
import { MainLayout } from "@/components/templates";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <MainLayout>
          <div className="py-48 flex flex-col">
            {/* Header */}

            {/* Main Content */}
            <main className="flex-1 flex items-center">
              <div className="container px-4 md:px-6 flex flex-col[1fr_2fr] lg:flex-row items-center justify-between gap-8">
                {/* Left Section */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-light tracking-wide">
                    Oops &
                    <br />
                    Glitch Time!
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400">
                    Houston, we have a problem!
                    <br />
                    (Our systems are playing hide and seek.)
                  </p>
                  {process.env.NODE_ENV === "development" && (
                    <p className="text-sm text-red-400">Error: {error.message}</p>
                  )}
                </div>

                {/* Right Section */}
                <div className="relative">
                  <div className="text-[120px] md:text-[180px] font-bold leading-none dark:text-gray-700 text-gray-300 rotate-90 lg:rotate-0">
                    ERROR
                  </div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 whitespace-nowrap">
                    <div className="text-2xl md:text-4xl font-bold">SYSTEM GLITCH</div>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="p-6 md:p-8 flex justify-center gap-4">
              <Button
                onClick={() => reset()}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                <IoReloadCircle className="mr-2 h-4 w-4" /> Try Again
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                <Link href="/">GO BACK HOME</Link>
              </Button>
            </footer>
          </div>
        </MainLayout>
      </body>
    </html>
  )
}

