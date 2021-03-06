import { useEffect, useState } from "react";
import { restRequest } from "../utils/restRequest";

export function useRequestQueries(objParams, showModalInfo) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const forceRequest = () => {
    setCount(count + 1);
  };

  const requestAction = async () => {
    console.log("requestAction", data);
    try {
      const data = await restRequest(objParams);
      if (data && data.hasOwnProperty("error")) {
        showModalInfo(true, data.error, false);
      } else {
        setData(data);
      }
    } catch (e) {
      showModalInfo(true, "Что-то пошло не так. Сервер не отвечает", false);
    }
  };

  useEffect(() => {
    requestAction().then();
  }, [count]);


  return { data, forceRequest };
}
