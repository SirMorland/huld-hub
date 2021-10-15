import { useEffect, useState } from 'react';

function Ping() {
  let [message, setMessage] = useState("Waiting for response...");

  useEffect(() => {
    let fetchData = async() => {
      let response = await fetch("http://localhost:1337/ping");
      let text = await response.text();
	    setMessage(text);
    }

    fetchData();
  }, []);

  return (
	  <h1>{message}</h1>
  );
}

export default Ping;
