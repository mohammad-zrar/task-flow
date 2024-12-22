export const isDateExpired = (expirationDate: string): boolean => {
  const currentTime = new Date().getTime();
  const expirationTime = new Date(expirationDate).getTime();

  return expirationTime <= currentTime;
};