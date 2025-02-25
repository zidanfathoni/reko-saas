"use client"

import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card"
import { XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-destructive">Unauthorized Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            You do not have permission to access this page. Please contact your administrator if you believe this is an
            error.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push("/")} variant="default">
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

