export const getItemLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
