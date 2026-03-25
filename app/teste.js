import bcrypt from 'bcrypt';

const saltRounds = 10;
const senha = '2184921-0135Vic'


const senhaHash = await bcrypt.hash(senha, saltRounds)
console.log(senhaHash);


const compare = await bcrypt.compare('12125125', senhaHash);
console.log(compare);