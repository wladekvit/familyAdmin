const editCategories = (id, newName) => {
  return {
    action: 'editCategories',
    id,
    newName
  };
}
export default editCategories;