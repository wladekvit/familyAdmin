import { useState } from "react";

const useGetCategories = () => {
  const [dataCat, setDataCat] = useState(0);
  const changeCategory = () => {
    setDataCat(Math.floor(Math.random() * Math.floor(100)));
  };
  console.log(dataCat)
  return { data: dataCat, changeCategory };
};

export default useGetCategories;
