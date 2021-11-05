import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const jwt = Cookies.get("hub-jwt");
    const fetchUser = async (jwt) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/users/me`;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });
      if (response.status === 200) {
        let json = await response.json();
        setUser(json);
      } else {
        setUser(false);
      }
    }

    if (jwt) {
      fetchUser(jwt);
    } else {
      setUser(false);
    }
  }, []);
  return user;
}

export default useUser;

