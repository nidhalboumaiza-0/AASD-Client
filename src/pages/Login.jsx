import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/lib/api";
import LocalStorageService from "@/lib/localStorageService";
import { AuthContext } from "@/contexts/AuthContextProvider";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email",
    })
    .email(),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
});

export default function Login() {
  const { toast } = useToast();
  const Navigate = useNavigate();
  const { setIsLoggedIn, setUser, setToken } = React.useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await login(data);
      
      const {token} = response;
      const { user } = response.data;

      LocalStorageService.setAccessToken(token);
      LocalStorageService.setUser(user);

      setIsLoggedIn(true);
      setUser(user);
      setToken(token);

      Navigate("/");
    } catch (error) {
      toast({
        title: "Échec de l'authentification",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-white">{error?.response?.data?.message}</p>
          </div>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-[350px] gap-3"
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Se Connecter</h1>
          <p className="text-balance text-muted-foreground">
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </p>
        </div>
        <FormField
          className="grid gap-4"
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          className="grid gap-4"
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Mot de passe</FormLabel>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <FormControl>
                <Input
                  id="passowrd"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4">
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Pas de compte ?{" "}
        <Link to="/register" className="underline">
          S&apos;inscrire
        </Link>
      </div>
    </Form>
  );
}
