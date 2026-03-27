// src/services/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "../stores/authStore"

const API_BASE_LOCAL = "http://localhost:8080/api"
const API_BASE_REMOTO = "http://72.18.198.109:8080/api"

export const api = axios.create({
  baseURL: API_BASE_LOCAL, 
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor de request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      config.headers = config.headers ?? {}

      const token = useAuthStore.getState().token

      if (token) {
        ;(config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
      }

      // Logs útiles para debug
      console.log("Request:")
      console.log("URL:", `${config.baseURL}${config.url}`)
      console.log("Método:", config.method?.toUpperCase())
      console.log("Headers:", config.headers)
      console.log("Params:", config.params)
      console.log("Body:", config.data)
    } catch (err) {
      console.warn("Error al agregar token al request", err)
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de response
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    try {
      if (error.response?.status === 401) {
        const token = useAuthStore.getState().token
        if (token) {
          console.warn("401 Unauthorized con token - cerrando sesión")
          useAuthStore.getState().logout()
        }
      }
    } catch (err) {
      console.warn("Error en interceptor de response", err)
    }

    return Promise.reject(error)
  }
)
