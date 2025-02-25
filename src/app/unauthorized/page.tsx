"use client"

import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 flex items-center">
        <div className="container px-4 md:px-6 flex flex-col[1fr_2fr] lg:flex-row items-center justify-between gap-8">
          {/* Left Section */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-wide">
              Oops!
            </h1>
            <p className="text-lg md:text-xl text-gray-400">

              U do not have permission to access this page. Please contact your administrator if you believe this is an error.

            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-sm text-red-400">
                Error: Unauthorized Access
              </p>
            )}
          </div>

          {/* Right Section */}
          <div className="relative">
            <div className="text-[120px] md:text-[180px] font-bold leading-none dark:text-gray-700 text-gray-300 rotate-90 lg:rotate-0">
              ERROR
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 whitespace-nowrap">
              <div className="text-2xl md:text-4xl font-bold">UNAUTHORIZED</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 md:p-8 flex justify-center gap-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-black transition-colors"
        >
          GO BACK
        </Button>
        <Button
          asChild
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-black transition-colors"
        >
          <Link href="/">HOME</Link>
        </Button>
      </footer>
    </div>
  )
}

