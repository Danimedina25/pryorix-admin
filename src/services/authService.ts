// src/services/authService.ts
import { api } from "./api"

export interface LoginRequest {
  email: string
  password: string
}


export interface LoginUserData {
  userId: string
  username: string
  correo: string
  activo: boolean
  token: string
  nombre: string
  referralCode: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: LoginUserData
  errors: any
  timestamp: string
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login/admin", request)
  return response.data
}

export async function loginCompanies(request: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login/companies", request)
  return response.data
}
