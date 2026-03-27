// src/stores/authStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  isCompany: boolean
  setIsCompany: (isCompany: boolean) => void
  companyName: string | null
  setCompanyName: (companyName: string) => void
  referralCode: string | null
  setReferralCode: (referralCode: string) => void
  referralsLimit: number;
  setreferralsLimit: (referralsLimit: number)=> void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      companyName: null,
      isCompany: false,
      referralCode: null,
      referralsLimit: 0,
      setToken: (token) => set({ token }),
      setCompanyName: (companyName) => set({ companyName }),
      setIsCompany: (isCompany) => set({isCompany}),
      setReferralCode: (referralCode) => set({referralCode}),
      setreferralsLimit: (referralsLimit)=> set({referralsLimit}),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
)
