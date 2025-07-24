// src/Utils/Utiles.jsx

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const validateLogin = ({ email, password }) => {
  if (!email || !password) return "All fields are required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Enter a valid email";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateSignup = ({ name, email, password }) => {
  if (!name || !email || !password) return "All fields are required";
  if (name.length < 3) return "Name must be at least 3 characters";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Enter a valid email";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};
