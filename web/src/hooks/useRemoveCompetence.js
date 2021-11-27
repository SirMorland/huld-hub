import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { removeCompetence, NotFoundError, UnauthorizedError } from "../api";

const useRemoveCompetence = (jwt, id) => {
  const [result, setResult] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const remove = async () => {
      try {
        const json = await removeCompetence(jwt, id);
        setResult(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setResult([]);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };

    if (jwt) remove();
  }, [history, jwt, id]);

  return result;
};

export default useRemoveCompetence;
