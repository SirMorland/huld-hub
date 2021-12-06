import {useEffect, useState} from "react";
import { getEmailDomains } from '../api';

const useEmailDomains = (jwt) => {
  const [emailDomains, setEmailDomains] = useState([]);
  useEffect(()=>{
    const fetchEmailDomain = async () => {
      try {
        const domains = await getEmailDomains(jwt);
        setEmailDomains(domains);
      } catch (error) {
      }
    };

    fetchEmailDomain();

  }, [jwt]);
  return emailDomains;
};

export default useEmailDomains;