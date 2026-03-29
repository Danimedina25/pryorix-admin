import { useEffect, useMemo, useState } from "react"
import { ReferralCode, ReferralCodeIndividualDTO } from "../types/referrals"
import { getCorporateReferralCodes, getIndividualReferralCodes } from "../services/referralService"

export function useCorporateReferrals() {
  const [dataBusiness, setDataBusiness] = useState<ReferralCode[]>([])
  const [dataIndividuals, setDataIndividuals] = useState<ReferralCodeIndividualDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Search con debounce
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Rango de fechas
  const [dateFrom, setDateFrom] = useState<string | null>(null) 
  const [dateTo, setDateTo] = useState<string | null>(null)    
  
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, dateFrom, dateTo])

  const fetchBusinessCodes = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getCorporateReferralCodes()
      setDataBusiness(result)
    } catch (e: any) {
      setError(e.message || "Error al cargar códigos empresariales")
    } finally {
      setLoading(false)
    }
  }

  const fetchIndividualCodes = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getIndividualReferralCodes()
      setDataIndividuals(result)
      console.log("individuals", result)
    } catch (e: any) {
      setError(e.message || "Error al cargar códigos individuales")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBusinessCodes()
    fetchIndividualCodes()
  }, [])

  // Debounce effect (300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(t)
  }, [search])

 const filteredDataBusiness = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()

    return dataBusiness.filter((item) => {
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
  }, [dataBusiness, debouncedSearch, dateFrom, dateTo])

  const totalPagesBusiness = Math.ceil(filteredDataBusiness.length / pageSize)

  const paginatedBusiness = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return filteredDataBusiness.slice(start, end)
  }, [filteredDataBusiness, page, pageSize])

  const filteredDataIndividuals = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()

    return dataIndividuals.filter((item) => {
      const codeMatch = item.code.toLowerCase().includes(q)

      const usernameMatch = item.nombreCompleto
        ? item.nombreCompleto.toLowerCase().includes(q)
        : false

      const matchesSearch = q === "" ? true : codeMatch || usernameMatch

      const createdDate = item.fechaCreacion.slice(0, 10) 

      const matchesFrom = dateFrom ? createdDate >= dateFrom : true
      const matchesTo = dateTo ? createdDate <= dateTo : true

      return matchesSearch && matchesFrom && matchesTo
    })
  }, [dataIndividuals, debouncedSearch, dateFrom, dateTo])

  const paginatedIndividuals = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return filteredDataIndividuals.slice(start, end)
  }, [filteredDataIndividuals, page, pageSize])
  const totalPagesIndividuals = Math.ceil(filteredDataIndividuals.length / pageSize)

  return {
     dataBusiness: paginatedBusiness,
    totalBusiness: filteredDataBusiness.length,
    dataIndividuals: paginatedIndividuals,
    totalIndividuals: filteredDataIndividuals.length,
    loading,
    error,

    search,
    setSearch,

    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,

    refetchBusiness: fetchBusinessCodes,
    refetchIndividuals: fetchIndividualCodes,
    page, totalPagesBusiness,totalPagesIndividuals, setPage
  }
}
