const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/signup",
    [
        body("name")
            .notEmpty().withMessage("O nome é obrigatório")
            .isLength({ min: 3 }).withMessage("O nome deve ter pelo menos 3 caracteres"),
        body("email")
            .trim().normalizeEmail().isEmail().withMessage("Email inválido"),
        body("password")
            .isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres")
            .matches(/\d/).withMessage("A senha deve conter pelo menos um número")
            .matches(/[A-Z]/).withMessage("A senha deve conter pelo menos uma letra maiúscula"),
            validate
    ],
    authController.signup);

router.post("/login",
    [
        body("email").isEmail().withMessage("Email inválido"),
        body("password").notEmpty().withMessage("Senha obrigatória"),
        validate
    ],
    authController.login);

module.exports = router;