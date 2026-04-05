import * as hashPasswordService from '../utils/hashPasswordService.js'
import * as emailValidateServices from '../utils/emailValidateServices.js'
import prisma from '../../lib/prisma.js'
import { randomUUID } from 'crypto';
import { createToken } from '../token/tokenService.js';

/* GET */
export const getUser = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}

/* LOGIN */
export const loginUser = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user.emailVerified === false) throw new Error('Email não verificado, verifique sua caixa de entrada e tente novamente.');
            if (!user) throw new Error('Usuário não encontrado');

        const passwordValidate = await hashPasswordService.hashComparePassword(password, user.password);
        if (!passwordValidate) throw new Error('Senha Incorreta');

        const token = createToken(user.id, user.role);
        return token;
    } catch (error) {
        console.error(error);
    }
}

/* CREATE */
export const createUser = async (name, email, password, role = 'USER') => {
    try {
        const token = randomUUID();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error('Este email já está cadastrado.');

        const hashPassword = await hashPasswordService.hashPassword(password);
        if (!hashPassword) return console.error('Ocorreu algum problema ao tentar cadastrar sua senha, tente novamente.')

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                role: role,
                emailVerified: false,
                verifyToken: token,
                verifyExpires: new Date(Date.now() + 60 * 60 * 1000) // Token expira em 24 hora
            }
        });

        await emailValidateServices.emailToken(email, token);

    } catch (error) {
        console.error(error);
    }
}

export const verifyEmail = async (token) => {
    try {
        console.log("bla");
        const user = await prisma.user.findUnique({
            where: {
                verifyToken: token
            }
        })
        if (user && user.verifyExpires > new Date()) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: true,
                    verifyToken: null,
                    verifyExpires: null
                }
            })
            console.log('Email verificado com sucesso.');
        }
    } catch (error) {
        console.error(error);
    }
}

export const resendVerifyEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) return console.error('Usuário não encontrado.');
        if (!user.verifyEmail) return console.error('Email já verificado.');

        const token = randomUUID();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verifyToken: token,
                verifyExpires: expiresAt
            }
        })

        await emailValidateServices.emailToken(email, token);
    } catch (error) {
        console.error(error);
    }
}

/* UPDATE */
export const updatePassword = async (id, oldpassword, newpassword) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        const comparePassword = hashPasswordService.hashComparePassword(oldpassword, user.password);

        if (comparePassword) {
            const hashNewPassword = await hashPasswordService.hashPassword(newpassword)
            return await prisma.user.update({
                where: { id: id },
                data: {
                    password: hashNewPassword
                }
            })
        } else {
            console.error('Senha antiga não bate com os dados cadastrados.');
        }

    } catch (error) {
        console.error(error);
    }
}

export const updateEmail = async (id, email) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email
            }
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (id, name) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}

/* DELETE */
export const deleteUser = async (id) => {
    try {
        const user = await prisma.user.deleteUnique({
            where: {
                id: id
            }
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}
