import React from "react"
import logo from "../assets/images/logo_pryorix.png"

interface Props {
  username: string
  password: string
  showPassword: boolean
  loading: boolean
  error: string | null
  onUsernameChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onToggleShowPassword: () => void
  onSubmit: () => void
  isCompany: boolean
  onToggleType: (v: boolean) => void
}

export const LoginView: React.FC<Props> = ({
  username,
  password,
  showPassword,
  loading,
  error,
  onUsernameChange,
  onPasswordChange,
  onToggleShowPassword,
  onSubmit,
  isCompany, 
  onToggleType
}) => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6">
          Iniciar sesión
        </h1>
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-200 rounded-full p-1">
            
            <button
              type="button"
              onClick={() => onToggleType(false)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                !isCompany ? "bg-white shadow text-blue-600" : "text-gray-600"
              }`}
            >
              Pryorix
            </button>

            <button
              type="button"
              onClick={() => onToggleType(true)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                isCompany ? "bg-white shadow text-blue-600" : "text-gray-600"
              }`}
            >
              Empresa
            </button>

          </div>
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
        )}

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {isCompany ? "Usuario de empresa" : "Correo"}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder={isCompany ? "Usuario de empresa" : "correo@ejemplo.com"}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Tu contraseña"
            />
            <button
              type="button"
              onClick={onToggleShowPassword}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  )
}
