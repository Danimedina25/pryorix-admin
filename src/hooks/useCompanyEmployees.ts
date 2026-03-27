import { useEffect, useState } from "react"
import { getCompanyEmployees, toggleEmployeeStatus } from "../services/referralService"
import { CompanyEmployee } from "../types/referrals"
import { useAuthStore } from "../stores/authStore"

export function useCompanyEmployees() {
  const [data, setData] = useState<CompanyEmployee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setreferralsLimit = useAuthStore((l) => l.setreferralsLimit)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<CompanyEmployee | null>(null)
  const [pendingAction, setPendingAction] = useState<boolean | null>(null)

  const isActive = (user: CompanyEmployee) =>
    user.status === "ACTIVE"

  const openToggleModal = (user: CompanyEmployee) => {
    const nextState = !isActive(user)

    setSelectedUser(user)
    setPendingAction(nextState)
    setModalOpen(true)
  }

    const fixDate = (dateStr: string) => {
        const date = new Date(dateStr)
        date.setDate(date.getDate() + 1)
        return date.toLocaleDateString()
    }

  const confirmToggleStatus = async () => {
    if (!selectedUser || pendingAction === null) return

    try {
      const newStatus = pendingAction
        ? "ACTIVE"
        : "EXPIRED_SUBSCRIPTION"

      await toggleEmployeeStatus(selectedUser.userId, newStatus)

      setData(prev =>
        prev.map(u =>
          u.userId === selectedUser.userId
            ? { ...u, status: newStatus }
            : u
        )
      )
    } catch (e) {
      console.error(e)
    } finally {
      setModalOpen(false)
      setSelectedUser(null)
      setPendingAction(null)
    }
  }

  const handleToggleStatus = (user: CompanyEmployee) => {
    openToggleModal(user)
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await getCompanyEmployees()

      setData(result.employees)
      setreferralsLimit(result.referralsLimit)

    } catch (e: any) {
      setError(e.message || "Error al cargar empleados")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,

    modalOpen,
    setModalOpen,
    selectedUser,
    pendingAction,
    fixDate,
    handleToggleStatus,
    confirmToggleStatus,

    isActive
  }
}