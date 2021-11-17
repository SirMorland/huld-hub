import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { searchProfiles, NotFoundError, UnauthorizedError } from "../api";

const useSearchProfiles = (keyword, jwt) => {
  const [searchedProfiles, setSearchedProfiles] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const searchingProfiles = async () => {
      try {
        const json = await searchProfiles(keyword, jwt);
        setSearchedProfiles(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setSearchedProfiles([]);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };
    if (jwt) searchingProfiles();
  }, [history, keyword, jwt]);
  return searchedProfiles;
};

export default useSearchProfiles;
