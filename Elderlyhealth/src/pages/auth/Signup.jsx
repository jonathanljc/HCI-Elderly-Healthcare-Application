// src/pages/auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Key,
  Phone,
  Calendar,
  Heart,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    emergencyContact: "",
    medicalConditions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/dashboard");
  };

  const renderStepOne = () => (
    <>
      <CardHeader className="space-y-1">
        <div className="flex flex-col items-center gap-4">
          <Logo className="w-16 h-16 text-primary" />
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your basic information
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="fullName"
              placeholder="Full Name"
              className="pl-9"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="pl-9"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-9"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="pl-9"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </>
  );

  const renderStepTwo = () => (
    <>
      <CardHeader className="space-y-1">
        <div className="flex flex-col items-center gap-4">
          <Logo className="w-16 h-16 text-primary" />
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Health Information
            </h1>
            <p className="text-sm text-muted-foreground">
              Help us provide better care
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="phone"
              placeholder="Phone Number"
              className="pl-9"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              className="pl-9"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="emergencyContact"
              placeholder="Emergency Contact Number"
              className="pl-9"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Heart className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="medicalConditions"
              placeholder="Medical Conditions (optional)"
              className="pl-9"
              value={formData.medicalConditions}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <Card className="w-full">
          <form onSubmit={handleSubmit}>
            {step === 1 ? renderStepOne() : renderStepTwo()}
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full gap-4">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account
                    </>
                  ) : step === 1 ? (
                    <>
                      Next
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Complete Signup"
                  )}
                </Button>
              </div>
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="px-0 font-normal"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
