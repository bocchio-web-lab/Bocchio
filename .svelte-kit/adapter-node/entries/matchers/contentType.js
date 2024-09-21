const match = (param) => {
  const types = ["projects", "mix"];
  return types.includes(param);
};
export {
  match
};
