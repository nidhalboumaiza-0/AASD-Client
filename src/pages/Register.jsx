import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "antd";
// import { DatePicker } from "@/components/custom/date-picker";
import { genders, roles } from "@/lib/constants";
import ImageUpload from "@/components/custom/image-upload";
import { register } from "@/lib/api";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  role: z.string().min(1, { message: "`Selectionez votre role`" }),
  gender: z.string().min(1, { message: "Selectionez votre genre" }),
  password: z.string().min(1, { message: "Entrez votre mot de passe" }),
  email: z.string().min(1, { message: "Entrez votre email" }).email(),
  phone_number: z
    .string()
    .min(1, { message: "Entrez votre numéro de telephone" }),
  address: z.string().min(1, { message: "Entrez votre addresse" }),
  last_name: z.string().min(1, { message: "Entrez votre nom" }),
  first_name: z.string().min(1, { message: "Entrez votre prénom" }),
  dob: z.string().min(1, {
    message: "Entrez votre date de naissance",
  }),
  confirm_password: z
    .string()
    .min(1, { message: "Confirmez votre mot de passe" }),
});

const Register = () => {
  const { toast } = useToast();
  const Navigate = useNavigate();
  const [imgFile, setImgFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: "",
      email: "",
      gender: "",
      password: "",
      last_name: "",
      first_name: "",
      address: "",
      phone_number: "",
      dob: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    data.imgFile = imgFile;

    try {
      const response = await register(data);

      if (response.message) {
        toast({
          title: "Enregistré avec succès",
          description: (
            <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <p className="text-white">{response?.message}</p>
            </div>
          ),
        });

        form.reset();

        setTimeout(() => {
          Navigate("/login");
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Oups !",
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
          <h1 className="text-3xl font-bold">S'inscrire</h1>
          <p className="text-balance text-muted-foreground">
            Remplissez le formulaire ci-dessous pour vous inscrire
          </p>
        </div>
        <FormField
          className="grid gap-4"
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vous étez ?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-3"
                >
                  {roles?.map((role) => {
                    return (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={role.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {role.label}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <ImageUpload setFile={setImgFile} />
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
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input id="phone" placeholder="+216 99 999 999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          className="grid gap-4"
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input
                  id="adr"
                  placeholder="Avenue Habib Bourguiba, Tunis"
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input id="first_name" placeholder="Foulen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          className="grid gap-4"
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input id="last_name" placeholder="Ben Foulen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          className="grid gap-4"
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <DatePicker
                  onChange={(date, dateString) => {
                    const formattedDate = format(new Date(date), "P");
                    // form.setValue("dob", formattedDate);
                    field.onChange(formattedDate);
                  }}
                  size="large"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          className="grid gap-4"
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-3"
                >
                  {genders?.map((gender) => {
                    return (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={gender.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {gender.label}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          className="grid gap-4"
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
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
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  id="confirm_passowrd"
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
          <Button type="submit" className="w-full" disable={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            S'inscrire
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Vous avez déjà un compte?{" "}
        <Link to="/login" className="underline">
          Se connecter
        </Link>
      </div>
    </Form>
  );
};

export default Register;
