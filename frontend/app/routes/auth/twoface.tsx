import { signInSchema, twoFactorSchema } from "@/lib/schema";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation, useVerifyTwoFAMutation } from "../../hooks/use-auth";
import { useAuth } from "../../provider/auth-context";
import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { User } from "~/types";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useVerifyTwoFAMutation } from '~/hooks/use-user';

export type twoFactorFormData = z.infer<typeof twoFactorSchema>;
function twoface() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email;
 // const { mutate, isPending } = useVerifyTwoFAMutation();

  useEffect(() => {
    if (!email) {
      // If page was refreshed or navigated directly
      navigate("/sign-in");
    }
  }, [email]);

  const form = useForm<twoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      email: email ||  localStorage.getItem("2fa_email"),
      code: "",
    },
  });

  const { mutate, isPending } = useVerifyTwoFAMutation();

const handleOnSubmit = (values: twoFactorFormData) => {
  mutate(
    {
      email: email || "",
      code: values.code,
    },
    {
      onSuccess: (data) => {
        toast.success("Login successful. Redirecting...");
        login(data);
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Invalid 2FA code";
        toast.error(errorMessage);
      },
    }
  );
};
  //const { mutate, isPending } = useVerifyTwoFAMutation();

  // const handleOnSubmit = (values: twoFactorFormData) => {
  //   console.log(" email is ", email);
  //   console.log(" code is ", values.code);
  //   // mutate(
  //   //   {
  //   //     ...values,
  //   //     email: email || "", // ensure email is included
  //   //   },
  //   //   {
  //   //     onSuccess: (data) => {
  //   //       toast.success("Login successful. Redirecting...");
  //   //       login(data);
  //   //       navigate("/dashboard");
  //   //     },
  //   //     onError: (error: any) => {
  //   //       const errorMessage =
  //   //         error.response?.data?.message || "Invalid 2FA code";
  //   //       toast.error(errorMessage);
  //   //     },
  //   //   }
  //   // );

  //   mutate(
  //     {
  //       email: email || "",
  //       code: values.code,
  //     },
  //     {
  //       onSuccess: (data) => {
  //         toast.success("Login successful. Redirecting...");
  //         login(data);
  //         navigate("/dashboard");
  //       },
  //       onError: (error: any) => {
  //         const errorMessage =
  //           error.response?.data?.message || "Invalid 2FA code";
  //         toast.error(errorMessage);
  //       },
  //     }
  //   );
  // };

  function maskEmail(email: string): string {
    const [user, domain] = email.split("@");
    if (user.length <= 4) {
      return `${user[0]}***${user[user.length - 1]}@${domain}`;
    }
    return `${user.slice(0, 2)}***${user.slice(-2)}@${domain}`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center mb-5">
          <CardTitle className="text-2xl font-bold">
            Two Factor Authentication
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter the 6 digit code sent to your to{" "}
            <strong>{maskEmail(email)}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-6"
            >
              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Code</FormLabel>
                      {/* <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600"
                      >
                        Forgot password?
                      </Link> */}
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="6-digit code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<Button type="submit" className="w-full" disabled={isPending}>
  {isPending ? <Loader2 className="w-4 h-4 mr-2" /> : "Verify"}
</Button>

              {/* <Button type="submit" onClick={form.handleSubmit(handleOnSubmit)} className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 mr-2" /> : "verify"}
              </Button>
              <Button type="submit" onClick={form.handleSubmit(handleOnSubmit)} className="w-full">
                Sign in
              </Button> */}
            </form>
          </Form>

          {/* <CardFooter className="flex items-center justify-center mt-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account? <Link to="/sign-up" className='text-blue-600'>Sign up</Link>
              </p>
            </div>
          </CardFooter> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default twoface;

// import React from 'react'
// import { useLocation, useNavigate } from 'react-router';

// function twoface() {
//   const navigate = useNavigate();
//      const location = useLocation();
//      const email = location.state?.email;
//      console.log(" email is 12345",email)

//   return (
//     <div>twoface</div>
//   )
// }

// export default twoface
