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
import { forgotPassword, resetPassword } from "@/lib/api";
import { message } from "antd";

const FormSchema = z.object({
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
  confirm_password: z.string().min(1, {
    message: "Please confirm your password",
  }),
});

const ResetPassword = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirm_password: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await resetPassword(data);
    } catch (error) {
      message.error(error ?? "");
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-[350px] gap-3"
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your new password below to continue
          </p>
        </div>
        <FormField
          className="grid gap-4"
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

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
        <FormField
          className="grid gap-4"
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>

              <FormControl>
                <Input
                  id="confirm_password"
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
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPassword;
