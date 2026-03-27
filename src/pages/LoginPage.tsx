// src/pages/LoginPage.tsx
import { LoginView } from "../components/LoginView"
import { useLogin } from "../hooks/useLogin"
import { useAuthStore } from "../stores/authStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function LoginPage() {
  const login = useLogin()
  const token = useAuthStore((s) => s.token)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("token", token)
    if (token) {
      navigate("/", { replace: true }) 
    }
  }, [token, navigate])

  return (
    <LoginView
      username={login.email}
      password={login.password}
      showPassword={login.showPassword}
      loading={login.loading}
      error={login.error}
      onUsernameChange={login.setEmail}
      onPasswordChange={login.setPassword}
      onToggleShowPassword={() => login.setShowPassword((v) => !v)}
      onSubmit={login.handleSubmit}
      isCompany={login.isCompany}                 // ✅
      onToggleType={login.setIsCompany}   
    />
  )
}
