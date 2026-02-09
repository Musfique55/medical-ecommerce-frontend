"use client";
import { placeOrder } from "@/actions/checkout.action";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCartSnapshot from "@/hooks/useCartSnapshot";
import useSteps from "@/hooks/useSteps";
import { cartServices } from "@/services/cart/cart.services";
import { cartItem } from "@/types";
import { useForm } from "@tanstack/react-form";
import { CheckCircle2, CreditCard, MapPin, Shield, User } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "this field is required"),
  lastName: z.string().min(1, "this field is required"),
  email: z.string().email().nonempty("this field is required"),
  phone: z
    .string()
    .min(11, "phone number must be 11 digits")
    .max(11, "phone number must be 11 digits"),
  street_address: z.string().min(1, "this field is required"),
  apartment: z.string().optional().default(""),
  city: z.string().min(1, "this field is required"),
  zip_code: z.string().min(4, "zip code must be 4 numbers"),
  special_instruction: z.string().optional().default(""),
});

const Form = () => {
  const cartSnapShot = useCartSnapshot();
  const items: cartItem[] = JSON.parse(cartSnapShot.getCartItemsSnapshot);
  const subTotal = items.reduce(
    (sum, curr) => (sum += curr.price * curr.quantity),
    0,
  );

  const updateStep = useSteps((state) => state.updateStep);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street_address: "",
      apartment: "",
      city: "",
      zip_code: "",
      special_instruction: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const orderSchema = {
        customer_id: "zW9kXLeuVLLU8spcNCYZ83fF5F6ew9jD",
        subtotal: subTotal,
        total_amount: subTotal,
        order_items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        delivery_method: "COD",
        shipping_address: {
          fullName: value.firstName + value.lastName,
          email: value.email,
          phone: value.phone,
          street_address: value.street_address,
          apartment: value.apartment,
          city: value.city,
          zip_code: value.zip_code,
          special_instruction: value.special_instruction,
        },
      };
      const toastId = toast.loading("Order is placing...");
      try {
        await placeOrder(orderSchema);
        toast.success("order placed successfully", { id: toastId });
        cartServices.clearCart();
        updateStep(2);
      } catch (error: any) {
        toast.error(error.message || "something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div>
      <form
        id="checkout-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="lg:col-span-2 space-y-8">
          {/* contacts */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 size-12 rounded-2xl flex items-center justify-center">
                <User className="size-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Information
              </h2>
            </div>

            <FieldGroup className="grid md:grid-cols-2 gap-6">
              <form.Field
                name="firstName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        placeholder="John"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="lastName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="phone"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 size-12 rounded-2xl flex items-center justify-center">
                <MapPin className="size-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-6">
              <FieldGroup>
                <form.Field
                  name="street_address"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Street Address
                        </FieldLabel>
                        <Input
                          id={field.name}
                          type="text"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="apartment"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Apartment, suite etc. (optional)
                        </FieldLabel>
                        <Input
                          id={field.name}
                          type="text"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                        />
                      </Field>
                    );
                  }}
                />
                <div className="grid md:grid-cols-3 gap-6">
                  <form.Field
                    name="city"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>City</FieldLabel>
                          <Input
                            id={field.name}
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="zip_code"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>ZIP Code</FieldLabel>
                          <Input
                            id={field.name}
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                          />
                          {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                        </Field>
                      );
                    }}
                  />
                </div>
              </FieldGroup>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 size-12 rounded-2xl flex items-center justify-center">
                <CreditCard className="size-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Payment Method
              </h2>
            </div>

            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Cash on Delivery
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Pay securely in cash when your order is delivered to your
                    doorstep. No online payment required.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="size-4 text-green-600" />
                    <span className="font-semibold text-green-700">
                      Safe & Convenient
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium mt-4">
              💡 A small cash on delivery fee of will be added to your order
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100">
            <FieldGroup>
              <form.Field
                name="special_instruction"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Special Instruction
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`h-12 bg-blue-50/50 border-blue-200 rounded-xl text-base`}
                      />
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
