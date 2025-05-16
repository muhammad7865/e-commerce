// hooks/use-toast.ts
'use client'

import { toast as sonner } from 'sonner'

export function useToast() {
  return {
    toast: ({
      description,
      variant = 'default',
      action,
    }: {
      description?: string
      variant?: 'default' | 'destructive'
      action?: {
        label: string
        onClick: () => void
      }
    }) => {
      if (variant === 'destructive') {
        sonner.error(description)
      } else {
        sonner(description, {
          action,
        })
      }
    },
  }
}
