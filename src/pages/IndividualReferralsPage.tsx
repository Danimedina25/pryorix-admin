import { useCorporateReferrals } from "../hooks/useReferrals"
import { CorporateReferralTable } from "../components/CorporateReferralTable"
import { ReferralTableSkeleton } from "../components/ReferralTableSkeleton"
import { useState } from "react"
import { useAuthStore } from "../stores/authStore"
import { IndividualReferralsTable } from "../components/IndividualReferralsTable"

export function IndividualReferralsPage() {
  const {
    dataIndividuals,
    totalIndividuals,
    loading,
    error,
    search,
    setSearch,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    refetchIndividuals,
    page, setPage, totalPagesIndividuals
  } = useCorporateReferrals()

  const [openCreate, setOpenCreate] = useState(false)
  const isCompany = useAuthStore((i)=>i.isCompany)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Códigos de Referido Individuales
          </h1>
          <p className="text-sm text-gray-500">
            {totalIndividuals} resultados encontrados
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Buscar por código
            </label>
            <input
              type="text"
              placeholder="Ej. ABCD1234"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Desde
            </label>
            <input
              type="date"
              value={dateFrom ?? ""}
              onChange={(e) => setDateFrom(e.target.value || null)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Hasta
            </label>
            <input
              type="date"
              value={dateTo ?? ""}
              onChange={(e) => setDateTo(e.target.value || null)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={() => {
              setSearch("")
              setDateFrom(null)
              setDateTo(null)
            }}
            className="h-10 px-4 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
          >
            Limpiar
          </button>
        </div>
      </div>

      {loading && <ReferralTableSkeleton />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}

      {!loading && !error && <IndividualReferralsTable data={dataIndividuals} onUpdated={refetchIndividuals}
      page={page}
      totalPages={totalPagesIndividuals}
      setPage={setPage} />}
     
    </div>
    
  )
}
