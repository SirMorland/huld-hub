import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getRoles, NotFoundError, UnauthorizedError } from "../api";

const useGetRoles = (jwt) => {
    const [roles, setRoles] = useState({ ADMIN: null, EMPLOYEE: null });
    const history = useHistory();
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const json = await getRoles(jwt);
                setRoles({
                    ADMIN: json.roles.find(item => item.type === "admin"),
                    EMPLOYEE: json.roles.find(item => item.type === "employee"),
                });
            } catch (error) {
                switch (true) {
                    case error instanceof NotFoundError:
                        setRoles({ ADMIN: null, EMPLOYEE: null });
                        break;
                    case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
                        history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
                        break;
                    default:
                        break;
                }
            }
        };
        if (jwt) fetchRoles();
    }, [history, jwt]);
    return roles;
};

export default useGetRoles;
