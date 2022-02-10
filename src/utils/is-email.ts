export default (text: string) => {
  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexp.test(text);
}