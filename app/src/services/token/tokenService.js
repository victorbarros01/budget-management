import jwt from 'jsonwebtoken'

export const createToken = (id, role) => {
    const token = jwt.sign(
        { id: id, role: role },
        process.env.JWT_SECRETEKEY,
        { expiresIn: '5d' }
    );

    return token
}