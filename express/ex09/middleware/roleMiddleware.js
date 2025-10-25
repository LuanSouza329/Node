function authorizeRole(){
    return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
}

module.exports = authorizeRole;
