"use client"

import { useState } from "react";
import verifyPassword from "@/src/actions/post-verifyPassword-action";

export function useVerifyPassword() : { checkPassword: (email: string, password: string) => Promise<boolean> } {

    const checkPassword = async (email: string, password: string) => {
        const result = await verifyPassword(email, password);
        return result;
    };

    return { checkPassword };
}