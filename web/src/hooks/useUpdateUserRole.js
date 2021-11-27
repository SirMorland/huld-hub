import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { updateUserRole, NotFoundError, UnauthorizedError } from "../api";

const useUpdateUserRole = (jwt, user, role) => {
  const [roles, setRoles] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const update = async () => {
      try {
        const json = await updateUserRole(jwt, user, role);
        setRoles(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setRoles([]);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };
    if (jwt) update();
  }, [history, jwt, user, role]);
  return roles;
};

export default useUpdateUserRole;
