// hooks/useRequestResetPassword.ts
'use client'

import { useState, useTransition } from 'react'
import { requestPasswordReset } from '@/src/actions/post-requestEmail'

export function useRequestResetPassword() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  const sendResetEmail = (email: string) => {
    startTransition(async () => {
      try {
        const res = await requestPasswordReset(email)
        if (res.success) {
          setMessage('Correo enviado con éxito')
        }
      } catch (err) {
        setMessage('Error al enviar el correo')
      }
    })
  }

  return {
    sendResetEmail,
    isPending,
    message,
  }
}
