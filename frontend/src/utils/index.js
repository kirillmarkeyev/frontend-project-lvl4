/* eslint-disable import/prefer-default-export */

export const getAuthHeader = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};
