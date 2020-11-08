const getPurchasesByPeriod = (dateFrom, dateTo) => {
  return {
    action: 'getPurchasesByPeriod',
    dateFrom,
    dateTo
  };
}
export default getPurchasesByPeriod;