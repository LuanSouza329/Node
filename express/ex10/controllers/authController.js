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

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ message: "Log-in bem sucedido", token });
    })
}

module.exports = authController;