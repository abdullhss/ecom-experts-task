import type { BundleState } from '../types/catalog'

export const STORAGE_KEY = 'wyze-bundle-config'

export function loadBundleState(): BundleState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BundleState
  } catch {
    return null
  }
}

export function saveBundleState(state: BundleState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearBundleState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
