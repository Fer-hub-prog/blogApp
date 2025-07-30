
# 📱 BlogApp - React Native + Node.js

Aplicativo mobile educacional que permite a **criação de posts por professores** e a **visualização e busca por alunos**. Desenvolvido como parte do **Tech Challenge da Pós-Tech FIAP** (concluído em **30/07/2025**).

---

## ✅ Funcionalidades Entregues

- [x] **Autenticação** com persistência de login (aluno e professor)  
- [x] **CRUD completo de posts** com autor e data  
- [x] **Visualização e leitura de posts** (aluno e professor)  
- [x] **Busca por palavra-chave** no título e descrição  
- [x] **Validação de campos** ao criar/editar  
- [x] **Feedbacks visuais** com `Alert` para sucesso ou erro  
- [x] **Loading spinner** em requisições assíncronas  
- [x] **CRUD completo de professores e estudantes**  
- [x] **Painel administrativo para professores**  
- [x] **Botões de navegação “Voltar”** ajustados visualmente  
- [x] **ScrollView** e alinhamento centralizado para boa UX  
- [x] **Navegação protegida com React Navigation**

---

## 👥 Perfis de Usuário

### 👩‍🏫 Professor
- Login com e-mail e senha
- Acesso ao painel com botões:
  - Criar post
  - Gerenciar professores
  - Cadastrar professor
  - Gerenciar estudantes
  - Cadastrar estudante
  - Painel administrativo de posts
- Criação e edição de post com campo autor e data automáticos

### 👨‍🎓 Aluno
- Login com e-mail e senha
- Busca por título ou descrição
- Leitura completa dos posts
- Retorno do botão "Voltar" para login

---

## 🖼️ Layout da Aplicação

- Interface **limpa e intuitiva**, com **foco na usabilidade mobile**
- Paleta de cores clara com **inputs destacados**
- **Títulos centralizados**, campos com bordas arredondadas e preenchimento adequado
- **Botões de ação acessíveis**, com espaçamento confortável
- **Cards organizados com informações principais** (autor, título, descrição)
- **Navegação fluida e bem segmentada** por perfil (aluno/professor)

---

## 🚧 Dificuldades Encontradas

- O principal desafio foi **subir o backend Node.js localmente**, especialmente devido a:
  - Conflitos com CORS
  - Reconhecimento de `localhost` no emulador Android
  - Solução: uso do IP da máquina (`http://192.168.x.x:3000`) no lugar de `localhost`

---

## 🛠️ Tecnologias Utilizadas

### 📲 Frontend (React Native)
- React Native CLI
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- FlatList, ScrollView e StyleSheet

### 🌐 Backend (Node.js + JSON)
- Node.js + Express
- `cors`, `body-parser`
- Base de dados em `db.json`
- Estrutura modular com rotas e controllers

---

## 📁 Estrutura de Pastas

```
blogApp/
├── android/
├── ios/
├── src/
│   ├── navigation/
│   ├── screens/
│   └── App.tsx
├── assets/
├── backend/
│   ├── data/db.json
│   ├── controllers/
│   ├── routes/
│   └── server.js
```

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Backend (Node.js)

```bash
cd blogApp/backend
npm install
node server.js
```

> Acesse via: `http://192.168.x.x:3000` (use o IP da sua máquina)

---

### 2️⃣ App Mobile

```bash
cd blogApp
npm install

# Inicie o Metro Bundler
npx react-native start

# Em outro terminal
npx react-native run-android
```

---

## 🔑 Login para Testes

### Professor
```
email: prof@fiap.com
senha: 123
```

### Aluno
```
email: aluno@fiap.com
senha: 123
```

---

## 💡 Extras Opcionais Implementados

- ✅ Validações de entrada e campos obrigatórios
- ✅ Feedback visual (Alert) em todas as ações
- ✅ Persistência de login (AsyncStorage)
- ✅ Navegação protegida
- ✅ Painel administrativo completo
- ✅ CRUD de professores e estudantes
- ✅ Botões de voltar estilizados
- ✅ Navegação fluida com scroll e layout responsivo

---

## 📦 Publicação

- GitHub: [github.com/Fer-hub-prog/blogApp](https://github.com/Fer-hub-prog/blogApp)
