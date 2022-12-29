export async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    const throwError = { message: "Failed to fetch countries", status: 500 };
    throw throwError;
  }

  const responseJSON = await response.json();

  return responseJSON.sort((a, b) => {
    const firstName = a.name.common.toLowerCase();
    const secondName = b.name.common.toLowerCase();

    if (firstName < secondName) return -1;
    if (firstName > secondName) return 1;
    return 0;
  });
}
