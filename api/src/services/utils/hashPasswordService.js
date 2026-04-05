import bcrypt from 'bcrypt';
const saltRounds = 10;


export const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}

export const hashComparePassword = async (password, hashPasswordDB) =>
{
    return await bcrypt.compare(password, hashPasswordDB);
}