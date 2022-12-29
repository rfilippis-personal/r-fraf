export const getGender = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
      ]);
    }, 1000);
  });
  return promise;
};
