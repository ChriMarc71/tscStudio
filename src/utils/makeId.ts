import crypto from "crypto";

function makeId(length: number): string {
  return crypto.randomBytes(length).toString();
}

export { makeId };
