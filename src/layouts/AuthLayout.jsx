import {  Outlet } from "react-router-dom";

import medicalTeamImage from '@/assets/images/Doctors-cuate.svg'

export default function AuthLayout() {
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex items-center justify-center py-12">
        <div>
         <Outlet />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={medicalTeamImage}
          alt="Image"
          className="w-full"
        />
      </div>
    </div>
  );
}
