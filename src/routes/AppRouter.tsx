import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { BusinessReferralsPage } from "../pages/BusinessReferralsPage"
import { ProtectedRoute } from "./ProtectedRoute"
import { EmployeesPage } from "../pages/EmployeesPage"
import { IndividualReferralsPage } from "../pages/IndividualReferralsPage"

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
          <Route path="referrals/business" element={<BusinessReferralsPage />} />
           <Route path="referrals/individuals" element={<IndividualReferralsPage />} />
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
