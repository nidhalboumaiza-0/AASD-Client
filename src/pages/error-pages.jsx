import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "@/assets/not-found.svg";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContextProvider";

function NotFound() {
  const { isLoggedIn } = React.useContext(AuthContext);

  const Navigate = useNavigate();

  const handleNavigate = () => {
    if (isLoggedIn) {
      Navigate("/");
    } else {
      Navigate("/login");
    }
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center">
          <img src={notFoundImg} alt="404" />
        </div>
        <p className="text-muted-foreground my-4">
          Sorry, the page you visited does not exist.
        </p>
        <Button onClick={handleNavigate}>Back Home</Button>
      </div>
    </div>
  );
}

export { NotFound };
