const express = require("express");
const { body, param, query } = require("express-validator");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleWare");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");
const upload = require("../middleware/upload");
const router = express.Router();



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 }).withMessage("Page deve ser um número positivo")
      .toInt(),

    query("limit")
      .optional()
      .isInt({ min: 1 }).withMessage("Limit deve ser um número positivo")
      .toInt(),
    validate
  ]
  , UserController.getAllUsers);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: João da Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *       400:
 *         description: ID inválido (não é um número)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/:id",
  [
    param("id")
      .isInt().withMessage("O ID deve ser um número inteiro"),
    validate
  ],
  UserController.getUser
);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *                 description: Nome completo do usuário
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário (mínimo 6 caracteres)
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso!
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
 *         description: Campos obrigatórios não informados ou inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/",
  [
    body("name")

      .trim().notEmpty().withMessage("Name é um campo obrigatório")
      .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo NAME é 3")
      .escape(),

    body("email")
      .isEmail().withMessage("E-mail inválido")
      .normalizeEmail(),

    body("password")
      .trim()
      .notEmpty().withMessage("O campo password é obrigatório"),
    validate

  ],
  UserController.createUser
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário que será atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome atualizado do usuário
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 description: E-mail atualizado do usuário
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 description: Nova senha (opcional)
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário atualizado com sucesso!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: João da Silva
 *                     email:
 *                       type: string
 *                       example: joao@email.com
 *       400:
 *         description: Dados inválidos ou incompletos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/:id",
  [
    param("id")
      .isInt().withMessage("O ID deve ser um número inteiro"),

    body("name")
      .trim().notEmpty().withMessage("O campo NAME é obrigatório")
      .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo NAME é 3")
      .escape(),

    body("email")
      .trim()
      .isEmail().withMessage("E-mail inválido")
      .normalizeEmail(),
    validate
  ],
  UserController.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário que será deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       403:
 *         description: Acesso negado (não é admin)
 *       404:
 *         description: Usuário não encontrado
 */

router.delete(
  "/:id",
  authMiddleware,
  [
    param("id").isInt().withMessage("O ID deve ser um número inteiro"),
    validate
  ],
  UserController.deleteUser
);

/**
 * @swagger
 * /users/upload:
 *   post:
 *     summary: Faz upload da foto de perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */
router.post(
  "/upload",
  authMiddleware,           // 🔒 Garante que o usuário está autenticado
  upload.single("file"),    // 📎 Faz o upload
  UserController.uploadPhoto // 🧠 Chama o controller
);

module.exports = router;

