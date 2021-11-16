import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getCategoryCompetences, NotFoundError, UnauthorizedError } from '../api';

const useCompetences = (category, jwt) => {
  const [competences, setCompetences] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const fetchCompetenceCategories = async () => {
      try {
        const json = await getCategoryCompetences(category, jwt);
        const categoryCompetences = json.map(competence => ({ ...competence, category: competence.category.id }));
        setCompetences(categoryCompetences);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setCompetences([]);
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
  }, [history, jwt, category]);
  return competences;
};

export default useCompetences;