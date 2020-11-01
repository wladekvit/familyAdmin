const addPurchases = (date, name, category, price, unit, quality) => {
  return {
    action: "addPurchases",
    date,
    name,
    category,
    price,
    unit,
    quality
  };
};
export default addPurchases;
