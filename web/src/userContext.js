import React, { useContext, createContext } from "react";

export const UserContext = createContext({user: null, setJwt: null, jwt: null, logout: null});
UserContext.displayName = "User-Context";

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ value, children }) => {
  return React.createElement(
    UserContext.Provider,
    { value },
    children
  );
};
