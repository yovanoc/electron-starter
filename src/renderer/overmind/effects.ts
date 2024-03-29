export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};
