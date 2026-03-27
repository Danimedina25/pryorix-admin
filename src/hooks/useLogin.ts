import { use, useState } from "react"
import { login, loginCompanies } from "../services/authService"
import { useAuthStore } from "../stores/authStore"
import { useNavigate } from "react-router-dom"

export function useLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const setToken = useAuthStore((s) => s.setToken)
  const isCompany = useAuthStore((i)=>i.isCompany)
  const setIsCompany = useAuthStore((i) => i.setIsCompany)
  const setCompanyName = useAuthStore((c) => c.setCompanyName)
  const setReferralCode = useAuthStore((r) => r.setReferralCode)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      var result = null
      if(isCompany){
        result = await loginCompanies({ email, password })
      }else{
        result = await login({ email, password })
      }
      setToken(result.data.token)
      if(isCompany) {
        setCompanyName(result.data.nombre)
        setReferralCode(result.data.referralCode)
      }
      navigate("/", { replace: true })
    } catch (e: any) {
      const apiMessage =
        e?.response?.data?.message ||
        e?.response?.data?.errors?.error ||
        "Error al iniciar sesión"

      setError(apiMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    handleSubmit,
    isCompany,
    setIsCompany
  }
}
