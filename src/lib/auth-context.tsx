import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "./i18n";

export type AgeGroup = "young" | "mid" | "silver";

export interface User {
  nickname: string;
  email: string;
  age: number;
  ageGroup: AgeGroup;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  language: Language;
  isLoading: boolean;
  setLanguage: (lang: Language) => void;
  login: (user: User) => boolean;
  logout: () => void;
  signup: (nickname: string, email: string, age: number, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = "sherise_current_user";
const USERS_DB_KEY = "sherise_users_db";

export function getAgeGroup(age: number): AgeGroup {
  if (age >= 14 && age <= 18) return "young";
  if (age >= 19 && age <= 55) return "mid";
  return "silver";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session", e);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (credentials: { email: string; password?: string }): boolean => {
    const usersDb = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "[]");
    const foundUser = usersDb.find((u: User) => u.email === credentials.email && u.password === credentials.password);

    if (foundUser) {
      const { password, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const signup = (nickname: string, email: string, age: number, password: string) => {
    const ageGroup = getAgeGroup(age);
    const newUser: User = { nickname, email, age, ageGroup, password };

    const usersDb = JSON.parse(localStorage.getItem(USERS_DB_KEY) || "[]");
    if (!usersDb.some((u: User) => u.email === email)) {
        usersDb.push(newUser);
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDb));
    }

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <AuthContext.Provider value={{ user, language, isLoading, setLanguage, login: login as any, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
