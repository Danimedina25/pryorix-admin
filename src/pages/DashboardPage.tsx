import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"

export function DashboardPage() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const isCompany = useAuthStore((i)=>i.isCompany)
  const companyName = useAuthStore((c)=>c.companyName)
  const referralCode = useAuthStore((r)=>r.referralCode)
  const referralsLimit = useAuthStore((s) => s.referralsLimit)
  
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          {isCompany ? companyName : 'Pryorix Admin'}
        </div>

        <nav className="flex-1 p-2 space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          {!isCompany ? 
            <>
          <NavLink
            to="/referrals/corporate"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Códigos empresariales
          </NavLink>

          <NavLink
            to="/referrals/normal"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Códigos normales
          </NavLink>
          </> :

          <NavLink
            to="/company/employees"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Mis empleados
          </NavLink>
          }
        </nav>
        {isCompany && referralCode && (
          <>
            <div className="p-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Código de referido empresarial:</p>

              <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                <span className="font-mono text-sm tracking-wider flex-1">
                  {referralCode}
                </span>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode)
                  }}
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Copiar
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div>
                <p className="text-xs text-gray-400 mb-1">
                  Límite de empleados:
                </p>
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                <span className="font-mono text-sm tracking-wider flex-1">
                  {referralsLimit ? ` ${referralsLimit}` : "-"}
                </span>
              </div>
              </div>
            </div>
          </>
        )}

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
