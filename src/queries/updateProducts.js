const updateProducts = (id, newName, newUnits) => {
  return {
    action: 'updateProducts',
    id,
    newName,
    newUnits
  };
}
export default updateProducts;