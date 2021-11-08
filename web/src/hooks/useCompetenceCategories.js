import {useEffect, useState} from "react";
import { useHistory } from "react-router";
import {getCompetenceCategories, NotFoundError, UnauthorizedError} from '../api';

const useCompetenceCategories = (jwt) => {
  const [competenceCategories, setCompetenceCategories] = useState([]);
  const history = useHistory();
  useEffect(()=>{
    const fetchCompetenceCategories = async () => {
      try {
        const json = await getCompetenceCategories(jwt);
        setCompetenceCategories(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setCompetenceCategories([]);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };
    if (jwt) fetchCompetenceCategories();
  }, [history, jwt]);
  return competenceCategories;
};

export default useCompetenceCategories;