import { useState } from "react"
import { ReferralCode } from "../types/referrals"
import { EditCorporateReferralModal } from "./EditCorporateReferralModal"

interface Props {
  data: ReferralCode[]
  onUpdated: () => void
}

export function CorporateReferralTable({ data, onUpdated }: Props) {
  const [selected, setSelected] = useState<ReferralCode | null>(null)

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Código
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Empresa
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Plan
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Límite empleados
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Precio
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Fecha creación
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700" >
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500 text-sm">
                  No hay códigos empresariales registrados
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`cursor-pointer ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition-colors`}
                >
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {item.code}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {item.companyName ?? "-"}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {item.plan ?? "-"}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {item.employeeLimit ?? "-"}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {item.price ? `$${item.price}` : "-"}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm font-medium ${item.active ? "text-green-600" : "text-red-600"}`}>
                    {item.active ? "Activo" : "Inactivo"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditCorporateReferralModal
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
        onUpdated={onUpdated}
      />
    </>
  )
}
