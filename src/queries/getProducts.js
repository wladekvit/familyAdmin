const getProducts = (category) => {
  return {
    action: 'getProducts',
    category
  };
}
export default getProducts;