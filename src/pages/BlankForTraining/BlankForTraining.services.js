import { mockUsers, mockEmptyUser } from "../../db/mock-factor";

export const getDataById = (_id) => {
  const user = mockUsers(10).find((user) => {
    return user.id === +_id;
  });
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
    }, 0);
  });
  return promise;
};

export const getEmptyData = () => {
  return mockEmptyUser(10);
};
