import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Key } from "lucide-react";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update isLoading state
    setIsLoading(false);

    // Navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <AuthWrapper>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 h-12 bg-white/60 border-gray-200 focus:bg-white transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 h-12 bg-white/60 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="border-gray-300"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <Button
            variant="link"
            className="px-0 text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
}
