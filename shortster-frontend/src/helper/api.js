export const api = async (path, methodType, param = {}) => {
  console.log(path);
  console.log(methodType);
  console.log(param);
  const response = await fetch(path, {
    method: methodType || "GET",
    body: param ? JSON.stringify(param) : null,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const Status = await response.status;
    return { data, Status };
  } else {
    const data = await response;
    const Status = await response.status;
    return { data, Status };
  }
};
