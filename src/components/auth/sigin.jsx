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
import bottom from "@/assets/resource/bottom-wave.png";

import { z } from "zod";

import logo from "@/assets/resource/logo.png";
import machine from "@/assets/resource/machine.png";
import playButton from "@/assets/resource/play-button.png";

import { useAuthContext } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { SignUp, SignIn, setToken, setGameState } = useAuthContext();

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
          navigate("/signin");
        }
      } else {
        const result = await SignIn(newData);

        // console.log(result);
        if (result.success) {
          Cookies.set("token", result.data.tokens.accessToken);
          Cookies.set("userId", JSON.stringify(result.data.user));
          setToken(result.data.tokens.accessToken);
          setGameState("START_GAME");
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
    <div className="w-full min-h-screen bg-[#FFDC58] flex justify-center items-center">
      <img
        src={machine}
        alt="login"
        width={100}
        className="object-cover absolute left-4 top-4"
      />
      <img
        src={playButton}
        alt="login"
        width={50}
        className="object-cover absolute right-7 rotate-[-40deg] top-7"
      />
      <img
        src={bottom}
        alt="top"
        className="w-full fixed bottom-0 sm:-bottom-3"
      />
      <div className="w-full max-sm:px-4 sm:max-w-sm flex z-10 flex-col items-center">
        <img src={logo} alt="top" className="object-cover" width={125} />
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
                  <FormLabel className="text-sm text-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} className="input" />
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
                  <FormLabel className="text-sm text-black">Password</FormLabel>
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
                className="group w-full font-pocket text-lg relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
              >
                {loading ? "Submiting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
