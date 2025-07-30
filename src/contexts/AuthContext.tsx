// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = 'professor' | 'aluno' | null;

type AuthContextType = {
  userType: UserType;
  login: (type: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userType: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserType>(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const tipo = await AsyncStorage.getItem('userType');
      if (tipo === 'professor' || tipo === 'aluno') {
        setUserType(tipo);
      }
    };
    carregarUsuario();
  }, []);

  const login = async (type: UserType) => {
    setUserType(type);
    if (type) await AsyncStorage.setItem('userType', type);
  };

  const logout = async () => {
    setUserType(null);
    await AsyncStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};