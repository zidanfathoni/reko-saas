"use client"
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import Link from "next/link";
import { useState } from "react";

export default function LoginAdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      {/* Hero */}
      <div className="relative ">
        <div className="container py-16 sm:py-24 items-center justify-center flex">
          <div className="grid w-full grow items-center px-4 sm:justify-center">
            <Card className="w-full sm:w-96">
              <CardHeader>
                <CardTitle>Sign in to Admin Receh Koding</CardTitle>
                <CardDescription>Welcome back! Please sign in to continue</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-y-4">

                <div className="space-y-2">
                  <Label>Email address</Label>
                  <Input type="email" required />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" required />
                </div>
              </CardContent>

              <CardFooter>
                <div className="grid w-full gap-y-4">
                  <Button>Sign in</Button>
                  <Button variant="link" size="sm" asChild>
                    <Link href="/signup">
                      Forgot your password? Reset it here
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
