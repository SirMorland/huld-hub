import {useEffect, useState} from "react";
import { getEmailDomain } from '../api';

const useEmailDomain = () => {
  const [emailDomain, setEmailDomain] = useState("");
  useEffect(()=>{
    const fetchEmailDomain = async () => {
      try {
        const text = await getEmailDomain();
        setEmailDomain(text);
      } catch (error) {
      }
    };

    fetchEmailDomain();

  }, []);
  return emailDomain;
};

export default useEmailDomain;