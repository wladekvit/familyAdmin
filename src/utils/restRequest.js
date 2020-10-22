export const restRequest = async function (objParams) {
  // const url = "https://jsonplaceholder.typicode.com/users";
  const url = "http://192.168.0.156:3003/api";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objParams)
  });
  return await response.json();
}