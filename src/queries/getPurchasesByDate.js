const getPurchasesByDate = (date) => {
  return {
    action: 'getPurchasesByDate',
    date
  };
}
export default getPurchasesByDate;