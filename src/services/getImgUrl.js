export const getImgUrl = (base64String) => {
  if (!base64String) return "";

  const base64Pattern = /^data:image\/(jpeg|png|jpg);base64,/;

  if (base64Pattern.test(base64String)) {
    return base64String;
  }

  return `data:image/jpeg;base64,${base64String}`;
};
