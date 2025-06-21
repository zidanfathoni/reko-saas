"use client"
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchLoginAdmin, loginSuccess } from "@/lib/slices/auth/login/loginSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { login, loading, isAuth } = useAppSelector((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

       await dispatch(fetchLoginAdmin(formData));

    //   if (fetchLoginAdmin.fulfilled.match(resultAction)) {
    //     dispatch(loginSuccess(resultAction.payload));
    //     if (resultAction.payload.data.path !== "user") {
    //       router.push("/admin");
    //     }
    //   }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Redirect otomatis jika sudah login
  useEffect(() => {
    if (isAuth) {
      router.push("/admin");
    }
  }, [isAuth, router]);


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
                  <Input
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <div className="grid w-full gap-y-4">
                  <Button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    {
                      loading ? (
                        <div role="status">
                          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : "Sign in"
                    }
                  </Button>
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
