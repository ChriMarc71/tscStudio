import crypto from "crypto";

function makeid(length: any) {
  let result = "";
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function makeId(length: any): string {
  return length == "string"
    ? makeid(64)
    : crypto.randomBytes(length).toString();
}

export { makeId };
