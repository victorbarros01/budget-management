import { empty } from '@prisma/client/runtime/client';
import prisma from '../../lib/prisma.js'
import * as hashPasswordService from '../utils/hashPasswordService.js'
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
export const createUser = async (name, email, password, role) => {
    try {
        const hashPassword = await hashPasswordService.hashPassword(password);
        if (!hashPassword) return console.error('Ocorreu algum problema ao tentar cadastrar sua senha, tente novamente.')

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }
        });
        return user;

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
