import React, { createContext, useEffect, useState } from "react";
import LocalStorageService from "@/lib/localStorageService";
import { message } from "antd";
import { saveLocation } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    LocalStorageService.getAccessToken() ? true : false
  );
  const [token, setToken] = useState(
    LocalStorageService.getAccessToken() ?? ""
  );
  const [user, setUser] = useState(LocalStorageService.getUser ?? null);

  // Get current geographic location
  const saveCurrentLocation = async () => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const currentLocation = [
            latitude,
            longitude,
          ]

          if (isLoggedIn && user) {
            // Save location to user logic
            const payload = {
              location: {
                coordinates : currentLocation
              }
            }
  
            try {
              await saveLocation(payload);
            } catch (error) {
              message.error("Une erreur s'est produite lors de l'enregistrement de votre position actuelle.")
            }
         
          }
          
        },
        (error) => {
          message.info("Veuillez activer la géolocalisation.")
          return null;
        }
      );

      return currentLocation;
    } else {
      message.error("La géolocalisation n'est pas prise en charge par ce navigateur.")
    }
  };

  const docHourlyVerification = async () => {
    if (isLoggedIn && user) {
      if(user.role === 'Medecin' && user?.workingTime?.length === 0) {
        toast({
          title: "❌ Il manque du temps de travail ⏰",
          description: (
            <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <p className="text-white">Merci de renseigner votre temps de travail depuis les paramètres de votre profil afin de pouvoir recevoir des demandes de consultation.</p>
            </div>
          ),
        });
      }
    }
  
  }

  useEffect(() => {
    saveCurrentLocation();
    docHourlyVerification();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, token, setToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
