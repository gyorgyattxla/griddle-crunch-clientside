export const saveUserId = (id: number) => {
  localStorage.setItem('client_id', id.toString());
};

export const getUserId = (): string | null => {
  return localStorage.getItem('client_id');
};

export const clearUserData = () => {
  localStorage.removeItem('client_id');
  localStorage.removeItem('client');
};