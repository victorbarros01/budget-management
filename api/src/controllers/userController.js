import * as userService from '../services/user/userServices.js';

/* GET */
export const getUser = async (req, res) => {
    const id = req.userId;
    try {
        if (id) {
            const user = await userService.getUser(id);
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

/* LOGIN */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ message: 'Preencha os campos corretamente.' })
        }
        const login = await userService.loginUser(email, password);
        res.status(200).json(login);
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const logoutUser = async (req, res) => {
    const id = req.userId;
    if (!id) {
        return res.status(400).json({ message: 'Nenhum usuário logado.' });
    }
    req.userId = null;
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
}

/* CREATE */
export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await userService.createUser(name, email, password, role);
        res.status(200).json(user);
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await userService.verifyEmail(token);
        if (user) {
            res.status(200).json({ message: 'Email verificado com sucesso.' });
        } else {
            res.status(400).json({ message: 'Token inválido ou expirado.' });
        }
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.resendVerifyEmail(email);
        if (user) {
            res.status(200).json({ message: 'Email de verificação reenviado com sucesso.' });
        } else {
            res.status(400).json({ message: 'Usuário não encontrado ou email já verificado.' });
        }
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

/* UPDATE */

export const updatePassword = async (req, res) => {
    const id = req.userId;
    const { oldpassword, newpassword } = req.body;
    try {
        if (!oldpassword || !newpassword) {
            return res.status(401).json({ message: 'Preencha corretamente os campos!' })
        }
        const passwordChanged = await userService.updatePassword(id, oldpassword, newpassword);
        res.status(200).json(passwordChanged);
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const updateEmail = async (req, res) => {
    const id = req.userId;
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(401).json({ message: 'Preencha os campos corretamente.' })
        }
        const emailChanged = await userService.updateEmail(id, email);
        res.status(200).json(emailChanged);
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const updateUser = async (req, res) => {
    const id = req.userId;
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(401).json({ message: 'Preencha os campos corretamente.' })
        }
        const userChanged = await userService.updateUser(id, name);
        res.status(200).json(userChanged);
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}

/* DELETE */
export const deleteUser = async (req, res) => {
    const id = req.userId;
    try {
        const user = await userService.deleteUser(id);
        res.status(200).json(user)
    } catch (error) {
        if (error.message) {
            res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error." });
    }
}
