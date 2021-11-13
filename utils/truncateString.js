export const truncateString = (value, n = 200) => {
  let str = value || '';
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
}