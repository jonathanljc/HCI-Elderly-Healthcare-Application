// src/pages/auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import AuthWrapper from "@/components/auth/AuthWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

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

  const StepOne = () => (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );

  const StepTwo = () => (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6 relative">
      <div className="absolute w-full border-t border-muted" />
      <div className="relative flex gap-3 px-2 bg-card">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            step >= 1 ? "bg-primary" : "bg-muted"
          }`}
        />
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            step >= 2 ? "bg-primary" : "bg-muted"
          }`}
        />
      </div>
    </div>
  );

  return (
    <AuthWrapper>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepIndicator()}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold">
            {step === 1 ? "Create Account" : "Health Information"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {step === 1
              ? "Enter your basic information"
              : "Help us provide better care"}
          </p>
        </div>
        {step === 1 ? <StepOne /> : <StepTwo />}
        <div className="flex gap-3">
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

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
}
