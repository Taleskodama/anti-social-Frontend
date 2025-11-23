import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// --- O SEGREDO ESTÁ AQUI ---
// Antes de toda requisição, verifica se tem token salvo e injeta no cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
