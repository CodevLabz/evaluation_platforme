"use client"
import React, { useState, createContext, useContext } from "react";
type User = {
  id: string;
  email: string;
  role: "admin" | "organizer" | "staff";
  name: string;
  avatar?: string;
};
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateProfile: (data: any) => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser = {
      id: "1",
      email,
      role: "admin" as const,
      name: "Admin User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    };
    setUser(mockUser);
  };
  const logout = async () => {
    // Simulate API call
    setUser(null);
  };
  const updateProfile = async (data: any) => {
    // Simulate API call
    setUser((prev) =>
      prev
        ? {
            ...prev,
            ...data,
          }
        : null,
    );
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
