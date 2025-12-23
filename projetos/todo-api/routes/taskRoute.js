import express from "express"
import { body, param, query } from "express-validator";
import { validate } from "../middleware/validate.js";
import TaskController from "../controllers/TaskController.js";

const router = express.Router();

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Retorna todas as taks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Lista de task
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   descricao:
 *                     type: string
 */
router.get("/task", TaskController.getAllTask);

/**
 * @swagger
 * /api/task/search/{id}:
 *   get:
 *     summary: Busca uma task pelo ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da task a ser buscada
 *     responses:
 *       200:
 *         description: Task encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: Agora testando o validator
 *                 descricao:
 *                   type: string
 *                   example: Agora já está escrito
 *       400:
 *         description: ID inválido (não é um número)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get(
  "/task/search/:id",
  param("id").isInt().withMessage("O ID deve ser um número inteiro").trim(),
  validate,
  TaskController.getTask
);


/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Cria uma nova task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Nome da task
 *                 example: Estudar MySql
 *               descricao:
 *                 type: string
 *                 description: Descrição da task
 *                 example: Estudar MySQL todos os dias nos próximos 30 dias a partir de 01 jan 2026
 *     responses:
 *       201:
 *         description: Task criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task criada com sucesso!
 *                 Task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       example: Estudar MySql
 *                     descricao:
 *                       type: string
 *                       example: Estudar MySQL todos os dias nos próximos 30 dias a partir de 01/2026
 *       400:
 *         description: Campos obrigatórios não informados ou inválidos
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/task/create",
    body("titulo")

        .trim().notEmpty().withMessage("Titulo é um campo obrigatório")
        .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo título é 3")
        .escape(),

    body("descricao")
        .trim().notEmpty().withMessage("Descricao é um campo obrigatório")
        .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo descricao é 3")
        .escape(),

    validate,
    TaskController.createTask);

/**
 * @swagger
 * /api/task/update/{id}:
 *   put:
 *     summary: Atualiza os dados de uma task existente
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: As informações da task será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Titulo atualizado da task
 *                 example: Estudar MySQL
 *               descricao:
 *                 type: string
 *                 description: Descrição atualizada da task
 *                 example: Estudar MySQL nos próximos 2 meses a part de 01 Jan 2026
 *     responses:
 *       200:
 *         description: Task atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task atualizada com sucesso!
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       example: Estudar MySQL
 *                     descricao:
 *                       type: string
 *                       example: Estudar MySQL nos próximos 2 meses a part de 01 Jan 2026
 *       400:
 *         description: Dados inválidos ou incompletos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.put(
  "/task/update/:id",
  param("id").isInt().withMessage("O ID deve ser um número inteiro").trim(),

  body("titulo")
    .trim()
    .notEmpty().withMessage("Titulo é um campo obrigatório")
    .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo título é 3")
    .escape(),

  body("descricao")
    .trim()
    .notEmpty().withMessage("Descricao é um campo obrigatório")
    .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo descricao é 3")
    .escape(),

  validate,
  TaskController.updateTask
);


/**
 * @swagger
 * /api/task/delete/{id}:
 *   delete:
 *     summary: Deleta uma task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da task que será deletada
 *     responses:
 *       200:
 *         description: Task deletado com sucesso
 *       404:
 *         description: task não encontrado
 */
router.delete(
  "/task/delete/:id",
  param("id").isInt().withMessage("O ID deve ser um número inteiro").trim(),
  validate,
  TaskController.deleteTask
);



export default router;