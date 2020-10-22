const removeCategories = (name) => {
  return {
    action: 'deleteCategories',
    name
  };
}
export default removeCategories;