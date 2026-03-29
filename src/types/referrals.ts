export interface ReferralCode {
  id: number
  ownerUserId: number
  code: string
  createdAt: string 
  type: "EMPRESARIAL" | "NORMAL"
  employeeLimit?: number
  price?: number
  companyName?: string
  active?: boolean
  plan: "ANUAL" | "SEMESTRAL"
}

export interface CreateCorporateCodeResponse {
  code: ReferralCode
  username: string
  password: string
}
export type MembershipStatus = "ACTIVE" | "EXPIRED_SUBSCRIPTION"

export interface CompanyEmployee {
  userId: number
  username: string
  nombreCompleto: string
  correo: string
  fechaRegistro: string
  fechaUsoCodigo: string
  status: MembershipStatus
}

export interface CompanyEmployeesResponse {
  employees: CompanyEmployee[]
  referralsLimit: number
}

export interface ReferralCodeIndividualDTO {
  id: number;
  code: string;
  nombreCompleto: string;
  plan:  "ANUAL" | "SEMESTRAL";
  ownerUserId: number;
  fechaCreacion: string; 
  active: boolean;
}