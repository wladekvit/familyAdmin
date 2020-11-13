const getPurchasesByName = (idProduct, dateFrom, dateTo) => {
  return {
    action: 'getPurchasesByName',
    idProduct,
    dateFrom,
    dateTo
  };
}
export default getPurchasesByName;