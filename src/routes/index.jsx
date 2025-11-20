import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { NotFound } from "@/pages/error-pages";
import { NewRequestPage, RequestListPage, RequestDetailPage } from "@/pages/request-pages";

// MAIN PAGES
const Home = lazy(() => import("@/pages/Home"));
const Profile = lazy(() => import("@/pages/Profile"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));

// AUTH PAGES
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Consultations = lazy(() => import("@/pages/Consultations"));
const Discussions = lazy(() => import("@/pages/Discussions"));


const Spin = ({ size }) => {
  return <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />;
};

const MainRouter = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100vh] items-center justify-center">
          <Spin size={"large"} />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="requests" element={<RequestListPage />} />
          <Route path="requests/new" element={<NewRequestPage />} />
          <Route path="requests/details/:id" element={<RequestDetailPage />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="discussions" element={<Discussions />} />
          <Route path="me" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

const AuthRouter = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div>
          <Spin  />
        </div>
      }
    >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
});

export { MainRouter, AuthRouter };
