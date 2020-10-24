const editCategories = (oldName, newName) => {
  return {
    action: 'editCategories',
    oldName,
    newName
  };
}
export default editCategories;