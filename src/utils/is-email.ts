const isEmail = (text: string) => {
  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexp.test(text);
}

export default isEmail