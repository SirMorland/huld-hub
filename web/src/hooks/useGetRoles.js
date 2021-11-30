import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getRoles, NotFoundError, UnauthorizedError } from "../api";

const useGetAllRoles = (jwt) => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const json = await getRoles(jwt);
                setUsers(json);
            } catch (error) {
                switch (true) {
                    case error instanceof NotFoundError:
                        setUsers([]);
                        break;
                    case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
                        history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
                        break;
                    default:
                        break;
                }
            }
        };
        if (jwt) fetchUsers();
    }, [history, jwt]);
    return users;
};

export default useGetAllRoles;
