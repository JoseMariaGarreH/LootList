import { NextResponse } from "next/server";

export async function gamesRawAction() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Error al obtener juegos" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}