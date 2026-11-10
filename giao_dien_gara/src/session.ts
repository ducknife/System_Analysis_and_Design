import type { Manager, Receipt, SalarySummary } from './types'

type SessionData = {
  manager: Manager
  receipt: Receipt
  serviceSlipID: number
  month: number
  year: number
  laborUnitPrice: number
  staff: SalarySummary
}

type SessionKey = keyof SessionData

export const session = {
  get<K extends SessionKey>(key: K): SessionData[K] {
    return JSON.parse(sessionStorage.getItem(key) ?? 'null')
  },
  set<K extends SessionKey>(key: K, value: SessionData[K]) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove(...keys: SessionKey[]) {
    keys.forEach((key) => sessionStorage.removeItem(key))
  },
  clear() {
    sessionStorage.clear()
  },
}

export function startReceipt(receipt: Receipt) {
  session.set('receipt', receipt)
  session.remove('serviceSlipID')
}
