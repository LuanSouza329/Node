const User = require("../models/User");
const AppError = require("../src/util/AppError");
const asyncHandler = require("../middleware/asyncMiddleWare");

class UserController {
  static getAllUsers = asyncHandler(async (req, res, next) => {
    const { page, limit, sort, order, name } = req.query;

    const users = await User.findAll({ page, limit, sort, order, name });

    res.status(200).json({
      success: true,
      page: Number(page) || 1,
      limit: Number(limit) || 5,
      total: users.length,
      data: users
    });
  });

  static getUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findUser(id);

    if (!user) {
      return next(new AppError("Usuário não encontrado", 404));
    }

    res.status(200).json(user);
  });

  static createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("Todos os campos são obrigatórios", 400));
    }

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return next(new AppError("E-mail já cadastrado", 400));
    }

    const newUser = await User.createUser(name, email, password);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: newUser
    });
  });


  static updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const { name, email } = req.body;

    if (!name || !email) {
      return (next(new AppError("Nome e Email são obrigatórios", 400)));
    }

    const updatedUser = await User.updateUser(id, name, email);

    if (!updatedUser) {
      return next(new AppError("Usuário não encontrado", 404));
    }

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser
    });
  })

  static deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deleted = await User.deleteUser(id);

    if (!deleted) {
      return next(new AppError("Usuário não encontrado", 404));
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  })

  static uploadPhoto = asyncHandler(async (req, res, next) => {
    const userId = req.body.id;
    const file = req.file;

    if (!file) {
      return next(new AppError("Nenhum arquivo foi enviado", 400));
    }

    await User.updatePhoto(userId, file.filename);

    res.status(200).json({
      message: "Foto de perfil atualizada com sucesso!",
      file: {
        name: file.filename,
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      }
    });
  })
}

module.exports = UserController; // 👈 exporta o controller, não o model
