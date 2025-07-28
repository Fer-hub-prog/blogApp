# 📱 BlogApp - React Native + Node.js

Aplicativo mobile educacional que permite a **criação de posts por professores** e a **visualização e busca por alunos**. Desenvolvido como parte do Tech Challenge da Pós-Tech FIAP (23/07/2025).

---

## ✅ Funcionalidades Entregues

- [x] Autenticação (Professor e Aluno)  
- [x] CRUD completo de posts (professores)  
- [x] Visualização de posts (alunos e professores)  
- [x] Busca por palavra-chave nos posts  
- [x] Tela de leitura completa do post  
- [x] Validações de campos ao criar/editar  
- [x] Feedback visual após salvar/excluir  
- [x] Indicador de carregamento (loading)  
- [x] Splash Screen animada com imagem  
- [x] Persistência de login com `AsyncStorage`  
- [x] Navegação com `React Navigation`

---

## 👥 Perfis de Usuário

### 👩‍🏫 Professor
- Login com e-mail e senha fixos  
- Pode **criar, editar e excluir** posts  
- Visualiza lista com botões de edição  

### 👨‍🎓 Aluno
- Login com e-mail e senha fixos  
- Pode **visualizar e buscar posts**  
- Acesso à **leitura completa** de cada post  

---

## 🛠️ Tecnologias Utilizadas

### 📲 Frontend (React Native)
- React Native CLI (0.80)  
- TypeScript  
- React Navigation  
- Axios  
- AsyncStorage  
- React Native Reanimated (splash)

### 🌐 Backend (Node.js)
- Node.js + Express  
- CORS + body-parser  
- Estrutura modular com controllers e rotas  
- Base de dados em JSON  

---

## 🗂️ Estrutura de Pastas

```
blogApp/
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   └── App.tsx
├── assets/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── data/db.json
│   ├── server.js
│   └── package.json
```

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Backend (API REST)

```bash
cd blogApp/backend
npm install
node server.js
```

> A API será iniciada em `http://localhost:3000`

---

### 2️⃣ Aplicativo Mobile

```bash
cd blogApp
npm install

# Inicia o Metro Bundler
npx react-native start

# Em outro terminal, inicia o app Android
npx react-native run-android
```

---

## 🧪 Login de Teste

**Professor**
```
email: prof@fiap.com
senha: 123
```

**Aluno**
```
email: aluno@fiap.com
senha: 123
```

---

## 💡 Extras Opcionais Implementados

- ✅ Validação de campos obrigatórios ao criar/editar post  
- ✅ Loading spinner durante requisições  
- ✅ Feedback com Alert ao salvar ou deletar  
- ✅ Splash screen com animação de entrada  
- ✅ Navegação protegida com login persistente  
- ✅ Backend incluso no projeto para deploy fácil  

---

## 📦 Publicação

- Repositório GitHub: [https://github.com/Fer-hub-prog/blogApp](https://github.com/Fer-hub-prog/blogApp)
