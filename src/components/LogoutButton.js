import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout('https://stefanbartl.github.io/tom-ff-uniformen/')}>
      Log Out
    </button>
  );
};

export default LogoutButton;