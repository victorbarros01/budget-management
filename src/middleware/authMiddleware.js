import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
    {
        res.status(400).json({message: 'Token não encaminhado.'})
    }

    const token = authHeader.split(' ')[1];

    try{
        console.log(token, process.env.JWT_SECRETKEY);
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.userId = decoded.id;
        next()
    } catch(error)
    {
        console.error(error);
        res.status(401).json({message: 'Algo deu errado, tente novamente.'})
    }
}