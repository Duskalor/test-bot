export const GetRandomTime = () => {
  const min = 60000;
  const max = 120000;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
