"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { da } from "zod/locales";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

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
          email : value.email,
          password : value.password,
          callbackURL : "http://localhost:3000/checkout"
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>email</FieldLabel>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        id={field.name}
                        type="email"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>password</FieldLabel>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        type="password"
                        id={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
          <CardFooter>
            <Button type="submit" form="login-form" className="w-full">
              Login
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
