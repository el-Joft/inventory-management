export const isEmail = (email: string): boolean =>
  /^\w{2,}@\w{2,}\.\w{2,}$/.test(email);

export const isPhoneNumber = (number: string): boolean =>
  /^[0]\d{7,15}$/.test(number);
