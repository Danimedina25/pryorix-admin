import { useState } from "react"
import { Modal } from "./Modal"
import { createCorporateReferralCode } from "../services/referralService"

interface Props {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

export function CreateCorporateReferralModal({ open, onClose, onCreated }: Props) {
  const [code, setCode] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [employeeLimit, setEmployeeLimit] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plan, setPlan] = useState<"ANUAL" | "SEMESTRAL">("ANUAL");
  const [createdData, setCreatedData] = useState<null | {
    companyName: string
    username: string
    password: string
  }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!companyName.trim()) {
      setError("El nombre de la empresa es obligatorio")
      return
    }

    try {
      setLoading(true)
      setError(null)

     const response = await createCorporateReferralCode({
        code: code.trim() || undefined,
        companyName: companyName.trim(),
        employeeLimit: Number(employeeLimit),
        price: Number(price),
        plan
      })

      response.code.companyName
      response.password
      response.username

     setCreatedData({
      companyName: response.code.companyName || "",
      username: response.username,
      password: response.password
    })

    onCreated()

      // reset form
      setCode("")
      setCompanyName("")
     setEmployeeLimit("")
      setPrice("")
    } catch (e: any) {
      setError(e.message || "Error al crear el código")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Modal open={open} onClose={onClose} title="Crear código empresarial">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        {/* Empresa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la empresa
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Ej. Acme Corp"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Código */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código (opcional)
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Dejar vacío para autogenerar"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Límite */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Límite de empleados
          </label>
          <input
            type="number"
            min={1}
            value={employeeLimit}
            onChange={(e) => setEmployeeLimit(e.target.value)}
            placeholder="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as "ANUAL" | "SEMESTRAL")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          >
            <option value="ANUAL">Anual</option>
            <option value="SEMESTRAL">Semestral</option>
          </select>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </Modal>
    {createdData && (
  <Modal
    open={true}
    onClose={() => setCreatedData(null)}
    title="Empresa creada!"
  >
    <div className="space-y-4">

      <p className="text-sm text-gray-600">
        Guarda estas credenciales. Solo se mostrarán una vez.
      </p>

      {/* Empresa */}
      <div>
        <label className="text-xs text-gray-500">Empresa</label>
        <div className="font-medium">{createdData.companyName}</div>
      </div>

      {/* Username */}
      <div>
        <label className="text-xs text-gray-500">Usuario</label>
        <div className="flex items-center gap-2">
          <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
            {createdData.username}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(createdData.username)}
            className="text-xs px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Copiar
          </button>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-xs text-gray-500">Contraseña</label>
        <div className="flex items-center gap-2">
          <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
            {createdData.password}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(createdData.password)}
            className="text-xs px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Copiar
          </button>
        </div>
      </div>

      {/* Copy all */}
      <button
        onClick={() =>{
          navigator.clipboard.writeText(
            `Empresa: ${createdData.companyName}\nUsuario: ${createdData.username}\nPassword: ${createdData.password}`
          )
         
          alert("Copiado")
        }
        }
        className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
      >
        Copiar todo
      </button>

      <button
        onClick={() => setCreatedData(null)}
        className="w-full mt-2 px-4 py-2 border rounded-lg text-sm"
      >
        Cerrar
      </button>
    </div>
  </Modal>
)}
    </>
  )
}
