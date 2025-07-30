export interface LoginResponse {
  success: boolean;
  role: 'professor' | 'aluno';
}

export interface Professor {
  id: number;
  nome: string;
  email: string;
  senha?: string;
}

export interface Estudante {
  id: number;
  nome: string;
  email: string;
  senha?: string;
}

export interface Post {
  id: number;
  titulo?: string;
  description?: string;
  conteudo?: string;
  author?: string;
}