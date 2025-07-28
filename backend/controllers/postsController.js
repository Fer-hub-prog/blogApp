let posts = [
  {
    id: 1,
    titulo: 'Primeiro Post',
    conteudo: 'Conteúdo inicial',
    data: new Date().toISOString(),
  },
];

exports.getPosts = (req, res) => {
  res.json(posts);
};

exports.createPost = (req, res) => {
  const { titulo, conteudo } = req.body;
  const newPost = {
    id: Date.now(),
    titulo,
    conteudo,
    data: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;
  const index = posts.findIndex(post => post.id == id);
  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      titulo,
      conteudo,
      data: new Date().toISOString()
    };
    res.json(posts[index]);
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex(post => post.id == id);
  if (index !== -1) {
    const removed = posts.splice(index, 1);
    res.json(removed[0]);
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
};
