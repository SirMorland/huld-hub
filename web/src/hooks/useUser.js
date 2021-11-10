import { useEffect, useState } from 'react';

const useUser = (jwt) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async (jwt) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/users/me`;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });
      if (response.status === 200) {
        try {
          let json = await response.json();
          setUser(json);
        } catch (e) {
        } 
      } else {
        setUser(false);
      }
    }

    if (jwt) {
      fetchUser(jwt);
    } else {
      setUser(false);
    }
  }, [jwt]);
  return user;
}

export default useUser;
