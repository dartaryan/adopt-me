const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];
  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/animal?id=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return apiRes.json();
};

export default fetchBreedList;
