import type { EventDoc } from '@/lib/sanity/queries'

// Homepage list window when no ?days= is set. Kept short so the default page
// stays light; the days filter and the "see more" link reach 30/90.
export const DEFAULT_LIST_DAYS = 7

export type EventFilterParams = { category?: string; interest?: string; free?: boolean }

// free = free general admission, not "$8, kids free"
const FREE = /^free/i

export function matchesFilters(e: EventDoc, f: EventFilterParams): boolean {
  if (f.category && e.category !== f.category) return false
  if (f.interest && !e.interests?.includes(f.interest)) return false
  if (f.free && !FREE.test((e.priceText ?? '').trim())) return false
  return true
}
