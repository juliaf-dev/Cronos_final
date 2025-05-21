import express from 'express';
import cors from 'cors';
import session from 'express-session';
import AuthController from './src/controllers/AuthController.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS e sessão
app.use(cors({
  origin: 'http://localhost:3000', // ou o endereço do seu frontend
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'minhaChaveSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // em produção deve ser true (HTTPS)
    maxAge: 24 * 60 * 60 * 1000 // 1 dia
  }
}));

// Rotas de autenticação
app.post('/api/auth/register', (req, res) => AuthController.register(req, res));
app.post('/api/auth/login', (req, res) => AuthController.login(req, res));
app.get('/api/auth/logout', (req, res) => AuthController.logout(req, res));
app.get('/api/auth/check', (req, res) => AuthController.checkAuth(req, res));

// Rota protegida de exemplo
app.get('/api/protected', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  res.json({ message: "Rota protegida acessada com sucesso!", user: req.session.user });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});