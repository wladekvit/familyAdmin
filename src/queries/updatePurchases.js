const updatePurchases = (id, newPrice, newQuantity) => {
  return {
    action: 'updatePurchases',
    id,
    newPrice,
    newQuantity
  };
}
export default updatePurchases;