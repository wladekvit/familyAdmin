const getPurchasesByName = (idProduct) => {
  return {
    action: 'getPurchasesByName',
    idProduct
  };
}
export default getPurchasesByName;