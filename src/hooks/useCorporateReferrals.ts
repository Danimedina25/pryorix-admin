import { useEffect, useMemo, useState } from "react"
import { ReferralCode } from "../types/referrals"
import { getCorporateReferralCodes } from "../services/referralService"

export function useCorporateReferrals() {
  const [data, setData] = useState<ReferralCode[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search con debounce
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Rango de fechas
  const [dateFrom, setDateFrom] = useState<string | null>(null) // YYYY-MM-DD
  const [dateTo, setDateTo] = useState<string | null>(null)     // YYYY-MM-DD

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getCorporateReferralCodes()
      setData(result)
    } catch (e: any) {
      setError(e.message || "Error al cargar códigos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Debounce effect (300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(t)
  }, [search])

 const filteredData = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()

    return data.filter((item) => {
      const codeMatch = item.code.toLowerCase().includes(q)

      const companyMatch = item.companyName
        ? item.companyName.toLowerCase().includes(q)
        : false

      const matchesSearch = q === "" ? true : codeMatch || companyMatch

      const createdDate = item.createdAt.slice(0, 10) // YYYY-MM-DD

      const matchesFrom = dateFrom ? createdDate >= dateFrom : true
      const matchesTo = dateTo ? createdDate <= dateTo : true

      return matchesSearch && matchesFrom && matchesTo
    })
  }, [data, debouncedSearch, dateFrom, dateTo])

  return {
    data: filteredData,
    total: filteredData.length,
    loading,
    error,

    search,
    setSearch,

    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,

    refetch: fetchData,
  }
}
