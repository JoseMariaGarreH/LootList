"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
    const { profileId, gameId, content } = await request.json();
    const comment = await prisma.comments.create({
        data: { profileId, gameId, content }
    });
    return NextResponse.json(comment);
}
