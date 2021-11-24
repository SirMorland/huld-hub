import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getProfileById, NotFoundError, UnauthorizedError } from "../api";

/**
 * profile === null means we are waiting for profile
 * profile === false means there is no profile
 */
const useProfile = (profileId, jwt) => {
  const [profile, setProfile] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchProfile = async (profileId) => {
      try {
        const json = await getProfileById(profileId, jwt);
        setProfile(json);
      } catch (error) {
        switch (true) {
          case error instanceof NotFoundError:
            setProfile(false);
            break;
          case error instanceof UnauthorizedError: //TODO: this does not necessarily mean the email is not confirmed
            history.push("/almost-done"); //We should return more accurate errors to deduce why user is not authorized
            break;
          default:
            break;
        }
      }
    };
    if (jwt) fetchProfile(profileId);
  }, [profileId, history, jwt]);
  return [profile, setProfile];
};

export default useProfile;
