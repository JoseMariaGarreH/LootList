export async function resetPasswordWithToken(token: string, newPassword: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/resetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: newPassword }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error(data.message || "No se pudo cambiar la contraseña");
    }

    return { success: true };
}