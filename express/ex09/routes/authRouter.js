const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { route } = require("./userRoutes");

const router = express.Router();


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 example: Senha123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário registrado com sucesso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Maria Souza
 *                     email:
 *                       type: string
 *                       example: maria@email.com
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

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


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: teste@email.com
 *               password:
 *                 type: string
 *                 example: A123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Log-in bem sucedido
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */ 

router.post("/login",
    [
        body("email").isEmail().withMessage("Email inválido"),
        body("password").notEmpty().withMessage("Senha obrigatória"),
        validate
    ],
    authController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Gera um novo access token a partir do refresh token
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImVtYWlsIjoidGVzdGVAZW1haWwuY29tIiwiaWF0IjoxNzYyMjA1ODIwLCJleHAiOjE3NjIyMDU5NDB9.a0Go3EKEAsOGpzd-t1y6rVbnKITKOrt3IWGr9BZclFU
 *     responses:
 *       200:
 *         description: Novo access token gerado com sucesso
 *       401:
 *         description: Refresh token inválido ou expirado
 */
router.post("/refresh", authController.refreshToken)

module.exports = router;


