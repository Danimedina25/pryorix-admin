import { useState } from "react"
import { ReferralCode, ReferralCodeIndividualDTO } from "../types/referrals"
import { EditCorporateReferralModal } from "./EditCorporateReferralModal"

interface Props {
  data: ReferralCodeIndividualDTO[]
  onUpdated: () => void
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export function IndividualReferralsTable({ data, onUpdated, page, setPage, totalPages }: Props) {
  const [selected, setSelected] = useState<ReferralCodeIndividualDTO | null>(null)

  return (
    <>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Código
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Usuario
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r">
                Plan
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
                    {item.nombreCompleto ?? "-"}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {item.plan ?? "-"}
                  </td>
                  <td className={`px-4 py-3 text-center text-sm border-r ${!item.active ? "text-gray-400" : "text-gray-800"}`}>
                    {new Date(item.fechaCreacion).toLocaleDateString()}
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
            Página <span className="font-medium">{page}</span> de{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
            >
              ← Anterior
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
