import  { signInSchema } from '@/lib/schema';
import React from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useLoginMutation } from "../../hooks/use-auth";
import { useAuth } from "../../provider/auth-context";
import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { User } from "~/types";



type SigninFormData = z.infer<typeof signInSchema>;
function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth();
  const form = useForm<SigninFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useLoginMutation();

  const handleOnSubmit = (values: SigninFormData) => {
    
    mutate(values, {
      onSuccess: (data) => {
        
        //console.log(data);
         console.log(data?.user?.is2FAEnabled)

         if (data?.user?.is2FAEnabled == true) {
          toast.success("2FA enabled. Redirecting... || code sent to email");
         console.log("email is ",data.user.email);
         localStorage.setItem("2fa_email", data.user.email);
          navigate("/two-factor-auth", {
            state: {
              email: data?.user?.email,
            },

          });
        } else {
          toast.success("Login successful. Redirecting...");
          console.log("email is ",data.user.email);
          login(data);
          navigate("/dashboard");
        }
       
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        console.log(error);
        toast.error(errorMessage);
      },
      // onSuccess: (data) => {
      //   console.log(data);
      //   toast.success("Login successful");
      //   // navigate("/dashboard");
      // },
      // onError: (error: any) => {
      //   const errorMessage =
      //     error.response?.data?.message || "An error occurred";
      //   console.log(error);
      //   toast.error(errorMessage);
      // },
    });
  }

   
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4'>
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center mb-5">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-6"
            >
              <FormField
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
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 mr-2" /> : "Sign in"}
              </Button>
              {/* <Button type='submit' className='w-full'>
                Sign in
              </Button> */}
            </form>
          </Form>

          <CardFooter className="flex items-center justify-center mt-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account? <Link to="/sign-up" className='text-blue-600'>Sign up</Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn ;