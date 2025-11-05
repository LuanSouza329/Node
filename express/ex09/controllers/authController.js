const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../src/util/AppError");
const asyncHandler = require("../middleware/asyncMiddleWare");

class authController {
    static signup = asyncHandler(async (req, res, next) => {
        const { name, email, password, role = "user" } = req.body;

        if (!name || !email || !password) {
            return next(new AppError("Todos os campos são obrigatórios", 400));
        }

        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return next(new AppError("E-mail já cadastrado", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser(name, email, hashedPassword, role);

        res.status(201).json({
            message: "Usuário registrado com sucesso",
            user: newUser
        });
    })



    static login = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        if (!user) {
            return (next(new AppError("Credênciais invalidas"), 401));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return (next(new AppError("Credênciais invalidas"), 401));
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
        );

        await User.updateRefreshToken(user.id, refreshToken);

        res.status(200).json({
            message: "Login bem-sucedido",
            accessToken,
            refreshToken
        });

    })

    static refreshToken = asyncHandler(async (req, res, next) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(new AppError("Refresh token é obrigatório", 400));
        }

        const user = await User.findByRefreshToken(refreshToken);

        if (!user) {
            return next(new AppError("Refresh token inválido", 401));
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return next(new AppError("Refresh token expirado ou inválido", 401));
            }

            const newAccessToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(200).json({
                message: "Novo access token gerado com sucesso",
                accessToken: newAccessToken
            });
        });
    });

    static logout = asyncHandler(async (req, res, next) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(new AppError("Refresh token é obrigatório", 400));
        }

        const user = await User.findByRefreshToken(refreshToken);

        if (!user){
            return next(new AppError("Token invalido ou não encontrado", 401));
        }

        await User.updateRefreshToken(user.id, null);

        res.status(200).json({message: "Logout realizado com sucesso"});
    })

}

module.exports = authController;