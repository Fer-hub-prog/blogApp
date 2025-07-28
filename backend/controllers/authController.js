const users = [
  { id: 1, username: 'professor', password: '1234', role: 'professor' },
  { id: 2, username: 'aluno', password: '1234', role: 'aluno' }
];

exports.login = (req, res) => {
  console.log('🔐 Corpo da requisição:', req.body); // 👈 Verifique no terminal

  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return res.json({
      success: true,
      user: { id: user.id, role: user.role, username: user.username }
    });
  } else {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
};
