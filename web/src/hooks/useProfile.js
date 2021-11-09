import {useEffect, useState} from "react";
import { useHistory } from "react-router";
import {getProfile, NotFoundError, UnauthorizedError} from '../api';

const useProfile = (id, jwt) => {
  const [profile, setProfile] = useState(null);
  const history = useHistory();
  useEffect(()=>{
    const fetchProfile = async (id) => {
      try {
        const json = await getProfile(id, jwt);
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
    if (jwt) fetchProfile(id);
  }, [id, history, jwt]);
  return profile;
};

export default useProfile;