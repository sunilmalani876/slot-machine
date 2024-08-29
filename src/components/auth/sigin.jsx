import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";

import { useAuthContext } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { SignUp, SignIn, setToken, LogOut } = useAuthContext();

  const formSchema =
    pathname === "/signup"
      ? z.object({
          name: z.string().min(2).max(50),
          email: z
            .string({
              message: "Email is Required.",
            })
            .email(),
          password: z
            .string({
              message: "Password must be 6 character.",
            })
            .min(6),
        })
      : z.object({
          email: z
            .string({
              message: "Email is Required.",
            })
            .email(),
          password: z
            .string({
              message: "Password must be 6 character.",
            })
            .min(6),
        });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const newData =
      pathname === "/signup" ? { ...values, role: "user" } : values;
    setLoading(true);

    try {
      if (pathname === "/signup") {
        const result = await SignUp(newData);

        if (result.success) {
          toast.success(result.message);
          setLoading(false);

          form.reset();

          navigate("/signin", {
            replace: true,
          });
        }
      } else {
        const result = await SignIn(newData);

        // console.log(result);
        if (result.success) {
          Cookies.set("token", result.data.tokens.accessToken);
          Cookies.set("userId", JSON.stringify(result.data.user));
          setToken(result.data.tokens.accessToken);
          toast.success("user login successfully");
          navigate(`/game/${result.data.user.id}`, {
            replace: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full text-white py-2.5 sm:px-0 h-full flex justify-center items-center">
        <div className="w-full max-sm:flex-col max-sm:items-center max-sm:gap-8 border-slate-300 rounded-md border-[1px] shadow-sm shadow-slate-700 py-5 flex justify-center max-w-md relative">
          {/* <div className="sm:self-end">
            <img
              src={login}
              alt="login"
              className="object-cover w-[340px] z-20 sm:w-[340px]"
            />
          </div> */}

          <div className="max-sm:w-full max-sm:gap-5 flex-1 flex flex-col items-center gap-3">
            <div className="w-full max-w-[290px] flex flex-col max-sm:py-0 items-center gap-2">
              <p className="text-3xl font-bold text-black">Welcom Back!</p>
              <p className="text-xs font-bold text-gray-500">
                Please enter your details.
              </p>
              <Form {...form} className="w-full">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 w-full"
                >
                  {pathname === "/signup" && (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-black">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="username"
                              className="input"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-black">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email"
                            {...field}
                            className="input"
                          />
                        </FormControl>

                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-black">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="password"
                            {...field}
                            className="input"
                          />
                        </FormControl>

                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className="text-gray-500 hover:text-black text-sm flex justify-end items-center font-bold underline decoration-dashed outline-offset-8">
                    {pathname === "/signin" ? (
                      <Link to="/signup">Sign-Up</Link>
                    ) : (
                      <Link to="/signin">Sign-In</Link>
                    )}
                  </div>

                  <div className="w-full pt-2">
                    <Button
                      disabled={loading}
                      type="submit"
                      size="sm"
                      className="w-full"
                    >
                      {loading ? "Submiting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
