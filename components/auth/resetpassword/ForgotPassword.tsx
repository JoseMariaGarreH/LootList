// app/forgot-password/page.tsx
'use client'
import { useRequestResetPassword } from '@/hooks/useRequestResetPassword'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const { sendResetEmail, isPending, message } = useRequestResetPassword()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendResetEmail(email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo"
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar enlace'}
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}
