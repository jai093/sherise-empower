import React, { createContext, useContext, useState, ReactNode } from "react";
import { Language } from "./i18n";

export type AgeGroup = "young" | "mid" | "silver";

export interface User {
  nickname: string;
  email: string;
  age: number;
  ageGroup: AgeGroup;
}

interface AuthContextType {
  user: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  login: (user: User) => void;
  logout: () => void;
  signup: (nickname: string, email: string, age: number, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function getAgeGroup(age: number): AgeGroup {
  if (age >= 14 && age <= 18) return "young";
  if (age >= 19 && age <= 55) return "mid";
  return "silver";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  const signup = (nickname: string, email: string, age: number, _password: string) => {
    const ageGroup = getAgeGroup(age);
    setUser({ nickname, email, age, ageGroup });
  };

  return (
    <AuthContext.Provider value={{ user, language, setLanguage, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
