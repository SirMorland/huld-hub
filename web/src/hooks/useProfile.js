import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { useHistory } from "react-router";
import {getProfile, NotFoundError, UnauthorizedError} from '../api';

const useProfile = (id) => {
  const [profile, setProfile] = useState(null);
  const history = useHistory();
  useEffect(()=>{
    const jwt = Cookies.get("hub-jwt");
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
  }, [id, history]);
  return profile;
};

export default useProfile;