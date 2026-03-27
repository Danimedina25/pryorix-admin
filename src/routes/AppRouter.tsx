import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { CorporateReferralsPage } from "../pages/CorporateReferralsPage"
import { ProtectedRoute } from "./ProtectedRoute"
import { EmployeesPage } from "../pages/EmployeesPage"

function DashboardHome() {
  return <h1 className="text-2xl font-bold">Bienvenido al panel 🚀</h1>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          {/* Home del dashboard */}
          <Route index element={<DashboardHome />} />

          {/* Admin pages */}
          <Route path="referrals/corporate" element={<CorporateReferralsPage />} />
          {/* luego: */}
          {/* <Route path="referrals/normal" element={<NormalReferralsPage />} /> */}
           <Route path="company/employees" element={<EmployeesPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
