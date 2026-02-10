"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/authClient";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const formSchema = z.object({
    email: z.string().nonempty("this field is required"),
    password: z
      .string()
      .min(8, "password must be 8 characters or more")
      .max(32, "password length should be in 32characters"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Please wait signing in...");
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "http://localhost:3000/checkout",
        });
        if (error?.message) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("successfully signed in", { id: toastId });
      } catch (error) {
        toast.error("something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50/30 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your HealthHub account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-xl shadow-blue-100/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-3"
          >
            {/* Email */}
            <div>
              <FieldGroup className="space-y-0">
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <>
                        <FieldLabel
                          htmlFor="email"
                          className="text-base font-semibold text-gray-900"
                        >
                          Email Address
                        </FieldLabel>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            className={`h-14 pl-12 bg-blue-50/50 border-blue-200 rounded-xl text-bas`}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </div>
                      </>
                    );
                  }}
                />
              </FieldGroup>
            </div>

            {/* Password */}
            <div>
              <FieldGroup className="space-y-0">
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <>
                        <FieldLabel
                          htmlFor="password"
                          className="text-base font-semibold text-gray-900"
                        >
                          Password
                        </FieldLabel>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                          <Input
                            id={field.name}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            className={`h-14 pl-12 bg-blue-50/50 border-blue-200 rounded-xl text-bas`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </div>
                      </>
                    );
                  }}
                />
              </FieldGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all cursor-pointer"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full h-14 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl text-base font-semibold transition-all cursor-pointer"
          >
            <svg className="size-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href={"/register"}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-6">
          <button
            // onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to shop
          </button>
        </div>
      </div>
    </div>
  );
}
