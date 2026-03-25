import * as userService from '../services/user/userServices.js';

/* GET */
export const getUser = async (req, res) => {
    const { id } = req.userId;;
    try {
        const user = await userService.getUser(id);
        res.status(200).json(user);
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

/* UPDATE */

export const updatePassword = async (req, res) => {
    const { id } = req.userId;
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
    const { id } = req.userId;
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
    const { id } = req.userId;
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
    const { id } = req.userId;
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
