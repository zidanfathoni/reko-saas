import Link from "next/link"
import { Button } from "@/components/atoms/button"
import { MainLayout } from "@/components/templates"

export default function NotFound() {
  return (
    <MainLayout>
      <div className="py-48 flex flex-col">

        {/* Main Content */}
        <main className="flex-1 flex items-center">
          <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Section */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light tracking-wide">
                Hide &
                <br />
                Seek Time!
              </h1>
              <p className="text-lg md:text-xl text-gray-400">
                And you&apos;re it!
                <br />
                (Sorry, we can&apos;t find the page, too.)
              </p>
            </div>

            {/* Right Section */}
            <div className="relative">
              <div className="text-[120px] md:text-[180px] font-bold leading-none dark:text-gray-700 text-gray-300 rotate-90 lg:rotate-0">
                PAGE
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 whitespace-nowrap">
                <div className="text-2xl md:text-4xl font-bold">NOT FOUND</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 md:p-8 flex justify-center">
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
  )
}

