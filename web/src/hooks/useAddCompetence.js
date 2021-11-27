import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { addCompetence, NotFoundError, UnauthorizedError } from "../api";

const useAddCompetence = (jwt, name, category) => {
  const [competence, setCompetence] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const addNewCompetence = async () => {
      try {
        const json = await addCompetence(jwt, name, category);
        setCompetence(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setCompetence([]);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };

    if (jwt) addNewCompetence();
  }, [history, jwt, name, category]);

  return competence;
};

export default useAddCompetence;
