import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { getMyAppointments, getMyAppointmentsPersonnelSante } from "@/lib/api";
import { Rate, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { LocateFixed } from "lucide-react";
const AnyReactComponent = ({ text }) => <LocateFixed className="text-[red]" />;

export default function Home() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  const defaultProps = {
    center: {
      lat: user?.location?.coordinates[0] ?? 28.70406036,
      lng: user?.location?.coordinates[1] ?? 77.1024934,
    },
    zoom: 11,
  };

  useEffect(() => {
    async function fetchData() {
      let data;
      if (user?.role === "Patient") {
        data = await getMyAppointments();
      } else {
        data = await getMyAppointmentsPersonnelSante();
      }

      setAppointments(data.appointments);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Typography.Title level={2}>Bienvenue à AASD 🎉</Typography.Title>
      <div className="px-6 py-5 bg-gray-50 dark:bg-slate-950 border rounded-md">
        <div className="flex items-center">
          <Avatar className="w-16 h-16 mr-4">
            <AvatarImage
              alt="User Avatar"
              src={
                import.meta.env.VITE_API_CDN_SERVER +
                "/images/" +
                user?.profilePicture
              }
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{user?.numTel}</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Informations personnelles
            </h2>
            <div className="text-gray-600 dark:text-gray-400 mb-2">
              <p>
                <span className="font-bold">Adresse: </span>
                {user?.adresse}
              </p>
              <p>
                <span className="font-bold">Rôle: </span>
                {user?.role}
              </p>
              <p>
                <span className="font-bold">Date de naissance: </span>
                {dayjs(user?.dob).format("MMMM DD, YYYY")}
              </p>
              <p>
                <span className="font-bold">Genre:</span>
                {user?.gender === "M" ? "Homme" : "Femme"}
              </p>
              {user?.role !== "Patient" && (
                <div className="mt-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Note moyenne
                  </h2>
                  <Rate disabled allowHalf defaultValue={user?.ratingAverage} />
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Consultations
            </h2>
            <div className="text-gray-600 dark:text-gray-400 mb-2">
              <ul className="space-y-2">
                {appointments
                  .slice(
                    appointments?.length > 3 ? appointments?.length - 3 : 0,
                    3
                  )
                  .map((appointment, index) => (
                    <li key={index}>
                      <div className="font-bold">
                        {appointment.serviceName ?? "N/A"}{" "}
                        <Tag
                          color={
                            appointment?.status === "En attente"
                              ? "orange"
                              : appointment?.status === "Accepté"
                              ? "green"
                              : "default"
                          }
                        >
                          {appointment?.status}
                        </Tag>
                      </div>
                      <div>
                        {dayjs(appointment.startDate).format(
                          "MMMM DD, YYYY HH:mm"
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full mt-4">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCyMZ6aNd0H2UOb8TO8rxL0qGNOLXntLlM",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={defaultProps?.center?.lat}
              lng={defaultProps?.center?.lng}
            />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
