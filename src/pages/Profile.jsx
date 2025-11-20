import { SidebarNav } from "@/components/custom/side-navbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, message, Typography } from "antd";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { numberToDay } from "@/lib/utils";
import { TimePicker } from "antd";
import {
  updateProfile,
  updateUserPassword,
  updateWorkingTime,
} from "@/lib/api";
import { useNavigate } from "react-router-dom";

const ProfileFormSchema = z.object({
  numTel: z.string().min(1, { message: "Entrez votre numéro de telephone" }),
  address: z.string().min(1, { message: "Entrez votre addresse" }),
  lastName: z.string().min(1, { message: "Entrez votre nom" }),
  firstName: z.string().min(1, { message: "Entrez votre prénom" }),
  dob: z.string().min(1, {
    message: "Entrez votre date de naissance",
  }),
});

const AccountFormSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: "Entrez votre ancien mot de passe" }),
  newPassword: z.string().min(1, { message: "Entrez votre mot de passe" }),
  newPasswordConfirm: z
    .string()
    .min(1, { message: "Confirmez votre mot de passe" }),
});

const TimeWorkFormSchema = z.object({
  workingTime: z.array(
    z.object({
      day: z.number().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
  ).optional(),
});

const ProfileMenu = () => {
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      lastName: user?.lastName || "",
      firstName: user?.firstName || "",
      address: user?.adresse || "",
      numTel: user?.numTel || "",
      dob: user?.dob || "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      email: user?.email,
    };
    setLoading(true);
    try {
      const response = await updateProfile(payload);

      if (response)
        message.success("Votre profil a été mis à jour avec succès 🎉");
      setLoading(false);
    } catch (error) {
      message.error(error ?? "Une erreur s'est produite.");
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profil</h3>
        <p className="text-sm text-muted-foreground">
          C&apos;est ainsi que les autres vous verront sur le site.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            className="grid gap-4"
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input id="firstName" placeholder="Foulen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className="grid gap-4"
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input id="lastName" placeholder="Ben Foulen" {...field} />
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
            name="numTel"
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
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <DatePicker
                    value={dayjs(form.getValues("dob"))}
                    onChange={(date) => {
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
          <div className="grid gap-4">
            <Button type="submit" disable={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const AccountMenu = () => {
  const { user, setToken, setUser, setIsLoggedIn } =
    React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const Navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = { ...data };

    try {
      await updateUserPassword(payload);

      message.success(
        "Votre mot de passe a été mis à jour avec succès 🎉. Veuillez vous reconnecter."
      );

      setTimeout(() => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
        Navigate("/login");
      }, 4000);
    } catch (error) {
      message.error(error || "Une erreur s'est produite.");
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Compte</h3>
        <p className="text-sm text-muted-foreground">
          Mettez à jour les paramètres de votre compte.
        </p>
      </div>
      <Separator />
      <div className="p-3 grid gap-3">
        <Label>Email</Label>
        <Input value={user?.email} disabled />
      </div>
      <div className="border p-3 rounded-sm">
        <p className="text-sm text-muted-foreground">
          Mettez à jour votre mot de passe:
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              className="grid gap-4"
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe actuel</FormLabel>
                  <FormControl>
                    <Input
                      id="oldPassword"
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      id="newPassword"
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
              name="newPasswordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      id="newPasswordConfirm"
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
                Modifier
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const SettingsMenu = () => {
  const timeFormat = "HH:mm";
  const { user } = React.useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(TimeWorkFormSchema),
    defaultValues: {
      workingTime:
        user?.workingTime.length > 0
          ? user?.workingTime 
          : [
              { day: 0, start: "", end: "" },
              { day: 1, start: "", end: "" },
              { day: 2, start: "", end: "" },
              { day: 3, start: "", end: "" },
              { day: 4, start: "", end: "" },
              { day: 5, start: "", end: "" },
              { day: 6, start: "", end: "" },
            ],
    },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    name: "workingTime", // unique name for your Field Array
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
  });

  const onSubmit = async (data) => {
    let payload = {
      workingTime: [],
    };

    payload.workingTime = data.workingTime.map((time) => {
      return {
        day: time.day,
        start: dayjs(time.start, "HH:mm").format("YYYY-MM-DDTHH:mm:sss") + "Z",
        end: dayjs(time.end, "HH:mm").format("YYYY-MM-DDTHH:mm:sss") + "Z",
      };
    });

    try {
      await updateWorkingTime(payload);

      message.success(
        "Vos horaires de travail ont été mis à jour avec succès 🎉"
      );
    } catch (error) {
      message.error(error || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Paramétres</h3>
        <p className="text-sm text-muted-foreground">
          Mettez à jour vos horaires de travail.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-4">
              <Label className="text-sm text-muted-foreground">
                {numberToDay(index)}
              </Label>
              <div className="flex gap-4">
                <FormField
                  className="grid gap-4"
                  control={form.control}
                  name={`workingTime.${index}.start`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:w-[50%]">
                      <FormLabel>Heure de début</FormLabel>

                      <TimePicker
                        size="large"
                        onChange={(time) => {
                          const formattedDate = dayjs(time).format(timeFormat);

                          field.onChange(formattedDate);
                        }}
                        format={timeFormat}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="grid gap-4"
                  control={form.control}
                  name={`workingTime.${index}.end`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:w-[50%]">
                      <FormLabel>Heure de fin</FormLabel>

                      <TimePicker
                        size="large"
                        format={timeFormat}
                        onChange={(time) => {
                          const formattedDate = dayjs(time).format(timeFormat);

                          field.onChange(formattedDate);
                        }}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <Button type="submit">Enregistrer</Button>
        </form>
      </Form>
    </div>
  );
};

const Profile = () => {
  const { user } = React.useContext(AuthContext);
  const [selectedItem, setSelectedItem] = React.useState("/examples/forms");

  const handleSelectNav = (item) => {
    setSelectedItem(item.href);
  };

  const sidebarNavItems = [
    {
      title: "Profil",
      href: "/examples/forms",
    },
    {
      title: "Compte",
      href: "/examples/forms/account",
    },

    user?.role !== "Patient" && {
      title: "Paramètres",
      href: "/examples/forms/settings",
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Mon Profil</Typography.Title>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            handleSelect={handleSelectNav}
            selectedItem={selectedItem}
          />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {selectedItem === "/examples/forms" && <ProfileMenu />}
          {selectedItem === "/examples/forms/account" && <AccountMenu />}
          {selectedItem === "/examples/forms/settings" && <SettingsMenu />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
