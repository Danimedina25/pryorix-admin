import { useState } from "react"
import { useAuthStore } from "../stores/authStore"
import { useBusinessEmployees } from "../hooks/useBusinessEmployees"
import { EmployeesTable } from "../components/EmployeesTable"
import { ReferralTableSkeleton } from "../components/ReferralTableSkeleton"

export function EmployeesPage() {
  const {
    data,
    loading,
    error,
    refetch,
  } = useBusinessEmployees()

  const isCompany = useAuthStore((i) => i.isCompany)
  const [search, setSearch] = useState("")

  const filteredData = data.filter((item) =>
    item.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
    item.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Mis empleados
        </h1>

        <p className="text-sm text-gray-500">
          {filteredData.length} resultados encontrados
        </p>

        {/* 👇 NUEVO: límite */}
       {/*  {isCompany && referralsLimit !== null && (
          <p className="text-sm text-indigo-600 font-medium">
            {filteredData.length} / {referralsLimit} empleados utilizados
          </p>
        )} */}
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por nombre o usuario"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <button
            onClick={() => setSearch("")}
            className="h-10 px-4 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Estados */}
      {loading && <ReferralTableSkeleton />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <EmployeesTable data={filteredData} refetch={refetch}/>
      )}
    </div>
  )
}