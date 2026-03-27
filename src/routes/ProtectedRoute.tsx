// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import { JSX } from "react"

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s: { token: any }) => s.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
