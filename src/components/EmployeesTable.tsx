import { useCompanyEmployees } from "../hooks/useCompanyEmployees"
import { CompanyEmployee } from "../types/referrals"

interface Props {
  data: CompanyEmployee[]
  refetch: () => void
}

export function EmployeesTable({ data , refetch}: Props) {
    const {fixDate, handleToggleStatus, pendingAction, modalOpen, selectedUser,
        confirmToggleStatus, setModalOpen, isActive
     } = useCompanyEmployees()
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
              Usuario
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
              Nombre completo
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
              Correo
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
              Fecha registro
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
              Uso del código
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
             Opciones
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500 text-sm">
                No hay empleados registrados
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={item.userId}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-indigo-50 transition-colors`}
              >
                {/* Usuario */}
                <td className="px-4 py-3 text-center text-sm text-gray-800 border-r">
                  {item.username}
                </td>

                {/* Nombre */}
                <td className="px-4 py-3 text-center text-sm text-gray-800 border-r">
                  {item.nombreCompleto || "-"}
                </td>

                {/* Correo */}
                <td className="px-4 py-3 text-center text-sm text-gray-800 border-r">
                  {item.correo || "-"}
                </td>

                {/* Fecha registro */}
                <td className="px-4 py-3 text-center text-sm text-gray-800 border-r">
                 {item.fechaRegistro ? fixDate(item.fechaRegistro) : "-"}
                </td>

                {/* Uso del código */}
                <td className="px-4 py-3 text-center text-sm text-gray-800 border-r">
                  {item.fechaUsoCodigo ? (
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                      ✔ {fixDate(item.fechaUsoCodigo)}
                    </span>
                  ) : (
                    <span className="text-gray-400">No usado</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-sm">
               <button
                onClick={() => handleToggleStatus(item)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition
                    ${isActive(item)
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                >
                {isActive(item) ? "Desactivar" : "Activar"}
                </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {modalOpen && selectedUser && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
      
      <h2 className="text-lg font-semibold mb-2">
        Confirmar acción
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        ¿Seguro que deseas {pendingAction ? "activar" : "desactivar"} a{" "}
        <b>{selectedUser.nombreCompleto}</b>?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancelar
        </button>

       <button
        onClick={async () => {
            await confirmToggleStatus()
            refetch()
        }}
        className={`px-4 py-2 text-sm rounded-lg text-white
            ${pendingAction ? "bg-green-600" : "bg-red-600"}
        `}
        >
        Confirmar
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}