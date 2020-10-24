const addProducts = (name, category, unit) => {
  return {
    action: 'addProducts',
    name,
    category,
    unit
  };
}
export default addProducts;