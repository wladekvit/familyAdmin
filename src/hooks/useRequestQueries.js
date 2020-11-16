import { useEffect, useState } from "react";
import { restRequest } from "../utils/restRequest";

export function useRequestQueries(objParams, showModalInfo) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const forceRequest = () => {
    setCount(count + 1);
  };

  const requestAction = async () => {
    try {
      const data = await restRequest(objParams, true);
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
    requestAction().then(() => {
      // console.log(data);
    });
  }, [count]);

  return { data, forceRequest };
}
