// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('backend/data/db.json'); // ajuste o path se necessário
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;

  const professor = db.get('professores').find({ email: username, senha: password }).value();
  const aluno = db.get('estudantes').find({ email: username, senha: password }).value();

  if (professor) {
    return res.json({ success: true, user: { role: 'professor' } });
  } else if (aluno) {
    return res.json({ success: true, user: { role: 'aluno' } });
  } else {
    return res.json({ success: false });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('✅ JSON Server rodando em http://localhost:3000');
});