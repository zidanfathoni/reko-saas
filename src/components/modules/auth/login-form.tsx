import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { FaApple, FaGoogle } from "react-icons/fa";


interface SignInProps {
  onClick: any;
}

const LoginForm: React.FC<SignInProps> = ({ onClick }) => {
  return (
    <form>
      <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
        {/* Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <FaApple className="w-4 h-auto mr-2" />
                    Login with Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FaGoogle className="w-4 h-auto mr-2" />
                    Login with Google
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <button onClick={onClick} className="underline underline-offset-4">
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* End Card */}
      </div>
    </form>
  )
}

export default LoginForm;