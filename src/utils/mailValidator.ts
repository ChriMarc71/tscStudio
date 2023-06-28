import validator from "email-validator";

const isValidEmail = (email: string): boolean => {
  return validator.validate(email);
};

export default isValidEmail;
