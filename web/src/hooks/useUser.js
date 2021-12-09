import { useEffect, useState } from 'react';
/**
 * user === null means we are waiting for user
 * user === false means there is no current user
 */
const useUser = (jwt) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async (jwt) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/users/me`;
      try {
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        });
        if (response.status === 200) {
          try {
            let json = await response.json();
            console.log(json);
            json.profileId = json.profile
            setUser(json);
          } catch (e) {
          }
        } else if (response.status === 401) {
          setUser({ confirmed: false });
        } else setUser(false);
      } catch (error) {
        let json = { connectionError: true };
        setUser(json);
        console.log(error);
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

