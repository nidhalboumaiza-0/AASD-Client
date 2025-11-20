import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Link } from "react-router-dom";
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

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email",
    })
    .email(),
});

const ForgotPassword = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-[350px] gap-3"
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Mot de pass oublié ?</h1>
          <p className="text-balance text-muted-foreground">
            Entrez votre email ci-dessous pour réinitialiser votre mot de passe
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
        <div className="grid gap-4">
          <Button type="submit" className="w-full">
            Soumettre
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Pas de compte ?{" "}
        <Link to="/register" className="underline">
          S'inscrire
        </Link>
        <br />
        Vous avez déjà un compte?{" "}
        <Link to="/login" className="underline">
          Se connecter
        </Link>
      </div>
    </Form>
  );
};

export default ForgotPassword;
