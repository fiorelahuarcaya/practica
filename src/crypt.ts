import bcrypt from 'bcrypt';
const saltRounds = 10;

export function createHash(word:string){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(word, salt);
    return hash;
}

export function compareHash(word:string, hash:string){
    return bcrypt.compareSync(word, hash);
}