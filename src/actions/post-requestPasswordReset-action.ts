export async function requestPasswordReset(email: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/requestreset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo enviar el correo");
    }

    return { success: true };
}