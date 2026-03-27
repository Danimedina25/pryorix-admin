import { CompanyEmployeesResponse, CreateCorporateCodeResponse, MembershipStatus, ReferralCode } from "../types/referrals"
import { api } from "./api"

export async function getCorporateReferralCodes(): Promise<ReferralCode[]> {
  const response = await api.get("/referrals/admin/corporate")
  return response.data.data
}

export async function createCorporateReferralCode(payload: {
  code?: string
  employeeLimit: number
  price: number,
  companyName: string,
  plan: string
}): Promise<CreateCorporateCodeResponse> {
  const response = await api.post("/referrals/admin/corporate", payload)
  return response.data.data
}


export async function updateCorporateReferral(
  id: number,
  payload: { employeeLimit?: number; companyName?: string }
) {
  const res = await api.patch(`/referrals/admin/corporate/${id}`, payload)
  return res.data.data
}

export async function toggleCorporateReferralStatus(
  id: number,
  active: boolean
): Promise<ReferralCode> {
  const res = await api.patch(
    `/referrals/admin/corporate/${id}/status`,
    null,
    {
      params: { active }, 
    }
  )

  return res.data.data
}

export async function getCompanyEmployees(): Promise<CompanyEmployeesResponse> {
  const res = await api.get("/referrals/company/employees")
  return res.data.data
}

export async function toggleEmployeeStatus(
  userId: number,
  status: MembershipStatus
) {
  const res = await api.patch(
    `/referrals/company/employees/${userId}/status`,
    { status }
  )

  return res.data.data
}