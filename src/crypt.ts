import bcrypt from "bcrypt";
const saltRounds = 10;

export async function createHash(word: string) {
  const hash = await bcrypt.hash(word, saltRounds);
  console.log(hash);
  return hash;
}

export async function compareHash(word: string, hash: string) {
    const result = await bcrypt.compare(word, hash);
    return result;
}

