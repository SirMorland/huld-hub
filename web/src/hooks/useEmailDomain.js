import {useEffect, useState} from "react";
import { getEmailDomains } from '../api';

const useEmailDomain = (jwt) => {
  const [emailDomain, setEmailDomain] = useState([]);
  useEffect(()=>{
    const fetchEmailDomain = async () => {
      try {
        const domains = await getEmailDomains(jwt);
        setEmailDomain(domains);
      } catch (error) {
      }
    };

    fetchEmailDomain();

  }, [jwt]);
  return emailDomain;
};

export default useEmailDomain;