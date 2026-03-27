import { useEffect, useState } from "react"
import { Modal } from "./Modal"
import { ReferralCode } from "../types/referrals"
import { updateCorporateReferral, toggleCorporateReferralStatus } from "../services/referralService"

interface Props {
  open: boolean
  onClose: () => void
  onUpdated: () => void
  item: ReferralCode | null
}

export function EditCorporateReferralModal({ open, onClose, onUpdated, item }: Props) {
  const [companyName, setCompanyName] = useState("")
  const [employeeLimit, setEmployeeLimit] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (item) {
      setCompanyName(item.companyName ?? "")
      setEmployeeLimit(item.employeeLimit ?? 1)
    }
  }, [item])

  useEffect(() => {
    if (!open) {
      setCompanyName("")
      setEmployeeLimit(1)
      setError(null)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!item) return

    const payload: { companyName?: string; employeeLimit?: number } = {}

    if ((item.companyName ?? "") !== companyName.trim()) {
      payload.companyName = companyName.trim()
    }

    if ((item.employeeLimit ?? 1) !== employeeLimit) {
      payload.employeeLimit = employeeLimit
    }

    if (Object.keys(payload).length === 0) {
      onClose()
      return
    }

    try {
      setLoading(true)
      setError(null)

      await updateCorporateReferral(item.id, payload)

      onUpdated() 
      onClose()
    } catch (e: any) {
      setError(e.message || "Error al actualizar")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Nuevo: activar/desactivar
  const handleToggleStatus = async () => {
    if (!item) return

    try {
      setLoading(true)
      setError(null)

      const newStatus = !(item.active ?? true) // invertir el estado actual
      await toggleCorporateReferralStatus(item.id, newStatus)

      onUpdated() // refresca la lista
      onClose()
    } catch (e: any) {
      setError(e.message || "Error al cambiar el estado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar código empresarial">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Límite de empleados
          </label>
          <input
            type="number"
            min={1}
            value={employeeLimit}
            onChange={(e) => setEmployeeLimit(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="flex justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
            disabled={loading}
          >
            Cancelar
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleToggleStatus}
              className={`px-4 py-2 rounded-lg text-sm ${
                item?.active ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {item?.active ? "Desactivar" : "Activar"}
            </button>

            <button
              type="submit"
              disabled={loading || !companyName.trim()}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
